import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/config/site";

export const metadata = { title: `Política de Privacidade | ${site.shortName}` };

export default function PrivacyPage() {
  return <main className="min-h-screen bg-paper py-16 sm:py-24"><article className="section-wrap max-w-3xl">
    <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-deep hover:underline"><ArrowLeft size={17} aria-hidden="true" /> Voltar ao site</Link>
    <p className="section-kicker">Privacidade e dados</p><h1 className="section-title mt-3">{site.content.privacy.title}</h1>
    <p className="mt-6 text-lg leading-8 text-slate-600">{site.content.privacy.intro}</p>
    <p className="mt-4 text-sm leading-6 text-slate-500">Controlador dos dados: {site.name}. Contato: <a className="text-deep underline" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    <div className="mt-10 space-y-8">{site.content.privacy.sections.map((item) => <section key={item.title}><h2 className="serif text-2xl">{item.title}</h2><p className="mt-3 leading-7 text-slate-600">{item.text}</p></section>)}</div>
    <p className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500">Contato sobre privacidade: <a className="text-deep underline" href={`mailto:${site.email}`}>{site.email}</a></p>
  </article></main>;
}
