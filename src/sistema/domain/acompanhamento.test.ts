import { describe, expect, it } from "vitest";
import { adherenceSummary, cgiTrend, effectiveFollowUpStatus, historyAlerts } from "./acompanhamento";
import type { Encounter, FollowUp } from "../data/types";

const encounter = (id: string, daysAgo: number, extra: Partial<Encounter> = {}): Encounter => ({
  id, pacienteId: "demo", tipo: "Retorno", modalidade: "Presencial",
  inicioEm: new Date(Date.now() - daysAgo * 86400000).toISOString(), fimEm: new Date(Date.now() - (daysAgo * 86400000) + 1800000).toISOString(),
  duracaoMin: 30, queixa: "", evolucao: "", exameMental: "", risco: "baixo", diagnosticos: [], conduta: "", prescricao: "", exames: "", encaminhamentos: "", status: "encerrado", adendos: [], ...extra,
});

describe("resumo do acompanhamento", () => {
  it("calcula tendência pelo CGI-S das duas últimas consultas", () => {
    expect(cgiTrend([encounter("1", 30, { cgiS: 5 }), encounter("2", 1, { cgiS: 4 })])).toBe("Melhora");
    expect(cgiTrend([encounter("1", 30, { cgiS: 3 }), encounter("2", 1, { cgiS: 4 })])).toBe("Piora");
    expect(cgiTrend([encounter("1", 30, { cgiS: 4 }), encounter("2", 1, { cgiS: 4 })])).toBe("Estável");
  });

  it("calcula adesão e faltas somente entre retornos medidos", () => {
    expect(adherenceSummary([{ id: "1", data: "2026-01-01", status: "Realizado" }, { id: "2", data: "2026-02-01", status: "Faltou" }, { id: "3", data: "2026-03-01", status: "Previsto" }])).toEqual({ missed: 1, percent: 50 });
  });

  it("marca retorno como atrasado após sete dias e emite alertas de piora e evento grave", () => {
    const oldDate = "2026-01-01";
    const follow: FollowUp = { id: "r1", data: oldDate, status: "Previsto" };
    expect(effectiveFollowUpStatus(follow, new Date("2026-01-10T12:00:00-03:00"))).toBe("Atrasado");
    const alerts = historyAlerts([
      encounter("a", 10, { cgiS: 3, cgiI: 5, nivelRisco: "baixo", escalas: { phq9: 6 } }),
      encounter("b", 2, { cgiS: 4, cgiI: 6, nivelRisco: "alto", eventoGrave: true, escalas: { phq9: 11 } }),
    ], [follow], new Date("2026-01-10T12:00:00-03:00"));
    expect(alerts.map((item) => item.id)).toEqual(expect.arrayContaining(["cgi-i-piora", "phq9-aumento", "risco-subiu", "retorno-atrasado-r1", "evento-grave-b"]));
  });
});
