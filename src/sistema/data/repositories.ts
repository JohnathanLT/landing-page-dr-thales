import type { Addendum, Anamnesis, AuditEntry, Encounter, Patient, Settings } from "./types";

export interface PacienteRepo {
  listarPacientes(): Promise<Patient[]>; buscarPaciente(id: string): Promise<Patient | undefined>;
  salvarPaciente(paciente: Patient): Promise<void>; arquivarPaciente(id: string): Promise<void>;
}
export interface AnamneseRepo {
  listarAnamneses(pacienteId: string): Promise<Anamnesis[]>; buscarAnamnese(id: string): Promise<Anamnesis | undefined>;
  salvarRascunho(anamnese: Anamnesis): Promise<void>; finalizarAnamnese(anamnese: Anamnesis): Promise<void>;
}
export interface AtendimentoRepo {
  listarAtendimentos(pacienteId?: string): Promise<Encounter[]>; buscarAtendimento(id: string): Promise<Encounter | undefined>;
  salvarAtendimento(atendimento: Encounter): Promise<void>; encerrarAtendimento(id: string, fimEm: string): Promise<void>;
  adicionarAdendo(id: string, adendo: Addendum): Promise<void>;
}
export interface AuditoriaRepo {
  listarAuditoria(entidadeId?: string): Promise<AuditEntry[]>; registrarAuditoria(entry: AuditEntry): Promise<void>;
}
export interface ConfiguracaoRepo {
  buscarConfiguracao(): Promise<Settings>; salvarConfiguracao(settings: Settings): Promise<void>;
  exportarTudo(): Promise<{ pacientes: Patient[]; anamneses: Anamnesis[]; atendimentos: Encounter[]; auditoria: AuditEntry[]; configuracao: Settings }>;
  restaurarTudo(): Promise<void>;
}

export type SistemaRepo = PacienteRepo & AnamneseRepo & AtendimentoRepo & AuditoriaRepo & ConfiguracaoRepo;
