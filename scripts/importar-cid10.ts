import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

async function main() {
// Converte CID-10-SUBCATEGORIAS.CSV e o CID-10-CATEGORIAS.CSV vizinho do pacote oficial DATASUS.
// Exemplo: pnpm dlx tsx scripts/importar-cid10.ts ./CID-10-SUBCATEGORIAS.CSV
const input = process.argv[2];
if (!input) throw new Error("Informe o caminho de CID-10-SUBCATEGORIAS.CSV do DATASUS.");
const categoryInput = process.argv[3] ?? join(dirname(input), "CID-10-CATEGORIAS.CSV");

function parseRow(line: string, delimiter: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"' && quoted) { value += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === delimiter && !quoted) { values.push(value.trim()); value = ""; }
    else value += char;
  }
  values.push(value.trim());
  return values;
}

async function loadCodes(path: string) {
  const bytes = await readFile(path);
  const lines = bytes.toString("latin1").replace(/^\uFEFF/, "").split(/\r?\n/).filter(Boolean);
  const delimiter = lines[0].includes(";") ? ";" : ",";
  const headers = parseRow(lines.shift()!, delimiter).map((value) => value.replace(/^\uFEFF/, "").toUpperCase());
  const codeColumn = headers.findIndex((value) => ["SUBCAT", "CAT", "CODIGO", "CÓDIGO", "CODE"].includes(value));
  const descriptionColumn = headers.findIndex((value) => ["DESCRICAO", "DESCRIÇÃO", "DESCRIPTION"].includes(value));
  if (codeColumn < 0 || descriptionColumn < 0) throw new Error("O CSV precisa conter colunas CAT/SUBCAT/CODIGO e DESCRICAO.");
  return lines.flatMap((line) => {
    const columns = parseRow(line, delimiter);
    const rawCode = columns[codeColumn]?.toUpperCase().replace(/\s/g, "");
    const codigo = rawCode?.replace(/^([A-Z])(\d{2})(\d+)$/, "$1$2.$3");
    const descricao = columns[descriptionColumn];
    if (!codigo || !descricao || !/^(F\d{2}(?:\.\d+)?|Z\d{2}(?:\.\d+)?|R\d{2}(?:\.\d+)?)$/.test(codigo)) return [];
    return [{ codigo, descricao, capitulo: groupFor(codigo) }];
  });
}

const groupFor = (code: string) => {
  if (code.startsWith("Z")) return "Z00-Z99";
  if (code.startsWith("R")) return "R00-R99";
  const number = Number(code.slice(1, 3));
  if (number === 99) return "F99";
  const start = Math.floor(number / 10) * 10;
  return `F${String(start).padStart(2, "0")}-F${String(Math.min(start + 9, 98)).padStart(2, "0")}`;
};

const subcategories = await loadCodes(input);
const categories = await loadCodes(categoryInput).catch(() => []);
const codigos = [...new Map([...categories, ...subcategories].map((item) => [item.codigo, item])).values()];
if (!codigos.length) throw new Error("Nenhum código F, Z ou R foi encontrado no arquivo.");

const destination = new URL("../src/sistema/data/cid10-capitulo-v.json", import.meta.url);
const groups = [
  { codigo: "F00-F09", descricao: "Transtornos mentais orgânicos, inclusive os sintomáticos" },
  { codigo: "F10-F19", descricao: "Transtornos mentais e comportamentais devidos ao uso de substância psicoativa" },
  { codigo: "F20-F29", descricao: "Esquizofrenia, transtornos esquizotípicos e transtornos delirantes" },
  { codigo: "F30-F39", descricao: "Transtornos do humor [afetivos]" },
  { codigo: "F40-F48", descricao: "Transtornos neuróticos, transtornos relacionados com o estresse e transtornos somatoformes" },
  { codigo: "F50-F59", descricao: "Síndromes comportamentais associadas a disfunções fisiológicas e a fatores físicos" },
  { codigo: "F60-F69", descricao: "Transtornos da personalidade e do comportamento do adulto" },
  { codigo: "F70-F79", descricao: "Retardo mental" },
  { codigo: "F80-F89", descricao: "Transtornos do desenvolvimento psicológico" },
  { codigo: "F90-F98", descricao: "Transtornos do comportamento e transtornos emocionais que aparecem habitualmente durante a infância ou a adolescência" },
  { codigo: "F99", descricao: "Transtorno mental não especificado" },
  { codigo: "Z00-Z99", descricao: "Fatores que influenciam o estado de saúde e o contato com os serviços de saúde" },
  { codigo: "R00-R99", descricao: "Sintomas e sinais relativos a sistemas e condições clínicas" },
];
await writeFile(destination, JSON.stringify({
  fonte: "DATASUS — CID-10 V2008, arquivos CID-10-CATEGORIAS.CSV e CID-10-SUBCATEGORIAS.CSV",
  referencias: ["https://datasus.saude.gov.br/transferencia-de-arquivos2/", "http://www2.datasus.gov.br/cid10/V2008/downloads/CID10CSV.zip"],
  observacao: "Categorias e subcategorias importadas da lista tabular oficial do DATASUS. Confira a versão exigida pelo sistema de saúde em que for utilizado.",
  grupos: groups,
  codigos: codigos.sort((a, b) => a.codigo.localeCompare(b.codigo, "pt-BR")),
}, null, 2) + "\n", "utf8");
console.log(`${codigos.length} códigos F, Z e R gravados em ${destination.pathname}`);
}

void main();
