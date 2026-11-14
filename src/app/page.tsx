import type { Metadata } from "next";
import { site, getTitle, getCredentialLine, getSiteUrl } from "@/config/site";
import { LandingPage } from "@/components/sections/landing-page";

export const metadata: Metadata = { title: `${site.name} | ${getTitle()} em Goiânia`, description: site.seo.description + " " + getCredentialLine() + "." };

export default function Home() {
  const physician = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: site.name,
    description: getCredentialLine(),
    telephone: site.phone,
    email: site.email,
    address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, postalCode: site.address.zip, addressCountry: "BR" },
    ...(site.rqe.trim() ? { medicalSpecialty: "Psychiatric" } : {}),
    identifier: [site.crm, ...(site.rqe.trim() ? ["RQE " + site.rqe.replace(/^RQE\s*/i, "")] : [])],
    url: getSiteUrl(),
  };
  return <>{!site.previewMode && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(physician).replace(/</g, "\\u003c") }} />}<LandingPage /></>;
}
