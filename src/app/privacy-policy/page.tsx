import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Privacy Policy | Priya Sarv Utthan Seva Sansthan",
  description: "Read our privacy policy to understand how Priya Sarv Utthan Seva Sansthan protects your data and privacy.",
  keywords: ["privacy", "policy", "NGO", "data protection", "Priya Sarv Utthan Seva Sansthan"],
  openGraph: {
    title: "Privacy Policy | Priya Sarv Utthan Seva Sansthan",
    description: "How we protect your privacy and data.",
    url: "https://priyasarvutthan.org/privacy-policy",
    type: "article"
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Priya Sarv Utthan Seva Sansthan",
    description: "How we protect your privacy and data."
  },
  alternates: { canonical: "https://priyasarvutthan.org/privacy-policy" }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Priya Sarv Utthan Seva Sansthan",
  "url": "https://priyasarvutthan.org",
  "description": "A registered NGO dedicated to women empowerment, education, and community development in Indore."
};

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy | Your NGO Name",
  "url": "https://your-ngosite.org/privacy-policy",
  "description": "Read the privacy policy of Your NGO Name. Learn how we protect your data and privacy.",
};
export default function PrivacyPolicyPage() {
  return (
    <>
      <Script
        id="privacy-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
      <div className="bg-white py-12 px-4 max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Your Privacy Matters</h2>
          <p>
            Priya Sarv Utthan Seva Sansthan is committed to protecting your privacy. We collect only necessary information and never share your data with third parties except as required by law.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
          <ul className="list-disc ml-6">
            <li>Personal details (name, email) for donations and volunteering</li>
            <li>Usage data for website improvement</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
          <p>
            We use your information to process donations, respond to inquiries, and improve our services. Your data is stored securely and only accessible to authorized personnel.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p>
            For any privacy-related questions, email us at <a href="mailto:priyasarvuthan@gmail.com" className="text-blue-600 underline">priyasarvuthan@gmail.com</a>.
          </p>
        </section>
      </div>
    </>
  );
}
