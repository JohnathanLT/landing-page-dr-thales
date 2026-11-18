import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site, getTitle, getCredentialLine, getSiteUrl } from "@/config/site";

const inter = localFont({ src: "../../public/fonts/inter-latin.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });
const fraunces = localFont({ src: "../../public/fonts/fraunces-latin.woff2", variable: "--font-fraunces", weight: "100 900", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${site.name} | ${getTitle()} em Goiânia`,
  description: site.seo.description + " " + getCredentialLine() + ".",
  openGraph: { title: `${site.name} | ${getTitle()} em Goiânia`, description: site.seo.description + " " + getCredentialLine() + ".", locale: "pt_BR", type: "website", url: site.seo.url },
  robots: { index: !site.previewMode, follow: !site.previewMode },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>{children}</body></html>;
}
