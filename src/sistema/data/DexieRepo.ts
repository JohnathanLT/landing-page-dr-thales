import { db } from "./db";
import { demoAnamneses, demoEncounters, demoPatients } from "./seed";
import type { Addendum, Anamnesis, AuditEntry, Encounter, Patient, Settings } from "./types";
import type { SistemaRepo } from "./repositories";

export class DexieRepo implements SistemaRepo {
  async listarPacientes() { return db.pacientes.orderBy("nome").toArray(); }
  async buscarPaciente(id: string) { return db.pacientes.get(id); }
  async salvarPaciente(paciente: Patient) { await db.pacientes.put(paciente); }
  async arquivarPaciente(id: string) { const p = await db.pacientes.get(id); if (p) await db.pacientes.put({ ...p, arquivado: true, atualizadoEm: new Date().toISOString() }); }
  async listarAnamneses(pacienteId: string) { return (await db.anamneses.where("pacienteId").equals(pacienteId).sortBy("versao")).reverse(); }
  async buscarAnamnese(id: string) { return db.anamneses.get(id); }
  async salvarRascunho(anamnese: Anamnesis) { await db.anamneses.put({ ...anamnese, status: "rascunho" }); }
  async finalizarAnamnese(anamnese: Anamnesis) { await db.anamneses.put({ ...anamnese, status: "finalizada", finalizadaEm: new Date().toISOString() }); }
  async listarAtendimentos(pacienteId?: string) { const rows = pacienteId ? await db.atendimentos.where("pacienteId").equals(pacienteId).toArray() : await db.atendimentos.toArray(); return rows.sort((a,b) => b.inicioEm.localeCompare(a.inicioEm)); }
  async buscarAtendimento(id: string) { return db.atendimentos.get(id); }
  async salvarAtendimento(atendimento: Encounter) {
    await db.transaction("rw", db.atendimentos, async () => {
      const existing = await db.atendimentos.get(atendimento.id);
      if (existing?.status === "encerrado") throw new Error("Atendimento concluído é imutável; registre um adendo.");
      if (atendimento.status === "em andamento") {
        const active = await db.atendimentos.where("pacienteId").equals(atendimento.pacienteId).filter((item) => item.status === "em andamento" && item.id !== atendimento.id).first();
        if (active) throw new Error("Já existe um atendimento em andamento para este paciente.");
      }
      await db.atendimentos.put(atendimento);
    });
  }
  async encerrarAtendimento(id: string, fimEm: string) { const a = await db.atendimentos.get(id); if (!a || a.status === "encerrado") return; const duration = Math.max(0, Math.round((new Date(fimEm).getTime() - new Date(a.inicioEm).getTime()) / 60000)); await db.atendimentos.put({ ...a, fimEm, duracaoMin: duration, status: "encerrado", encerradoEm: fimEm }); }
  async concluirAtendimento(id: string, fimEm: string, auditoria: AuditEntry) {
    return db.transaction("rw", db.atendimentos, db.auditoria, async () => {
      const a = await db.atendimentos.get(id);
      if (!a || a.status !== "em andamento") throw new Error("O atendimento não está mais em andamento.");
      const duration = Math.max(0, Math.round((new Date(fimEm).getTime() - new Date(a.inicioEm).getTime()) / 60000));
      const finished: Encounter = { ...a, fimEm, duracaoMin: duration, status: "encerrado", encerradoEm: fimEm, concluidoPor: auditoria.quem };
      await db.atendimentos.put(finished); await db.auditoria.put(auditoria); return finished;
    });
  }
  async adicionarAdendo(id: string, adendo: Addendum) { const a = await db.atendimentos.get(id); if (!a || a.status !== "encerrado") return; await db.atendimentos.put({ ...a, adendos: [...a.adendos, adendo] }); }
  async ajustarHorariosAtendimento(id: string, inicioEm: string, fimEm: string, justificativa: string, auditoria: AuditEntry) {
    if (!justificativa.trim()) throw new Error("A justificativa é obrigatória.");
    await db.transaction("rw", db.atendimentos, db.auditoria, async () => {
      const a = await db.atendimentos.get(id);
      if (!a || a.status !== "encerrado") throw new Error("Somente atendimentos concluídos podem ter o horário ajustado.");
      const duracaoMin = Math.max(0, Math.round((new Date(fimEm).getTime() - new Date(inicioEm).getTime()) / 60000));
      await db.atendimentos.put({ ...a, inicioEm, fimEm, duracaoMin });
      await db.auditoria.put(auditoria);
    });
  }
  async listarAuditoria(entidadeId?: string) { const rows = entidadeId ? await db.auditoria.where("entidadeId").equals(entidadeId).toArray() : await db.auditoria.toArray(); return rows.sort((a,b) => b.quando.localeCompare(a.quando)); }
  async registrarAuditoria(entry: AuditEntry) { await db.auditoria.put(entry); }
  async buscarConfiguracao() { return (await db.configuracoes.get("local")) ?? { id: "local" as const, duracaoPadrao: 50 }; }
  async salvarConfiguracao(settings: Settings) { await db.configuracoes.put(settings); }
  async exportarTudo() { return { pacientes: await db.pacientes.toArray(), anamneses: await db.anamneses.toArray(), atendimentos: await db.atendimentos.toArray(), auditoria: await db.auditoria.toArray(), configuracao: await this.buscarConfiguracao() }; }
  async restaurarTudo() {
    await db.transaction("rw", db.pacientes, db.anamneses, db.atendimentos, db.auditoria, db.configuracoes, async () => {
      await Promise.all([db.pacientes.clear(), db.anamneses.clear(), db.atendimentos.clear(), db.auditoria.clear(), db.configuracoes.clear()]);
      await db.pacientes.bulkAdd(demoPatients); await db.anamneses.bulkAdd(demoAnamneses); await db.atendimentos.bulkAdd(demoEncounters);
      await db.configuracoes.put({ id: "local", duracaoPadrao: 50 });
      await db.auditoria.add({ id: "seed-inicial", entidade: "paciente", entidadeId: "demo", acao: "criou", quando: new Date().toISOString(), quem: "Sistema de demonstração", detalhe: "Dados fictícios recriados" });
    });
  }
  async inicializar() {
    if (!(await db.pacientes.count())) await this.restaurarTudo();
    const settings = await db.configuracoes.get("local");
    if (!settings) await db.configuracoes.put({ id: "local", duracaoPadrao: 50 });
    if (settings?.seedHistoryVersion !== 2) {
      await db.transaction("rw", db.pacientes, db.anamneses, db.atendimentos, db.configuracoes, async () => {
        const patients = await db.pacientes.toArray();
        const encounters = await db.atendimentos.toArray();
        const demoOnly = patients.length > 0
          && patients.every((item) => item.id.startsWith("demo-paciente-"))
          && encounters.every((item) => item.id.startsWith("demo-consulta-"));
        if (demoOnly) {
          const existingAnamneses = new Set((await db.anamneses.toArray()).map((item) => item.id));
          const missingAnamneses = demoAnamneses.filter((item) => !existingAnamneses.has(item.id));
          if (missingAnamneses.length) await db.anamneses.bulkAdd(missingAnamneses);

          const existingIds = new Set(encounters.map((item) => item.id));
          const openPatients = new Set(encounters.filter((item) => item.status === "em andamento").map((item) => item.pacienteId));
          const missingEncounters = demoEncounters.filter((item) => !existingIds.has(item.id)
            && (item.status !== "em andamento" || !openPatients.has(item.pacienteId)));
          if (missingEncounters.length) await db.atendimentos.bulkAdd(missingEncounters);

          for (const seeded of demoPatients) {
            const existing = await db.pacientes.get(seeded.id);
            if (existing) await db.pacientes.put({
              ...existing,
              medicacoesEmUso: existing.medicacoesEmUso ?? seeded.medicacoesEmUso,
              retornos: existing.retornos ?? seeded.retornos,
            });
          }
        }
        await db.configuracoes.put({ ...(settings ?? { id: "local" as const, duracaoPadrao: 50 }), seedHistoryVersion: 2 });
      });
    }
  }
}

export const sistemaRepo = new DexieRepo();
