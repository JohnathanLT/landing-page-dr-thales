import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { site, getTitle, getCredentialLine, getSiteUrl } from "@/config/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

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
