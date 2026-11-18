import Dexie, { type Table } from "dexie";
import type { Anamnesis, AuditEntry, Encounter, Patient, Settings } from "./types";

export class SistemaDb extends Dexie {
  pacientes!: Table<Patient, string>;
  anamneses!: Table<Anamnesis, string>;
  atendimentos!: Table<Encounter, string>;
  auditoria!: Table<AuditEntry, string>;
  configuracoes!: Table<Settings, string>;
  constructor() {
    super("thales-prontuario-demo");
    this.version(1).stores({
      pacientes: "id, nome, arquivado, atualizadoEm",
      anamneses: "id, pacienteId, versao, status, data",
      atendimentos: "id, pacienteId, status, inicioEm",
      auditoria: "id, entidade, entidadeId, quando",
      configuracoes: "id",
    });
  }
}

export const db = new SistemaDb();
