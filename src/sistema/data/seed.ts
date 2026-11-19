import type { Anamnesis, Encounter, FollowUp, Patient } from "./types";

const now = new Date();
const ago = (days: number, hours = 0) => new Date(now.getTime() - days * 86400000 - hours * 3600000).toISOString();
export const demoPatients: Patient[] = [
  { id: "demo-paciente-001", nome: "Pessoa Fictícia 001", nascimento: "1992-04-12", genero: "Prefere não informar", orientacao: "Prefere não informar", racaCor: "Prefere não informar", estadoCivil: "Não informado", escolaridade: "Ensino superior", profissao: "Profissão fictícia", naturalidade: "Cidade fictícia", telefone: "(00) 00000-0001", email: "pessoa001@example.invalid", modalidadePlano: "Particular", criadoEm: ago(330), atualizadoEm: ago(14), medicacoesEmUso: [{ id: "med-demo-1a", nome: "Medicação fictícia A", dose: "dose demonstrativa ajustada", posologia: "conforme exemplo", inicioEm: ago(190), ativo: true }], retornos: [] },
  { id: "demo-paciente-002", nome: "Pessoa Fictícia 002", nascimento: "1985-11-03", genero: "Prefere não informar", orientacao: "Prefere não informar", racaCor: "Prefere não informar", estadoCivil: "Não informado", escolaridade: "Ensino médio", profissao: "Ocupação fictícia", naturalidade: "Cidade fictícia", telefone: "(00) 00000-0002", email: "pessoa002@example.invalid", modalidadePlano: "Particular", criadoEm: ago(330), atualizadoEm: ago(9), riscoAltoRevisto: true, medicacoesEmUso: [{ id: "med-demo-2a", nome: "Medicação fictícia B", dose: "dose de demonstração", posologia: "conforme exemplo", inicioEm: ago(45), ativo: true }], retornos: [] },
  { id: "demo-paciente-003", nome: "Pessoa Fictícia 003", nascimento: "2001-07-26", genero: "Prefere não informar", orientacao: "Prefere não informar", racaCor: "Prefere não informar", estadoCivil: "Não informado", escolaridade: "Ensino superior em andamento", profissao: "Estudante fictício", naturalidade: "Cidade fictícia", telefone: "(00) 00000-0003", email: "pessoa003@example.invalid", modalidadePlano: "Particular", criadoEm: ago(330), atualizadoEm: ago(1), medicacoesEmUso: [{ id: "med-demo-3a", nome: "Medicação fictícia C", dose: "dose registrada para demonstração", posologia: "conforme exemplo", inicioEm: ago(120), ativo: true }], retornos: [] },
];

const intake = (id: string, patientId: string, risk: string, complaint: string): Anamnesis => ({
  id, pacienteId: patientId, versao: 1, data: ago(14), status: "finalizada", finalizadaEm: ago(14),
  diagnosticos: [],
  conteudo: {
    preferenciaNome: "Pessoa fictícia", informante: "Paciente", acompanhante: "", queixa: complaint,
    motivoEncaminhamento: "Busca espontânea fictícia", encaminhamento: "", iniciativa: "espontânea",
    inicioSintomas: "Há alguns meses (dado demonstrativo)", modoInicio: "gradual", cronologia: "Relato fictício para demonstração do formulário.", frequenciaDuracao: "Informação simulada.", fatores: "Não informado no exemplo.", impactoFuncional: "Exemplo sem relação com pessoa real.", tratamentos: "Sem histórico clínico real.",
    doencas: "Não informado (demonstração)", cirurgias: "Não informado", internacoes: "Não informado", diagnosticosPrevios: "Não informado", alergias: "Não informado", medicacoes: "Nenhuma informação real cadastrada", tentativas: "Não informado (registro demonstrativo)",
    substancias: "Todos os campos de uso de substâncias estão sem informação clínica real.", gestacaoParto: "Não informado", infancia: "Não informado", adolescencia: "Não informado", vidaAdulta: "Não informado", traumas: "Campo demonstrativo sensível — sem relato real.", historiaFamiliar: "Não informado", dinamicaFamiliar: "Não informado", personalidade: "Não informado",
    aparencia: "Sem observação real", atitude: "Não avaliada", consciencia: "Não avaliada", orientacao: "Não avaliada", atencao: "Não avaliada", memoria: "Não avaliada", sensopercepcao: "Não avaliada", pensamentoCurso: "Não avaliado", pensamentoForma: "Não avaliado", pensamentoConteudo: "Não avaliado", linguagem: "Não avaliada", afeto: "Não avaliado", humor: "Não avaliado", psicomotricidade: "Não avaliada", volicao: "Não avaliada", insight: "Não avaliado", observacaoMental: "Dados demonstrativos; não representam exame clínico.",
    ideacaoSuicida: risk === "alto" ? "ativa sem plano (exemplo fictício)" : "não informado", acessoMeios: "Não informado", tentativasPrevias: "Não informado", fatoresRisco: "Não informado", fatoresProtecao: "Não informado", autolesao: "Não informado", heteroagressividade: "Não informado", risco: risk, planoSeguranca: risk === "alto" ? "Demonstração de alerta visual. Este registro não representa paciente real nem orientação clínica." : "Não informado",
    phq9: "", gad7: "", formulacao: "Formulação fictícia para demonstração.", plano: "Plano demonstrativo — não utilizar como conduta clínica.", exames: "", encaminhamentos: "", retorno: "",
  },
});

export const demoAnamneses = [
  intake("demo-anamnese-001-v1", "demo-paciente-001", "moderado", "Queixa principal fictícia: preocupação persistente em situações cotidianas."),
  intake("demo-anamnese-002-v1", "demo-paciente-002", "alto", "Queixa principal fictícia: desânimo e redução de interesse (exemplo)."),
  intake("demo-anamnese-003-v1", "demo-paciente-003", "baixo", "Queixa principal fictícia: dificuldade de organização e atenção."),
];

const monthsAgo = (months: number) => { const date = new Date(); date.setDate(12); date.setHours(14, 0, 0, 0); date.setMonth(date.getMonth() - months); return date; };
const appointment = (patientIndex: number, n: number, cgiS: number, cgiI: number | undefined, phq: number, gad: number, risk: "baixo" | "moderado" | "alto", extra: Partial<Encounter> = {}): Encounter => {
  const patient = demoPatients[patientIndex]; const when = monthsAgo(10 - n * 1.25); const end = new Date(when.getTime() + 50 * 60000);
  const cid = patientIndex === 0 ? { sistema: "CID-10" as const, codigo: "F41.1", descricao: "Ansiedade generalizada", tipo: "Principal" as const, status: "Confirmado" as const } : patientIndex === 1 ? { sistema: "CID-10" as const, codigo: "F32.1", descricao: "Episódio depressivo moderado", tipo: "Principal" as const, status: "Confirmado" as const } : { sistema: "CID-10" as const, codigo: "F90.0", descricao: "Distúrbios da atividade e da atenção", tipo: "Principal" as const, status: "Hipótese" as const };
  const id = `demo-consulta-00${patientIndex + 1}-${n + 1}`;
  return { id, pacienteId: patient.id, anamneseId: n === 0 ? `demo-anamnese-00${patientIndex + 1}-v1` : undefined, tipo: n === 0 ? "Primeira consulta" : "Retorno", modalidade: n % 2 ? "Presencial" : "Online", inicioEm: when.toISOString(), fimEm: end.toISOString(), encerradoEm: end.toISOString(), duracaoMin: 50, queixa: "Relato fictício de demonstração; sem vínculo com pessoa real.", relatoDesdeUltima: n ? "Acompanhamento inventado para demonstrar evolução entre consultas." : "Primeira consulta demonstrativa.", eventos: n === 0 ? ["Nenhum"] : [], evolucao: "Evolução inventada para demonstração do prontuário. Não representa avaliação clínica.", exameMental: "Dados demonstrativos; exame clínico não realizado.", risco: risk, nivelRisco: risk, cgiS, cgiI, indicadores: { humor: Math.max(1, 10 - cgiS), ansiedade: Math.min(10, cgiS), sono: Math.max(1, 9 - Math.floor(cgiS / 2)), funcionamento: Math.max(1, 10 - cgiS) }, adesao: patientIndex === 2 && n > 3 ? "Parcial" : "Boa", efeitosColaterais: "Nenhum dado clínico real.", escalas: { phq9: phq, gad7: gad }, diagnosticos: [cid], conduta: "Plano fictício para demonstrar o histórico, sem orientação clínica.", prescricao: "Registro fictício, não utilizar.", exames: "", encaminhamentos: "", status: "encerrado", adendos: [], alteracoesMedicacao: n === 3 && patientIndex === 0 ? [{ id: `${id}-med`, medicamento: "Medicação fictícia A", acao: "Ajustou dose", doseAnterior: "dose inicial de demonstração", doseNova: "dose ajustada demonstrativa", motivo: "Exemplo de ajuste fictício." }] : patientIndex === 1 && n === 4 ? [{ id: `${id}-med`, medicamento: "Medicação fictícia B", acao: "Suspendeu", motivo: "Suspensão simulada sem orientação real." }] : patientIndex === 1 && n === 6 ? [{ id: `${id}-med`, medicamento: "Medicação fictícia B", acao: "Iniciou nova medicação", doseNova: "dose de demonstração", motivo: "Retomada fictícia." }] : [], proximoRetorno: new Date(end.getTime() + 30 * 86400000).toISOString().slice(0, 10), ...extra };
};

const cgi = [[6,5,5,4,3,3,2],[6,5,4,4,6,5,3],[5,5,4,5,5,6,5]];
const phq = [[20,17,14,11,9,7,5],[21,17,13,12,18,16,10],[15,14,12,14,14,16,13]];
const gad = [[18,15,13,10,8,6,4],[17,14,12,11,16,14,9],[14,14,12,13,14,15,12]];
const risk: ("baixo"|"moderado"|"alto")[][] = [["moderado","moderado","moderado","baixo","baixo","baixo","baixo"],["moderado","moderado","baixo","baixo","alto","moderado","baixo"],["baixo","baixo","baixo","baixo","moderado","moderado","baixo"]];
export const demoEncounters: Encounter[] = [
  ...demoPatients.flatMap((_, patientIndex) => cgi[patientIndex].map((score, n) => appointment(patientIndex, n, score, n === 0 ? undefined : patientIndex === 1 && n >= 4 ? 6 : 3, phq[patientIndex][n], gad[patientIndex][n], risk[patientIndex][n], { eventoGrave: patientIndex === 1 && n === 4, eventos: patientIndex === 1 && n === 4 ? ["crise", "mudança de vida importante"] : n ? [] : ["nenhum"] }))),
  { id: "demo-consulta-003-em-andamento", pacienteId: demoPatients[2].id, tipo: "Retorno", modalidade: "Presencial", inicioEm: ago(0, 5), queixa: "Atendimento aberto fictício para demonstrar o fluxo de conclusão.", relatoDesdeUltima: "Exemplo sem informações clínicas reais.", eventos: ["Nenhum"], evolucao: "", exameMental: "", risco: "", diagnosticos: [{ sistema: "CID-10", codigo: "F90.0", descricao: "Distúrbios da atividade e da atenção", tipo: "Principal", status: "Hipótese" }], conduta: "", prescricao: "", exames: "", encaminhamentos: "", status: "em andamento", adendos: [], alteracoesMedicacao: [] },
];

const followupsFor = (patientIndex: number): FollowUp[] => {
  if (patientIndex === 2) return [
    { id: "retorno-3-falta-1", data: ago(120).slice(0, 10), status: "Faltou" },
    { id: "retorno-3-falta-2", data: ago(80).slice(0, 10), status: "Faltou" },
    { id: "retorno-3-atrasado", data: ago(20).slice(0, 10), status: "Previsto" },
  ];
  const latest = demoEncounters.filter((item) => item.pacienteId === demoPatients[patientIndex].id && item.status === "encerrado").at(-1);
  return latest ? [{ id: `retorno-${patientIndex + 1}-proximo`, data: new Date(Date.now() + (patientIndex ? 15 : 30) * 86400000).toISOString().slice(0, 10), status: "Previsto", atendimentoId: latest.id }] : [];
};
demoPatients.forEach((patient, index) => { patient.retornos = followupsFor(index); });
