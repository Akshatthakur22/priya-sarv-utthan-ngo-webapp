// SEO Utilities for Next.js
import { MetadataRoute } from 'next';

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
