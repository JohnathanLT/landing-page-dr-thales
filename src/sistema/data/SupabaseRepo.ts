import type { SistemaRepo } from "./repositories";
import type { Addendum, Anamnesis, AuditEntry, Encounter, Patient, Settings } from "./types";

// TODO: implementar após configurar projeto, credenciais seguras e política de privacidade.
// Não importar esta classe no build de demonstração: a versão atual usa somente IndexedDB local.
export class SupabaseRepo implements SistemaRepo {
  async listarPacientes(): Promise<Patient[]> { throw new Error("TODO: consultar tabela pacientes com RLS"); }
  async buscarPaciente(_id: string): Promise<Patient | undefined> { throw new Error("TODO: buscar paciente com RLS"); }
  async salvarPaciente(_paciente: Patient): Promise<void> { throw new Error("TODO: inserir/atualizar paciente com RLS"); }
  async arquivarPaciente(_id: string): Promise<void> { throw new Error("TODO: arquivar paciente sem excluir dados"); }
  async listarAnamneses(_pacienteId: string): Promise<Anamnesis[]> { throw new Error("TODO: consultar versões de anamnese com RLS"); }
  async buscarAnamnese(_id: string): Promise<Anamnesis | undefined> { throw new Error("TODO: buscar versão de anamnese com RLS"); }
  async salvarRascunho(_anamnese: Anamnesis): Promise<void> { throw new Error("TODO: salvar rascunho com RLS"); }
  async finalizarAnamnese(_anamnese: Anamnesis): Promise<void> { throw new Error("TODO: finalizar sem sobrescrever versões anteriores"); }
  async listarAtendimentos(_pacienteId?: string): Promise<Encounter[]> { throw new Error("TODO: listar atendimentos com RLS"); }
  async buscarAtendimento(_id: string): Promise<Encounter | undefined> { throw new Error("TODO: buscar atendimento com RLS"); }
  async salvarAtendimento(_atendimento: Encounter): Promise<void> { throw new Error("TODO: salvar somente atendimento em andamento"); }
  async encerrarAtendimento(_id: string, _fimEm: string): Promise<void> { throw new Error("TODO: encerrar atendimento com trilha de auditoria"); }
  async concluirAtendimento(_id: string, _fimEm: string, _auditoria: AuditEntry): Promise<Encounter> { throw new Error("TODO: concluir atendimento e registrar auditoria em transação segura"); }
  async adicionarAdendo(_id: string, _adendo: Addendum): Promise<void> { throw new Error("TODO: anexar correção datada sem editar registro encerrado"); }
  async ajustarHorariosAtendimento(_id: string, _inicioEm: string, _fimEm: string, _justificativa: string, _auditoria: AuditEntry): Promise<void> { throw new Error("TODO: ajustar horário com justificativa e auditoria"); }
  async listarAuditoria(_entidadeId?: string): Promise<AuditEntry[]> { throw new Error("TODO: consultar trilha de auditoria com RLS"); }
  async registrarAuditoria(_entry: AuditEntry): Promise<void> { throw new Error("TODO: gravar auditoria em transação segura"); }
  async buscarConfiguracao(): Promise<Settings> { throw new Error("TODO: ler configurações locais do médico"); }
  async salvarConfiguracao(_settings: Settings): Promise<void> { throw new Error("TODO: salvar configurações"); }
  async exportarTudo(): Promise<{ pacientes: Patient[]; anamneses: Anamnesis[]; atendimentos: Encounter[]; auditoria: AuditEntry[]; configuracao: Settings }> { throw new Error("TODO: exportação controlada e auditada"); }
  async restaurarTudo(): Promise<void> { throw new Error("TODO: restaurar conjunto de demonstração"); }
}
