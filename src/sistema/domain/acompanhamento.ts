import type { Encounter, FollowUp } from "../data/types";

export type Trend = "Melhora" | "Estável" | "Piora";
export type HistoryAlert = { id: string; titulo: string; data: string; atendimentoId?: string; severidade: "alto" | "moderado" | "info" };

const chronological = (rows: Encounter[]) => [...rows].filter((row) => row.status === "encerrado").sort((a, b) => a.inicioEm.localeCompare(b.inicioEm));

export function cgiTrend(rows: Encounter[]): Trend {
  const scores = chronological(rows).map((item) => item.cgiS).filter((score): score is number => typeof score === "number");
  if (scores.length < 2) return "Estável";
  const difference = scores.at(-1)! - scores.at(-2)!;
  return difference <= -1 ? "Melhora" : difference >= 1 ? "Piora" : "Estável";
}

export function adherenceSummary(followUps: FollowUp[]) {
  const measured = followUps.filter((item) => item.status === "Realizado" || item.status === "Faltou");
  const missed = measured.filter((item) => item.status === "Faltou").length;
  return { missed, percent: measured.length ? Math.round(((measured.length - missed) / measured.length) * 100) : 100 };
}

export function effectiveFollowUpStatus(item: FollowUp, now = new Date()): FollowUp["status"] | "Atrasado" {
  if (item.status !== "Previsto") return item.status;
  const due = new Date(`${item.data.slice(0, 10)}T23:59:59-03:00`);
  return now.getTime() - due.getTime() > 7 * 86400000 ? "Atrasado" : "Previsto";
}

export function historyAlerts(rows: Encounter[], followUps: FollowUp[], now = new Date()): HistoryAlert[] {
  const ordered = chronological(rows);
  const alerts: HistoryAlert[] = [];
  const lastTwo = ordered.slice(-2);
  if (lastTwo.length === 2 && lastTwo.every((item) => typeof item.cgiI === "number" && item.cgiI >= 5)) {
    alerts.push({ id: "cgi-i-piora", titulo: "Piora em duas consultas seguidas (CGI-I)", data: lastTwo[1].inicioEm, atendimentoId: lastTwo[1].id, severidade: "alto" });
  }
  if (ordered.length >= 3) {
    const three = ordered.slice(-3).map((item) => item.cgiS);
    if (three.every((score): score is number => typeof score === "number") && three[0] < three[1] && three[1] < three[2]) {
      alerts.push({ id: "cgi-s-piora", titulo: "CGI-S subiu em duas consultas consecutivas", data: ordered.at(-1)!.inicioEm, atendimentoId: ordered.at(-1)!.id, severidade: "alto" });
    }
  }
  for (const scale of ["phq9", "gad7"] as const) {
    const scored = ordered.filter((item) => typeof item.escalas?.[scale] === "number");
    if (scored.length >= 2 && scored.at(-1)!.escalas![scale]! - scored.at(-2)!.escalas![scale]! >= 5) {
      alerts.push({ id: `${scale}-aumento`, titulo: `Aumento de 5 pontos ou mais no ${scale.toUpperCase()}`, data: scored.at(-1)!.inicioEm, atendimentoId: scored.at(-1)!.id, severidade: "moderado" });
    }
  }
  const riskLevel = { baixo: 0, moderado: 1, alto: 2 } as const;
  if (ordered.length >= 2) {
    const before = ordered.at(-2)!.nivelRisco;
    const current = ordered.at(-1)!.nivelRisco;
    if (before && current && riskLevel[current] > riskLevel[before]) alerts.push({ id: "risco-subiu", titulo: "O nível de risco subiu em relação à consulta anterior", data: ordered.at(-1)!.inicioEm, atendimentoId: ordered.at(-1)!.id, severidade: "alto" });
  }
  const overdue = followUps.filter((item) => effectiveFollowUpStatus(item, now) === "Atrasado");
  overdue.forEach((item) => alerts.push({ id: `retorno-atrasado-${item.id}`, titulo: "Retorno atrasado há mais de 7 dias", data: item.data, severidade: "moderado" }));
  const missed = [...followUps].filter((item) => item.status === "Faltou").sort((a, b) => a.data.localeCompare(b.data));
  if (missed.length >= 2 && missed.at(-1)!.id !== missed.at(-2)!.id) alerts.push({ id: "duas-faltas", titulo: "Duas faltas registradas", data: missed.at(-1)!.data, severidade: "moderado" });
  ordered.filter((item) => item.eventoGrave).forEach((item) => alerts.push({ id: `evento-grave-${item.id}`, titulo: "Evento grave registrado", data: item.inicioEm, atendimentoId: item.id, severidade: "alto" }));
  return alerts;
}
