export type Patient = {
  id: string; nome: string; nomeSocial?: string; nascimento: string; genero: string;
  orientacao?: string; racaCor?: string; estadoCivil?: string; escolaridade?: string;
  profissao?: string; religiao?: string; naturalidade?: string; cpf?: string;
  telefone?: string; email?: string; endereco?: string; emergenciaNome?: string;
  emergenciaVinculo?: string; emergenciaTelefone?: string; responsavelLegal?: string;
  modalidadePlano?: string; criadoEm: string; atualizadoEm: string;
  arquivado?: boolean; riscoAltoRevisto?: boolean;
};

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
};

export type AuditEntry = {
  id: string; entidade: "paciente" | "anamnese" | "atendimento";
  entidadeId: string; acao: "criou" | "editou" | "finalizou" | "encerrou" | "arquivou" | "adendo" | "ajuste" | "revisou risco";
  quando: string; quem: string; detalhe?: string;
};

export type Settings = { id: "local"; duracaoPadrao: number };
