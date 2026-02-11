// SEO Utilities for Next.js
import { Metadata } from 'next';

const BASE_URL = 'https://priyasarvutthan.org';

export function generateCanonicalUrl(path: string): string {
  if (!path || path === '/') return `${BASE_URL}/`;
  return `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;
}

export function generateBreadcrumbSchema(path: string): object {
  const segments = path.split('/').filter(Boolean);
  const itemListElement = segments.map((segment, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: segment.charAt(0).toUpperCase() + segment.slice(1),
    item: generateCanonicalUrl('/' + segments.slice(0, idx + 1).join('/')),
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      ...itemListElement,
    ],
  };
}

export function getMetadata(path: string, options?: {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile' | 'video.other' | 'video.movie' | 'video.episode' | 'video.tv_show';
}): Metadata {
  const canonicalUrl = generateCanonicalUrl(path);
  
  return {
    title: options?.title || "Priya Sarv Utthan Seva Sansthan",
    description: options?.description || "Working towards social welfare and community development since 1999",
    keywords: options?.keywords || ["NGO", "social welfare", "community development", "Priya Sarv Utthan"],
    openGraph: {
      title: options?.title || "Priya Sarv Utthan Seva Sansthan",
      description: options?.description || "Working towards social welfare and community development since 1999",
      url: canonicalUrl,
      siteName: "Priya Sarv Utthan Seva Sansthan",
      images: options?.ogImage ? [
        {
          url: options.ogImage,
          width: 1200,
          height: 630,
          alt: options?.title || "Priya Sarv Utthan Seva Sansthan",
        }
      ] : [],
      type: options?.ogType || "website",
      locale: "en_IN"
    },
    twitter: {
      card: "summary_large_image",
      title: options?.title || "Priya Sarv Utthan Seva Sansthan",
      description: options?.description || "Working towards social welfare and community development since 1999",
      images: options?.ogImage ? [options.ogImage] : [],
    },
    alternates: { 
      canonical: canonicalUrl 
    },
    authors: [{ name: "Priya Sarv Utthan Seva Sansthan" }],
    creator: "Priya Sarv Utthan Seva Sansthan",
    publisher: "Priya Sarv Utthan Seva Sansthan"
  };
}
