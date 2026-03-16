import type { Metadata } from "next";
import Script from "next/script";
import { Nunito, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import FloatingHelpWidget from "@/components/help/FloatingHelpWidget";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const nunito = Nunito({ subsets: ["latin"], variable: "--font-display", display: 'swap' });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: 'swap' });

export const metadata: Metadata = {
  title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures",
  description: "Priya Sarv Utthan Seva Sansthan - A registered NGO dedicated to women empowerment, education, and community development in Indore.",
  metadataBase: new URL("https://priyasarvutthan.org"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico"
  },
  openGraph: {
    title: "Priya Sarv Utthan Seva Sansthan | Building brighter futures",
    description: "Join us in creating lasting impact through education, women empowerment, and social justice.",
    url: "https://priyasarvutthan.org",
    siteName: "Priya Sarv Utthan Seva Sansthan",
    locale: "en_US",
    type: "website"
  },
  authors: [{ name: "Akshat Thakur" }],
  creator: "Akshat Thakur",
  publisher: "Akshat Thakur"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable}`}> 
      <head>
        {/* Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FDC3201102"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FDC3201102');
            `,
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Priya Sarv Utthan Seva Sansthan",
              "alternateName": "PSUSS",
              "url": "https://priyasarvutthan.org",
              "logo": "https://priyasarvutthan.org/icon.png",
              "description": "A registered NGO dedicated to women empowerment, education, and community development in Indore since 1999.",
              "foundingDate": "1999",
              "foundingLocation": {
                "@type": "Place",
                "name": "Indore, India"
              },
              "contactPoint": [{
                "@type": "ContactPoint",
                "telephone": "+91-70000-78439",
                "contactType": "Customer Service",
                "email": "priyasarvuthan@gmail.com",
                "availableLanguage": ["Hindi", "English"]
              }],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "69B, Mangal Marg, Gandhi Nagar",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "452005",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "22.7196",
                "longitude": "75.8577"
              },
              "sameAs": [
                "https://facebook.com/priyasarvutthan",
                "https://instagram.com/priyasarvutthan",
                "https://twitter.com/priyasarvutthan"
              ],
              "areaServed": {
                "@type": "City",
                "name": "Indore",
                "containedInPlace": {
                  "@type": "State",
                  "name": "Madhya Pradesh"
                }
              },
              "knowsAbout": [
                "Women Empowerment",
                "Child Education",
                "Legal Aid",
                "Elderly Care",
                "Skill Training",
                "Community Development"
              ],
              "slogan": "Building Brighter Futures",
              "creator": {
                "@type": "Person",
                "name": "Akshat Thakur"
              }
            })
          }}
        />

        {/* LocalBusiness Schema for Indore SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://priyasarvutthan.org/#localbusiness",
              "name": "Priya Sarv Utthan Seva Sansthan",
              "alternateName": "PSUSS",
              "description": "Registered NGO in Indore offering women empowerment, education, legal aid, and community development services since 1999.",
              "url": "https://priyasarvutthan.org",
              "telephone": "+91-70000-78439",
              "email": "priyasarvuthan@gmail.com",
              "image": "https://priyasarvutthan.org/icon.png",
              "logo": "https://priyasarvutthan.org/icon.png",
              "priceRange": "Free",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "69B, Mangal Marg, Gandhi Nagar",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "452005",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "22.7196",
                "longitude": "75.8577"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "11:00",
                "closes": "17:00"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Indore",
                  "containedInPlace": {
                    "@type": "State",
                    "name": "Madhya Pradesh"
                  }
                },
                {
                  "@type": "State",
                  "name": "Madhya Pradesh"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Community Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Women Empowerment Programs"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Child Education Support"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Free Legal Aid Services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Elderly Care Services"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Developer Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Akshat Thakur",
              "jobTitle": "Software Developer & Platform Builder",
              "url": "https://priyasarvutthan.org/developer",
              "email": "akshatthakur22@gmail.com",
              "telephone": "+91 9755533614",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "addressCountry": "IN"
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Priya Sarv Utthan Seva Sansthan",
                "url": "https://priyasarvutthan.org",
                "sameAs": "https://priyasarvutthan.org"
              },
              "affiliation": {
                "@type": "Organization",
                "name": "Priya Sarv Utthan Seva Sansthan"
              },
              "description": "Developer of the Priya Sarv Utthan Seva Sansthan website and digital platform.",
              "knowsAbout": [
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "Web Development",
                "SEO Optimization",
                "UI/UX Design"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen font-body antialiased overflow-x-hidden">
        <ErrorBoundary>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <FloatingHelpWidget />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
