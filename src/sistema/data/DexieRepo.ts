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
  async salvarAtendimento(atendimento: Encounter) { await db.atendimentos.put(atendimento); }
  async encerrarAtendimento(id: string, fimEm: string) { const a = await db.atendimentos.get(id); if (!a || a.status === "encerrado") return; const duration = Math.max(0, Math.round((new Date(fimEm).getTime() - new Date(a.inicioEm).getTime()) / 60000)); await db.atendimentos.put({ ...a, fimEm, duracaoMin: duration, status: "encerrado", encerradoEm: fimEm }); }
  async adicionarAdendo(id: string, adendo: Addendum) { const a = await db.atendimentos.get(id); if (!a || a.status !== "encerrado") return; await db.atendimentos.put({ ...a, adendos: [...a.adendos, adendo] }); }
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
    if (!(await db.configuracoes.get("local"))) await db.configuracoes.put({ id: "local", duracaoPadrao: 50 });
  }
}

export const sistemaRepo = new DexieRepo();
