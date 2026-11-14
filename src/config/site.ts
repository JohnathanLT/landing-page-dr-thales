export type Review = { name: string; rating: number; text: string; source: "Google" | "Doctoralia"; url: string };

export const site = {
  name: "Dr. Thales Sales Cavalcante", // TODO: confirmar nome profissional
  shortName: "Dr. Thales Cavalcante", // TODO: confirmar nome de divulgação
  crm: "CRM-GO 37591", // TODO: substituir pelo CRM real
  rqe: "", // TODO: preencher apenas após confirmar o RQE real
  specialtyLabel: "Psiquiatra",
  fallbackLabel: "Médico · Saúde Mental",
  city: "Goiânia - GO", // TODO: confirmar cidade de atendimento
  whatsapp: "5562900000000", // TODO: substituir pelo WhatsApp real
  whatsappDisplay: "(62) 90000-0000", // TODO: substituir pelo número real
  whatsappMessage: "Olá, Dr. Thales! Vim pelo site e gostaria de agendar uma consulta.",
  phone: "(62) 3000-0000", // TODO: substituir pelo telefone real
  email: "contato@drthalescavalcante.com.br", // TODO: substituir pelo e-mail real
  instagram: "https://www.instagram.com/drthales_scavalcante", // TODO: confirmar perfil oficial
  address: {
    street: "Av. Exemplo, 1000, Sala 1001", // TODO: substituir pelo endereço real
    district: "Setor Bueno", // TODO: substituir pelo bairro real
    city: "Goiânia - GO", // TODO: substituir pela cidade e estado reais
    zip: "74000-000", // TODO: substituir pelo CEP real
    mapsEmbedUrl: "", // TODO: adicionar URL de incorporação do Google Maps
    mapsLink: "", // TODO: adicionar link do Google Maps
  },
  modalities: { presencial: true, online: true },
  insurance: "Atendimento particular. Emitimos recibo para solicitação de reembolso junto ao seu plano de saúde.", // TODO: confirmar política de atendimento e reembolso
  education: [
    "Graduação em Medicina — [Universidade]", // TODO: substituir pela formação real
    "Pós-graduação em Psiquiatria — [Instituição]", // TODO: substituir pela formação real
  ],
  formspreeId: "", // TODO: preencher o ID do formulário Formspree
  previewNotice: "Prévia para aprovação · dados de contato e formação são ilustrativos.",
  previewMode: process.env.NEXT_PUBLIC_PREVIEW_MODE !== "false",
  photo: { enabled: true, src: "/images/dr-thales-formal.png", alt: "Dr. Thales Sales Cavalcante em retrato profissional" },
  aboutPhotos: [
    { src: "/images/dr-thales-consultorio.png", alt: "Dr. Thales em retrato com camisa clara" },
    { src: "/images/dr-thales-retrato.png", alt: "Dr. Thales em retrato sentado" },
    { src: "/images/dr-thales-com-cao.png", alt: "Dr. Thales ao lado de um cachorro" },
    { src: "/images/dr-thales-formal.png", alt: "Dr. Thales em traje social azul" },
  ],
  reviews: [] as Review[],
  seo: {
    description: "Atendimento em saúde mental em Goiânia, com escuta atenta, cuidado individualizado e modalidades presencial e online.", // TODO: revisar após confirmar serviços e credenciais
    url: "https://drthalescavalcante.com.br", // TODO: substituir pelo domínio definitivo
  },
  content: {
    nav: [{ label: "Sobre", href: "#sobre" }, { label: "Atendimento", href: "#atendimento" }, { label: "Como funciona", href: "#como-funciona" }, { label: "Dúvidas", href: "#duvidas" }, { label: "Contato", href: "#contato" }],
    hero: {
      eyebrow: "Cuidado em saúde mental",
      title: "Cuidado em saúde mental com escuta, acolhimento e ciência",
      subtitle: "Atendimento humanizado para quem busca entender o que sente e encontrar um caminho para o equilíbrio.",
      badges: ["Consulta sem pressa", "Sigilo e confidencialidade"],
    },
    about: {
      intro: "Sou e dedico minha prática ao cuidado da saúde mental. Acredito que cada pessoa carrega uma história única — e é a partir dela, com escuta atenta e sem julgamentos, que construímos juntos um plano de cuidado, unindo vínculo terapêutico e medicina baseada em evidências.",
      quote: "Nenhum argumento é necessário para mostrar o poder transformador que a mente pode exercer.",
    },
    services: [
      { icon: "brain", title: "Ansiedade", text: "Quando a preocupação passa a ocupar o dia e o corpo dá sinais de alerta." },
      { icon: "cloud", title: "Depressão", text: "Tristeza persistente, desânimo e perda de interesse no que antes fazia sentido." },
      { icon: "moon", title: "Transtornos do sono", text: "Dificuldade para dormir, despertares frequentes ou sono que não descansa." },
      { icon: "focus", title: "TDAH", text: "Dificuldade de foco, organização e impulsividade que impactam estudos e trabalho." },
      { icon: "waves", title: "Transtorno bipolar", text: "Oscilações de humor que afetam relações, rotina e decisões." },
      { icon: "sparkles", title: "Burnout e estresse", text: "Esgotamento físico e emocional ligado à sobrecarga do dia a dia." },
      { icon: "heart", title: "Transtorno do pânico", text: "Crises súbitas de medo intenso com sintomas físicos marcantes." },
      { icon: "repeat", title: "TOC", text: "Pensamentos intrusivos e rituais repetitivos que geram sofrimento." },
    ],
    process: [
      { title: "Agendamento", text: "Escolha um horário pelo WhatsApp, de forma simples e direta." },
      { title: "Escuta da sua história", text: "Um espaço para conversar com calma sobre o que trouxe você até aqui." },
      { title: "Avaliação e plano", text: "As possibilidades de cuidado são discutidas de forma individual." },
      { title: "Acompanhamento", text: "O cuidado continua com retornos e ajustes quando necessário." },
    ],
    onlineText: "Por videochamada, com a mesma atenção da consulta presencial, de onde você estiver.",
    faqs: [
      { question: "Como funciona a primeira consulta e quanto tempo dura?", answer: "A primeira consulta é um espaço para conversar sobre sua história, suas necessidades e suas expectativas. A duração é informada no agendamento." },
      { question: "O atendimento online tem a mesma qualidade do presencial?", answer: "O atendimento online é realizado por videochamada e mantém o cuidado e a atenção dedicados à consulta presencial." },
      { question: "Atende convênios? Como funciona o reembolso?", answer: "O atendimento é particular. Quando aplicável, é emitido recibo para você solicitar reembolso diretamente ao seu plano de saúde." },
      { question: "Preciso de encaminhamento para agendar?", answer: "Não é necessário encaminhamento para entrar em contato e verificar disponibilidade." },
      { question: "Posso fazer acompanhamento se já faço psicoterapia?", answer: "Sim. O acompanhamento médico e a psicoterapia podem se complementar, respeitando as necessidades de cada pessoa." },
      { question: "Vou precisar tomar remédio?", answer: "Isso depende da avaliação. As opções de cuidado são individuais e discutidas com você." },
      { question: "Os atendimentos são confidenciais?", answer: "Sim. As informações compartilhadas são protegidas pelo sigilo médico e pelas normas profissionais." },
      { question: "Como remarcar ou cancelar?", answer: "Fale pelo WhatsApp com a maior antecedência possível para consultar as opções de remarcação." },
    ],
    privacy: {
      title: "Política de Privacidade",
      intro: "Esta política explica como os dados enviados por este site são tratados. O site solicita apenas as informações necessárias para responder a contatos e pedidos de agendamento.",
      sections: [
        { title: "Dados coletados", text: "O formulário solicita nome, telefone, e-mail e uma mensagem curta, necessários para responder ao contato. Não envie sintomas, diagnósticos, exames ou outras informações de saúde pelo formulário. Dados técnicos básicos podem ser processados pelo provedor de hospedagem para manter a segurança e o funcionamento do site." },
        { title: "Finalidade e base de uso", text: "Os dados enviados são tratados para responder à solicitação de contato ou agendamento e adotar providências a pedido do titular. O formulário não se destina ao atendimento de urgências nem à coleta de dados sensíveis de saúde." },
        { title: "Compartilhamento e fornecedores", text: "O formulário pode ser processado pela Formspree, conforme os termos e a política de privacidade do fornecedor. Dados podem ser tratados por provedores técnicos estritamente para operar, proteger e entregar o site. Não vendemos dados pessoais." },
        { title: "Retenção e segurança", text: "As informações são mantidas apenas pelo tempo necessário para responder ao contato e cumprir obrigações aplicáveis. São adotadas medidas razoáveis para proteger os dados, embora nenhum sistema de transmissão ou armazenamento possa garantir segurança absoluta." },
        { title: "Seus direitos e contato", text: "Nos termos da legislação aplicável, você pode solicitar informações, correção ou eliminação de dados pessoais, observadas as obrigações legais de retenção. Para exercer seus direitos ou esclarecer dúvidas, escreva para o e-mail de contato exibido neste site." },
        { title: "Cookies e alterações", text: "Este site não usa cookies de publicidade por padrão. Recursos externos podem adotar suas próprias práticas de privacidade. Esta política pode ser atualizada para refletir mudanças no site ou na legislação." },
      ],
    },
    emergency: "Em caso de emergência, procure o pronto-socorro mais próximo ou ligue 192 (SAMU). Se precisar conversar, o CVV atende 24h pelo 188.",
  },
};

export function getTitle() {
  return site.rqe.trim() ? site.specialtyLabel : site.fallbackLabel;
}

export function getCredentialLine() {
  return site.rqe.trim()
    ? ["Médico", site.crm, getTitle(), `RQE ${site.rqe.replace(/^RQE\s*/i, "")}`].join(" · ")
    : [getTitle(), site.crm].join(" · ");
}

export function getWhatsAppUrl() {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || site.seo.url;
}

export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (basePath ? basePath.replace(/\/$/, "") : "") + path;
}
