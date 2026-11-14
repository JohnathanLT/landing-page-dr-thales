"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowUpRight, Brain, Check, ChevronDown, CircleHelp, Cloud, Focus, Heart, Instagram, MapPin, Menu, MessageCircle, Moon, Repeat2, ShieldCheck, Sparkles, Video, Waves, X, Star, Phone, Mail } from "lucide-react";
import { site, getCredentialLine, getTitle, getWhatsAppUrl, withBasePath } from "@/config/site";

const iconMap = { brain: Brain, cloud: Cloud, moon: Moon, focus: Focus, waves: Waves, sparkles: Sparkles, heart: Heart, repeat: Repeat2 };
const reveal = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: "easeOut" } } };

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} variants={reveal} initial={reduced ? false : "hidden"} whileInView={reduced ? undefined : "visible"} viewport={{ once: true, amount: 0.14 }}>{children}</motion.div>;
}
function WA({ children, className }: { children: React.ReactNode; className: string }) {
  return <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className={className}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-deep/10 bg-paper/90 backdrop-blur-xl">
    <div className="section-wrap flex h-[76px] items-center justify-between gap-4">
      <a href="#inicio" aria-label={site.shortName + " — início"} className="min-w-0"><span className="block max-w-[200px] truncate text-[15px] font-bold tracking-tight text-ink sm:max-w-none sm:text-base">{site.shortName}</span><span className="mt-0.5 block max-w-[200px] truncate text-[9px] font-medium text-slate-500 sm:max-w-none sm:text-[10px]">{getCredentialLine()}</span></a>
      <nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">{site.content.nav.map((item) => <a key={item.href} href={item.href} className="text-[13px] font-medium text-slate-600 hover:text-deep">{item.label}</a>)}</nav>
      <div className="flex items-center gap-2"><WA className="hidden items-center gap-2 rounded-full bg-deep px-5 py-3 text-xs font-semibold text-white transition hover:bg-[#173c45] sm:inline-flex">Agendar consulta <ArrowUpRight size={15}/></WA><button type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)} className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-deep lg:hidden">{open ? <X size={20}/> : <Menu size={20}/>}</button></div>
    </div>
    {open && <nav id="mobile-navigation" aria-label="Navegação móvel" className="border-t border-slate-200 bg-paper px-5 pb-5 pt-3 lg:hidden">{site.content.nav.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3 text-sm font-medium text-ink">{item.label}</a>)}<WA className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-deep px-5 py-3.5 text-sm font-semibold text-white">Agendar consulta <ArrowUpRight size={16}/></WA></nav>}
  </header>;
}

function Hero() {
  return <section id="inicio" className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
    <div className="pointer-events-none absolute -right-40 top-24 size-[34rem] rounded-full bg-sage/70 blur-3xl"/>
    <div className="section-wrap relative grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
      <Reveal className="max-w-[640px]"><p className="mb-5 inline-flex rounded-full border border-terracotta/20 bg-[#fff5ef] px-4 py-2 text-[11px] font-semibold text-[#8a513d]">{site.previewNotice}</p><p className="section-kicker mb-5 flex items-center gap-2"><span className="h-px w-7 bg-terracotta"/>{site.content.hero.eyebrow}</p><h1 className="section-title max-w-2xl text-[clamp(2.7rem,5vw,4.25rem)]">{site.content.hero.title}</h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"><span className="font-semibold text-ink">{getTitle()} em Goiânia.</span> {site.content.hero.subtitle}</p><p className="mt-3 text-xs font-medium text-slate-500">{getCredentialLine()}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><WA className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-deep px-7 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#173c45]">Agendar consulta <ArrowUpRight size={17}/></WA><a href="#atendimento" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-deep/20 px-7 text-sm font-semibold text-deep hover:bg-sage">Conheça o atendimento <ArrowDown size={16}/></a></div>
        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-slate-600">{(site.modalities.presencial && site.modalities.online ? ["Presencial e online"] : site.modalities.presencial ? ["Presencial"] : site.modalities.online ? ["Online"] : []).concat(site.content.hero.badges).map((label) => <span className="inline-flex items-center gap-2" key={label}><Check size={15} className="text-deep"/>{label}</span>)}</div>
      </Reveal>
      <Reveal className="relative mx-auto w-full max-w-[520px]"><div className="organic relative aspect-[.92] w-full overflow-hidden bg-[#e7eeea]">{site.photo.enabled ? <Image src={withBasePath(site.photo.src)} alt={site.photo.alt} fill priority sizes="(max-width: 1024px) 90vw, 42vw" className="object-cover"/> : <><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_28%,rgba(255,255,255,.9),transparent_36%),linear-gradient(145deg,#e8eeea_10%,#d6e4dd_100%)]"/>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 560" fill="none" aria-hidden="true"><path d="M70 447c81-62 124-141 179-250 52-103 133-113 206-50" stroke="#fff" strokeOpacity=".58" strokeWidth="2"/><path d="M42 495c103-67 147-163 204-265 62-111 141-122 223-53" stroke="#1f4e5a" strokeOpacity=".11" strokeWidth="1.5"/><circle cx="391" cy="107" r="40" stroke="#c97b5a" strokeOpacity=".38"/><circle cx="391" cy="107" r="56" stroke="#c97b5a" strokeOpacity=".16"/></svg>
        <div className="absolute inset-0 flex items-center justify-center"><span className="serif text-[clamp(8rem,24vw,15rem)] tracking-[-.1em] text-deep/15">TC</span></div>
        <div className="absolute bottom-7 left-7 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur-md"><span className="block text-xs font-bold text-deep">{site.shortName}</span><span className="mt-1 block text-[10px] text-slate-500">{site.city}</span></div>
      </>}</div><div className="absolute -bottom-5 -right-3 flex size-[82px] items-center justify-center rounded-full border-[6px] border-paper bg-terracotta text-center text-[10px] font-semibold leading-4 text-white shadow-lg sm:-right-5 sm:size-24"><span>cuidado<br/>com presença</span></div></Reveal>
    </div>
  </section>;
}

function About() {
  return <section id="sobre" className="bg-sage py-20 sm:py-28"><div className="section-wrap grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
    <Reveal className="relative mx-auto w-full max-w-[440px]"><div className="grid aspect-[1.02] grid-cols-2 grid-rows-2 gap-3">
      {site.aboutPhotos.map((photo, index) => <div key={photo.src} className={"relative overflow-hidden bg-[#dce7e0] " + (index === 0 ? "rounded-tl-[2rem]" : index === 1 ? "rounded-tr-[2rem]" : index === 2 ? "rounded-bl-[2rem]" : "rounded-br-[2rem]")}><Image src={withBasePath(photo.src)} alt={photo.alt} fill sizes="(max-width: 1024px) 45vw, 220px" className="object-cover transition duration-500 hover:scale-[1.03]"/></div>)}
    </div><div className="absolute -bottom-6 -left-5 rounded-2xl bg-paper p-4 shadow-soft"><ShieldCheck className="text-deep" size={21}/><p className="mt-2 text-xs font-semibold text-ink">Acolhimento e confidencialidade</p></div></Reveal>
    <Reveal><p className="section-kicker">Sobre</p><h2 className="section-title mt-4">Cada história merece ser ouvida com cuidado.</h2><p className="mt-6 text-base leading-8 text-slate-600">{site.content.about.intro.replace(/^Sou /, "Sou " + getTitle() + " ")}</p><div className="mt-7 border-l-2 border-terracotta pl-5"><p className="serif text-xl italic leading-8 text-deep">“{site.content.about.quote}”</p></div>
      <h3 className="mt-8 text-xs font-bold uppercase tracking-[.14em] text-slate-500">Formação e registro profissional</h3><ul className="mt-3 space-y-2 text-sm text-slate-600">{site.education.map((item) => <li key={item} className="flex items-start gap-2"><Check size={16} className="mt-0.5 shrink-0 text-deep"/>{item}</li>)}</ul><p className="mt-4 text-sm font-semibold text-deep">{getCredentialLine()}</p></Reveal>
  </div></section>;
}

function Services() {
  return <section id="atendimento" className="py-20 sm:py-28"><div className="section-wrap"><Reveal className="mx-auto max-w-2xl text-center"><p className="section-kicker">Cuidado individualizado</p><h2 className="section-title mt-4">Como posso ajudar</h2><p className="mt-4 leading-7 text-slate-600">Um espaço de cuidado para diferentes momentos e necessidades da vida.</p></Reveal>
    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{site.content.services.map((item) => { const Icon = iconMap[item.icon as keyof typeof iconMap]; return <Reveal key={item.title} className="h-full"><article className="group h-full rounded-card border border-slate-200/70 bg-white p-6 shadow-[0_8px_32px_rgba(31,78,90,.035)] transition duration-300 hover:-translate-y-1 hover:shadow-soft"><div className="flex size-11 items-center justify-center rounded-2xl bg-sage text-deep group-hover:bg-deep group-hover:text-white">{Icon && <Icon size={21} strokeWidth={1.7}/>}</div><h3 className="serif mt-5 text-xl text-ink">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p></article></Reveal>; })}</div>
    <p className="mt-7 text-center text-xs text-slate-500">Cada caso é avaliado individualmente na consulta.</p>
  </div></section>;
}

function Process() {
  return <section id="como-funciona" className="bg-sage py-20 sm:py-28"><div className="section-wrap"><Reveal className="max-w-2xl"><p className="section-kicker">Seu primeiro passo</p><h2 className="section-title mt-4">Como funciona a primeira consulta</h2><p className="mt-4 leading-7 text-slate-600">Um caminho construído junto com você, com clareza em cada etapa.</p></Reveal>
    <div className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"><div className="absolute left-[7%] right-[7%] top-7 hidden border-t border-dashed border-deep/25 lg:block"/>{site.content.process.map((item, i) => <Reveal key={item.title}><div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-deep/15 bg-paper text-sm font-bold text-deep shadow-sm">{String(i+1).padStart(2,"0")}</div><h3 className="serif mt-5 text-xl">{item.title}</h3><p className="mt-2 max-w-xs text-sm leading-6 text-slate-600">{item.text}</p></Reveal>)}</div>
  </div></section>;
}

function Modalities() {
  if (!site.modalities.presencial && !site.modalities.online) return null;
  const mapUrl = site.address.mapsLink || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent([site.address.street, site.address.district, site.address.city].join(", "));
  return <section className="py-20 sm:py-28"><div className="section-wrap"><Reveal className="text-center"><p className="section-kicker">Onde nos encontramos</p><h2 className="section-title mt-4">Modalidades de atendimento</h2></Reveal><div className="mx-auto mt-11 grid max-w-4xl gap-5 md:grid-cols-2">
    {site.modalities.presencial && <Reveal><article className="h-full rounded-card border border-slate-200 bg-white p-7 shadow-soft sm:p-9"><span className="flex size-12 items-center justify-center rounded-2xl bg-sage text-deep"><MapPin size={22}/></span><h3 className="serif mt-5 text-2xl">Presencial</h3><p className="mt-3 leading-7 text-slate-600">{site.address.street}<br/>{site.address.district} · {site.address.city}<br/>CEP {site.address.zip}</p><a href={mapUrl} target="_blank" rel="noreferrer noopener" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-deep hover:underline">Ver no mapa <ArrowUpRight size={16}/></a></article></Reveal>}
    {site.modalities.online && <Reveal><article className="h-full rounded-card border border-slate-200 bg-white p-7 shadow-soft sm:p-9"><span className="flex size-12 items-center justify-center rounded-2xl bg-sage text-deep"><Video size={22}/></span><h3 className="serif mt-5 text-2xl">Online</h3><p className="mt-3 leading-7 text-slate-600">{site.content.onlineText}</p><div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-deep"><ShieldCheck size={17}/> Privacidade na videochamada</div></article></Reveal>}
  </div><p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-6 text-slate-500">{site.insurance}</p></div></section>;
}

function Reviews() {
  if (!site.reviews.length) return null;
  return <section id="avaliacoes" className="bg-sage py-20 sm:py-24"><div className="section-wrap"><Reveal className="text-center"><p className="section-kicker">Experiências</p><h2 className="section-title mt-4">Avaliações</h2></Reveal><div className="mt-10 grid gap-5 md:grid-cols-3">{site.reviews.map((review) => <article key={review.name + review.text} className="rounded-card bg-white p-6 shadow-soft"><div className="flex gap-1 text-terracotta" aria-label={review.rating + " de 5 estrelas"}>{Array.from({length: review.rating}).map((_,i)=><Star key={i} size={15} fill="currentColor"/>)}</div><p className="mt-4 text-sm leading-6 text-slate-600">“{review.text}”</p><p className="mt-5 text-xs font-semibold text-ink">{review.name}</p><a href={review.url} target="_blank" rel="noreferrer noopener" className="mt-2 inline-block text-xs font-semibold text-deep underline">Ver no {review.source}</a></article>)}</div></div></section>;
}

function FAQ() {
  const [active, setActive] = useState<number | null>(0);
  return <section id="duvidas" className="bg-sage py-20 sm:py-28"><div className="section-wrap grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
    <Reveal><p className="section-kicker">Perguntas frequentes</p><h2 className="section-title mt-4">Dúvidas comuns, respostas claras.</h2><p className="mt-4 leading-7 text-slate-600">Se ainda ficou alguma dúvida, fale diretamente pelo WhatsApp.</p><WA className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-deep hover:underline">Falar pelo WhatsApp <ArrowRight size={16}/></WA></Reveal>
    <div className="divide-y divide-slate-300/70 border-y border-slate-300/70">{site.content.faqs.map((item,i)=><div key={item.question}><h3><button type="button" aria-expanded={active===i} aria-controls={"faq-answer-" + i} onClick={()=>setActive(active===i?null:i)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-sm font-semibold leading-6 text-ink sm:text-base">{item.question}<ChevronDown size={18} className={"shrink-0 text-deep transition-transform " + (active===i ? "rotate-180" : "")} aria-hidden="true"/></button></h3>{active===i&&<div id={"faq-answer-" + i} className="pb-5 pr-8 text-sm leading-7 text-slate-600">{item.answer}</div>}</div>)}</div>
  </div></section>;
}

function Contact() {
  const [status, setStatus] = useState<"idle"|"sending"|"success"|"error"|"unconfigured">("idle");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!site.formspreeId) { setStatus("unconfigured"); return; }
    setStatus("sending");
    const form = event.currentTarget;
    try {
      const response = await fetch("https://formspree.io/f/" + site.formspreeId, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("request failed");
      form.reset(); setStatus("success");
    } catch { setStatus("error"); }
  }
  return <section id="contato" className="py-20 sm:py-28"><div className="section-wrap"><Reveal className="mx-auto max-w-2xl text-center"><p className="section-kicker">Contato</p><h2 className="section-title mt-4">Vamos conversar?</h2><p className="mt-4 leading-7 text-slate-600">Entre em contato para saber sobre horários e modalidades de atendimento.</p></Reveal>
    <div className="mt-11 grid gap-8 lg:grid-cols-[1.05fr_.95fr]"><Reveal><form onSubmit={submit} className="rounded-card border border-slate-200 bg-white p-6 shadow-soft sm:p-8"><div className="grid gap-5 sm:grid-cols-2">
      <label className="text-xs font-semibold text-ink">Nome<input required name="name" autoComplete="name" maxLength={100} className="mt-2 block min-h-12 w-full rounded-xl border border-slate-200 bg-paper px-4 text-sm font-normal outline-none focus:border-deep focus:ring-2 focus:ring-deep/15"/></label>
      <label className="text-xs font-semibold text-ink">WhatsApp<input required name="phone" type="tel" autoComplete="tel" maxLength={24} className="mt-2 block min-h-12 w-full rounded-xl border border-slate-200 bg-paper px-4 text-sm font-normal outline-none focus:border-deep focus:ring-2 focus:ring-deep/15"/></label>
      <label className="text-xs font-semibold text-ink sm:col-span-2">E-mail<input required name="email" type="email" autoComplete="email" maxLength={160} className="mt-2 block min-h-12 w-full rounded-xl border border-slate-200 bg-paper px-4 text-sm font-normal outline-none focus:border-deep focus:ring-2 focus:ring-deep/15"/></label>
      <label className="text-xs font-semibold text-ink sm:col-span-2">Mensagem<textarea required name="message" rows={3} maxLength={500} className="mt-2 block w-full resize-y rounded-xl border border-slate-200 bg-paper px-4 py-3 text-sm font-normal outline-none focus:border-deep focus:ring-2 focus:ring-deep/15"/></label>
    </div><p className="mt-2 text-xs leading-5 text-slate-500">Por segurança, não descreva sintomas ou informações de saúde aqui.</p>
      <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-slate-600"><input required type="checkbox" name="privacy-consent" className="mt-1 size-4 accent-[#1F4E5A]"/><span>Li e concordo com a <Link href="/politica-de-privacidade" className="font-semibold text-deep underline">Política de Privacidade</Link> e autorizo o uso dos meus dados para retorno de contato.</span></label>
      <button type="submit" disabled={status==="sending"} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-deep px-6 text-sm font-semibold text-white hover:bg-[#173c45] disabled:opacity-60">{status==="sending" ? "Enviando…" : <>Enviar mensagem <ArrowUpRight size={16}/></>}</button>
      <p aria-live="polite" className={"mt-4 min-h-5 text-center text-xs " + (status==="error"||status==="unconfigured" ? "text-terracotta" : "text-deep")}>{status==="success" ? "Mensagem enviada. Obrigado pelo contato." : status==="error" ? "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp." : status==="unconfigured" ? "Formulário em configuração. Por favor, entre em contato pelo WhatsApp." : ""}</p>
    </form></Reveal>
    <Reveal className="space-y-5"><div className="rounded-card bg-sage p-7 sm:p-8"><h3 className="serif text-2xl">Informações de contato</h3><div className="mt-6 space-y-5">
      <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="flex items-center gap-4"><span className="flex size-11 items-center justify-center rounded-full bg-white text-deep"><MessageCircle size={19}/></span><span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">WhatsApp</span><span className="mt-1 block text-sm font-semibold text-ink">{site.whatsappDisplay}</span></span></a>
      <a href={"tel:" + site.phone.replace(/[^\d+]/g,"")} className="flex items-center gap-4"><span className="flex size-11 items-center justify-center rounded-full bg-white text-deep"><Phone size={18}/></span><span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Telefone</span><span className="mt-1 block text-sm font-semibold text-ink">{site.phone}</span></span></a>
      <a href={"mailto:" + site.email} className="flex items-center gap-4"><span className="flex size-11 items-center justify-center rounded-full bg-white text-deep"><Mail size={18}/></span><span><span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">E-mail</span><span className="mt-1 block break-all text-sm font-semibold text-ink">{site.email}</span></span></a>
    </div></div>
    {site.modalities.presencial && <div className="overflow-hidden rounded-card border border-slate-200 bg-white">{site.address.mapsEmbedUrl ? <iframe title={"Mapa de localização — " + site.shortName} src={site.address.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-52 w-full border-0"/> : <div className="relative flex h-40 items-center justify-center overflow-hidden bg-[#e7eeea]"><div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(31,78,90,.09)_1px,transparent_1px),linear-gradient(90deg,rgba(31,78,90,.09)_1px,transparent_1px)] [background-size:30px_30px]"/><MapPin size={34} className="relative text-terracotta"/></div>}<div className="flex items-start justify-between gap-4 p-5"><div><p className="text-sm font-semibold text-ink">{site.address.street}</p><p className="mt-1 text-xs leading-5 text-slate-500">{site.address.district} · {site.address.city}</p></div><a href={site.address.mapsLink || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(site.address.street + ", " + site.address.city)} target="_blank" rel="noreferrer noopener" aria-label="Abrir localização no mapa" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sage text-deep"><ArrowUpRight size={18}/></a></div></div>}
    </Reveal></div>
  </div></section>;
}

function FinalCTA() {
  return <section className="px-5 pb-20 sm:pb-24"><div className="relative mx-auto max-w-[76rem] overflow-hidden rounded-[2rem] bg-deep px-7 py-12 text-center sm:px-12 sm:py-16"><div className="pointer-events-none absolute -right-16 -top-36 size-80 rounded-full border border-white/10"/><div className="pointer-events-none absolute -right-6 -top-20 size-60 rounded-full border border-white/10"/><Reveal className="relative"><p className="text-xs font-semibold uppercase tracking-[.18em] text-white/65">Um passo de cada vez</p><h2 className="serif mx-auto mt-4 max-w-3xl text-3xl leading-tight text-white sm:text-5xl">O cuidado com a sua saúde mental pode começar hoje.</h2><WA className="mt-8 inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-deep hover:bg-sage">Agendar pelo WhatsApp <ArrowUpRight size={17}/></WA></Reveal></div></section>;
}

function Footer() {
  return <footer className="bg-[#183d46] pb-24 pt-12 text-white sm:pb-8"><div className="section-wrap"><div className="grid gap-10 border-b border-white/15 pb-10 md:grid-cols-[1.2fr_.8fr_1fr]">
    <div><a href="#inicio" className="serif text-2xl">{site.shortName}</a><p className="mt-2 text-xs leading-6 text-white/65">{getCredentialLine()}<br/>{site.city}</p>{site.previewMode&&<p className="mt-3 max-w-xs text-[10px] leading-5 text-white/65">{site.previewNotice}</p>}<div className="mt-5 flex gap-3"><a aria-label="Instagram" href={site.instagram} target="_blank" rel="noreferrer noopener" className="flex size-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"><Instagram size={17}/></a><a aria-label="WhatsApp" href={getWhatsAppUrl()} target="_blank" rel="noreferrer noopener" className="flex size-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"><MessageCircle size={17}/></a></div></div>
    <div><h2 className="text-xs font-bold uppercase tracking-[.15em] text-white/55">Navegue</h2><nav aria-label="Navegação do rodapé" className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3">{site.content.nav.map((item)=><a key={item.href} href={item.href} className="text-xs text-white/80 hover:text-white">{item.label}</a>)}</nav><Link href="/politica-de-privacidade" className="mt-4 inline-block text-xs text-white/80 underline hover:text-white">Política de Privacidade</Link></div>
    <p className="flex items-start gap-3 text-xs leading-6 text-white/75"><CircleHelp size={17} className="mt-1 shrink-0 text-[#e6b29b]"/>{site.content.emergency}</p>
  </div><p className="pt-5 text-center text-[10px] text-white/50">© {new Date().getFullYear()} {site.name}. Todos os direitos reservados.</p></div></footer>;
}

function FloatingWhatsApp() {
  const reduced = useReducedMotion();
  return <motion.a href={getWhatsAppUrl()} target="_blank" rel="noreferrer noopener" aria-label="Agendar consulta pelo WhatsApp" initial={reduced ? false : { opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .9, duration: .35 }} className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#248b66] text-white shadow-lg transition hover:scale-105 sm:bottom-7 sm:right-7"><MessageCircle size={23}/></motion.a>;
}

export function LandingPage() {
  return <><Header/><main><Hero/><About/><Services/><Process/><Modalities/><Reviews/><FAQ/><Contact/><FinalCTA/></main><Footer/><FloatingWhatsApp/></>;
}
