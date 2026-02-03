import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Priya Sarv Utthan Seva Sansthan",
  description: "Read the terms and conditions for using Priya Sarv Utthan Seva Sansthan's website and services.",
  keywords: ["terms", "conditions", "NGO", "Priya Sarv Utthan Seva Sansthan"],
  openGraph: {
    title: "Terms & Conditions | Priya Sarv Utthan Seva Sansthan",
    description: "Terms and conditions for using our website and services.",
    url: "https://priyasarvutthan.org/terms",
    type: "article"
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions | Priya Sarv Utthan Seva Sansthan",
    description: "Terms and conditions for using our website and services."
  },
  alternates: { canonical: "https://priyasarvutthan.org/terms" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Priya Sarv Utthan Seva Sansthan",
  "url": "https://priyasarvutthan.org",
  "description": "A registered NGO dedicated to women empowerment, education, and community development in Indore."
};

import Script from 'next/script';
const termsJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms & Conditions | Your NGO Name",
  "url": "https://your-ngosite.org/terms",
  "description": "Read the terms and conditions for using Your NGO Name's website and services.",
};
export default function TermsPage() {
  return (
    <>
      <Script
        id="terms-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsJsonLd) }}
      />
      <div className="bg-white py-12 px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Terms & Conditions</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Acceptance of Terms</h2>
          <p>
            By using our website, you agree to comply with these terms and conditions. Priya Sarv Utthan Seva Sansthan reserves the right to update these terms at any time.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Use of Content</h2>
          <p>
            All content is for informational purposes only. Unauthorized use or reproduction is prohibited.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Limitation of Liability</h2>
          <p>
            Priya Sarv Utthan Seva Sansthan is not liable for any damages arising from the use of this website.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            For questions about these terms, email <a href="mailto:priyasarvuthan@gmail.com" className="text-blue-600 underline">priyasarvuthan@gmail.com</a>.
          </p>
        </section>
      </div>
    </>
  );
}
