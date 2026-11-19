export type Patient = {
  id: string; nome: string; nomeSocial?: string; nascimento: string; genero: string;
  orientacao?: string; racaCor?: string; estadoCivil?: string; escolaridade?: string;
  profissao?: string; religiao?: string; naturalidade?: string; cpf?: string;
  telefone?: string; email?: string; endereco?: string; emergenciaNome?: string;
  emergenciaVinculo?: string; emergenciaTelefone?: string; responsavelLegal?: string;
  modalidadePlano?: string; criadoEm: string; atualizadoEm: string;
  arquivado?: boolean; riscoAltoRevisto?: boolean;
  medicacoesEmUso?: Medication[];
  retornos?: FollowUp[];
};

export type Medication = { id: string; nome: string; dose: string; posologia: string; inicioEm: string; ativo: boolean };
export type MedicationChange = { id: string; medicamento: string; acao: "Manteve" | "Ajustou dose" | "Suspendeu" | "Iniciou nova medicação"; doseAnterior?: string; doseNova?: string; posologia?: string; motivo?: string };
export type FollowUp = { id: string; data: string; status: "Previsto" | "Realizado" | "Remarcado" | "Faltou"; dataOriginal?: string; atendimentoId?: string };

export type Diagnosis = {
  sistema: "CID-10" | "CID-11"; codigo: string; descricao: string;
  tipo: "Principal" | "Secundário"; status: "Hipótese" | "Confirmado";
};

export type Anamnesis = {
  id: string; pacienteId: string; versao: number; data: string;
  conteudo: Record<string, string>; diagnosticos: Diagnosis[];
  status: "rascunho" | "finalizada"; finalizadaEm?: string;
  riscoAltoRevisto?: boolean;
};

export type Addendum = { id: string; texto: string; data: string; autor: string };
export type Encounter = {
  id: string; pacienteId: string; anamneseId?: string; tipo: "Primeira consulta" | "Retorno" | "Teleconsulta" | "Urgência";
  modalidade: "Presencial" | "Online"; inicioEm: string; fimEm?: string;
  duracaoMin?: number; queixa: string; evolucao: string; exameMental: string;
  risco: string; diagnosticos: Diagnosis[]; conduta: string; prescricao: string;
  exames: string; encaminhamentos: string; proximoRetorno?: string;
  status: "em andamento" | "encerrado"; encerradoEm?: string; adendos: Addendum[];
  relatoDesdeUltima?: string; eventos?: string[]; cgiS?: number; cgiI?: number;
  acessoMeios?: string; planoSeguranca?: string; orientacoes?: string;
  indicadores?: { humor?: number; ansiedade?: number; sono?: number; funcionamento?: number };
  adesao?: "Boa" | "Parcial" | "Não aderiu"; adesaoMotivo?: string; efeitosColaterais?: string;
  escalas?: { phq9?: number; gad7?: number; respostas?: Record<string, number> };
  alteracoesMedicacao?: MedicationChange[]; nivelRisco?: "baixo" | "moderado" | "alto";
  eventoGrave?: boolean; retornoObs?: string; concluidoPor?: string; atualizadoEm?: string;
};

export type AuditEntry = {
  id: string; entidade: "paciente" | "anamnese" | "atendimento";
  entidadeId: string; acao: "criou" | "editou" | "finalizou" | "encerrou" | "arquivou" | "adendo" | "ajuste" | "revisou risco";
  quando: string; quem: string; detalhe?: string;
};

export type Settings = { id: "local"; duracaoPadrao: number; seedHistoryVersion?: number };
