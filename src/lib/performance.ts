/**
 * Performance Monitoring & Optimization Utilities
 * Track Core Web Vitals and assist with performance debugging
 */

/**
 * Report performance metrics (for Next.js analytics)
 * Called automatically by Next.js when metrics are available
 */
export function reportWebVitals(metric: {
  name: string;
  value: number;
  id: string;
  label: "web-vital" | "custom";
  delta?: number;
  rating?: "good" | "needs-improvement" | "poor";
}) {
  // Send to analytics service or log for debugging
  if (process.env.NODE_ENV === "production") {
    // In production, send to analytics service
    // Example: analytics.track('web_vital', metric);
    console.log("[PERF]", metric.name, `${metric.value.toFixed(2)}ms`);
  }
}

/**
 * Measure component render time for debugging
 * Usage: const end = startMeasure("ComponentName"); ... end();
 */
export function startMeasure(name: string) {
  const startTime = performance.now();
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.debug(`[MEASURE] ${name}: ${duration.toFixed(2)}ms`);
    return duration;
  };
}

/**
 * Preload critical resources to improve LCP (Largest Contentful Paint)
 */
export function preloadCriticalResources() {
  if (typeof window === "undefined") return;

  // Preload critical fonts
  const preloadLink = document.createElement("link");
  preloadLink.rel = "preload";
  preloadLink.as = "font";
  preloadLink.href = "/fonts/critical-font.woff2";
  preloadLink.crossOrigin = "anonymous";
  document.head.appendChild(preloadLink);
}

/**
 * Defer non-critical CSS to improve FCP (First Contentful Paint)
 */
export function deferNonCriticalCSS() {
  if (typeof window === "undefined") return;

  const cssLinks = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  ) as HTMLLinkElement[];

  cssLinks.forEach((link) => {
    if (!link.media || link.media === "all") {
      link.media = "print";
      link.onload = function (this: HTMLLinkElement) {
        this.media = "all";
      };
    }
  });
}

/**
 * Intersection Observer helper for lazy loading
 * Usage: observeElementsForLazyLoad('.lazy-image', (el) => loadImage(el))
 */
export function observeElementsForLazyLoad(
  selector: string,
  callback: (element: Element) => void
) {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "50px" }
  );

  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });

  return observer;
}

/**
 * Request Idle Callback polyfill wrapper
 * Runs callback when browser is idle
 */
export function requestIdleCallbackPolyfill(
  callback: () => void,
  options?: { timeout?: number }
) {
  if (typeof window === "undefined") return;

  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(callback, options);
  } else {
    setTimeout(callback, 1);
  }
}

/**
 * Core Web Vitals thresholds (from web.dev)
 * https://web.dev/articles/vitals
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: {
    good: 2500, // ms
    "needs-improvement": 4000,
  },
  FID: {
    good: 100, // ms
    "needs-improvement": 300,
  },
  CLS: {
    good: 0.1,
    "needs-improvement": 0.25,
  },
  FCP: {
    good: 1800, // ms
    "needs-improvement": 3000,
  },
  TTFB: {
    good: 600, // ms
    "needs-improvement": 1200,
  },
};

/**
 * Check if metric is within good range
 */
export function isMetricGood(
  metricName: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): boolean {
  const threshold = WEB_VITALS_THRESHOLDS[metricName];
  return value <= threshold.good;
}

/**
 * Get metric rating
 */
export function getMetricRating(
  metricName: keyof typeof WEB_VITALS_THRESHOLDS,
  value: number
): "good" | "needs-improvement" | "poor" {
  const threshold = WEB_VITALS_THRESHOLDS[metricName];
  if (value <= threshold.good) return "good";
  if (value <= threshold["needs-improvement"]) return "needs-improvement";
  return "poor";
}
