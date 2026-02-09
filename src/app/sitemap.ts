import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://priyasarvutthan.org';
  const now = new Date().toISOString();
  
  return [
    // Core pages with highest priority
    {
      url: `${baseUrl}/`,
      lastModified: now,
      priority: 1.0,
      changeFrequency: 'daily'
    },
    
    // Important service pages
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'monthly'
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: now,
      priority: 0.9,
      changeFrequency: 'weekly'
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly'
    },
    {
      url: `${baseUrl}/events`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'weekly'
    },
    
    // Team and leadership pages
    {
      url: `${baseUrl}/developer`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly'
    },
    {
      url: `${baseUrl}/founder`,
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly'
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      priority: 0.7,
      changeFrequency: 'weekly'
    },
    
    // Support and help pages
    {
      url: `${baseUrl}/help`,
      lastModified: now,
      priority: 0.6,
      changeFrequency: 'monthly'
    },
    {
      url: `${baseUrl}/help/legal`,
      lastModified: now,
      priority: 0.5,
      changeFrequency: 'monthly'
    },
    {
      url: `${baseUrl}/help/complaint`,
      lastModified: now,
      priority: 0.5,
      changeFrequency: 'monthly'
    },
    {
      url: `${baseUrl}/help/welfare`,
      lastModified: now,
      priority: 0.5,
      changeFrequency: 'monthly'
    },
    
    // Secondary pages
    {
      url: `${baseUrl}/team`,
      lastModified: now,
      priority: 0.5,
      changeFrequency: 'monthly'
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: now,
      priority: 0.4,
      changeFrequency: 'monthly'
    },
    
    // Legal pages (lowest priority)
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      priority: 0.3,
      changeFrequency: 'yearly'
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      priority: 0.3,
      changeFrequency: 'yearly'
    }
  ];
}
