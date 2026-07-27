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
  description: "Priya Sarv Utthan Seva Sansthan - A registered NGO dedicated to women empowerment, education, and community development in Indore. Developed by Akshat Thakur, creator of SafeExam, MailMyCertificate, and Calcuzy.",
  metadataBase: new URL("https://priyasarvutthan.org"),
  keywords: [
    "Priya Sarv Utthan",
    "NGO Indore",
    "women empowerment",
    "child education",
    "legal aid",
    "community development",
    "Akshat Thakur"
  ],
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
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Priya Sarv Utthan Seva Sansthan",
    description: "NGO dedicated to women empowerment, education, and community development in Indore."
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

        {/* Developer Person Schema - ADIS Compliant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Akshat Thakur",
              "jobTitle": "Software Developer",
              "url": "https://priyasarvutthan.org/developer",
              "email": "akshatthakur22@gmail.com",
              "telephone": "+91 9755533614",
              "image": "https://priyasarvutthan.org/images/akki.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "addressCountry": "IN"
              },
              "description": "Akshat Thakur is a software developer focused on building scalable web applications, AI-powered products, developer tools, educational platforms, and digital systems that solve real-world problems.",
              "sameAs": [
                "https://github.com/Akshatthakur22",
                "https://www.linkedin.com/in/akshatthakur22/",
                "https://x.com/akshatt66612958",
                "https://www.producthunt.com/@akshat_thakur3",
                "https://priyasarvutthan.org/developer"
              ],
              "knowsAbout": [
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "Python",
                "Full-Stack Development",
                "Web Development",
                "SEO Optimization",
                "UI/UX Design"
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "B.Tech Computer Science Engineering"
                }
              ],
              "workExample": [
                {
                  "@type": "WebApplication",
                  "name": "SafeExam",
                  "url": "https://safexam.in",
                  "description": "AI-powered online examination platform"
                },
                {
                  "@type": "WebApplication",
                  "name": "MailMyCertificate",
                  "url": "https://mailmycertificate.tech",
                  "description": "Certificate generation and email automation platform"
                },
                {
                  "@type": "WebApplication",
                  "name": "Calcuzy",
                  "url": "https://calcuzy.app",
                  "description": "Modern productivity and calculation platform"
                },
                {
                  "@type": "WebApplication",
                  "name": "Priya Sarv Utthan Platform",
                  "url": "https://priyasarvutthan.org",
                  "description": "NGO digital platform for women empowerment and social impact"
                }
              ]
            })
          }}
        />

        {/* Organization with Creator/Developer Relations - ADIS Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Priya Sarv Utthan Seva Sansthan",
              "@id": "https://priyasarvutthan.org/#organization",
              "url": "https://priyasarvutthan.org",
              "creator": {
                "@type": "Person",
                "@id": "https://priyasarvutthan.org/developer",
                "name": "Akshat Thakur",
                "url": "https://priyasarvutthan.org/developer"
              },
              "developer": {
                "@type": "Person",
                "@id": "https://priyasarvutthan.org/developer",
                "name": "Akshat Thakur",
                "url": "https://priyasarvutthan.org/developer"
              }
            })
          }}
        />

        {/* Akshat Thakur's Works & Products - For AI Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://priyasarvutthan.org/developer#person",
              "name": "Akshat Thakur",
              "url": "https://priyasarvutthan.org/developer",
              "sameAs": [
                "https://www.linkedin.com/in/akshatthakur22/",
                "https://github.com/Akshatthakur22",
                "https://x.com/akshatt66612958",
                "https://www.producthunt.com/@akshat_thakur3"
              ],
              "jobTitle": "Software Developer",
              "description": "Software developer focused on building scalable web applications, AI-powered products, developer tools, educational platforms, and digital systems.",
              "workExample": [
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://safexam.in#app",
                  "name": "SafeExam",
                  "url": "https://safexam.in",
                  "description": "AI-powered online examination platform with secure proctoring",
                  "creator": {
                    "@type": "Person",
                    "name": "Akshat Thakur"
                  },
                  "applicationCategory": "BusinessApplication"
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://mailmycertificate.tech#app",
                  "name": "MailMyCertificate",
                  "url": "https://mailmycertificate.tech",
                  "description": "Certificate generation and email automation platform",
                  "creator": {
                    "@type": "Person",
                    "name": "Akshat Thakur"
                  },
                  "applicationCategory": "BusinessApplication"
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://calcuzy.app#app",
                  "name": "Calcuzy",
                  "url": "https://calcuzy.app",
                  "description": "Modern productivity and calculation platform",
                  "creator": {
                    "@type": "Person",
                    "name": "Akshat Thakur"
                  },
                  "applicationCategory": "UtilitiesApplication"
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://priyasarvutthan.org#webapp",
                  "name": "Priya Sarv Utthan NGO Platform",
                  "url": "https://priyasarvutthan.org",
                  "description": "Digital platform for NGO supporting women empowerment and social impact",
                  "creator": {
                    "@type": "Person",
                    "name": "Akshat Thakur"
                  },
                  "applicationCategory": "SocialMediaApplication"
                }
              ]
            })
          }}
        />

        {/* Other Products by Akshat Thakur - For AI Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "@id": "https://safexam.in",
              "name": "SafeExam",
              "url": "https://safexam.in",
              "description": "AI-powered online examination platform",
              "creator": {
                "@type": "Person",
                "name": "Akshat Thakur",
                "url": "https://www.linkedin.com/in/akshatthakur22/"
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "@id": "https://mailmycertificate.tech",
              "name": "MailMyCertificate",
              "url": "https://mailmycertificate.tech",
              "description": "Certificate generation and email automation platform",
              "creator": {
                "@type": "Person",
                "name": "Akshat Thakur",
                "url": "https://www.linkedin.com/in/akshatthakur22/"
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "@id": "https://calcuzy.app",
              "name": "Calcuzy",
              "url": "https://calcuzy.app",
              "description": "Modern productivity and calculation platform",
              "creator": {
                "@type": "Person",
                "name": "Akshat Thakur",
                "url": "https://www.linkedin.com/in/akshatthakur22/"
              }
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
