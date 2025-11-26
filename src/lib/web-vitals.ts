// Core Web Vitals monitoring and reporting
// Measures and reports on LCP, FID, CLS, and other performance metrics

import { trackEvent } from "./analytics";

// Types for Web Vitals
export interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: "good" | "needs-improvement" | "poor";
  navigationType: string;
}

// LCP - Largest Contentful Paint
export const onLCP = (callback: (metric: WebVitalMetric) => void) => {
  import('web-vitals').then(({ onLCP }) => {
    onLCP((metric) => {
      // Report to Google Analytics
      if (typeof window !== 'undefined') {
        trackEvent('web_vitals', {
          metric_name: 'LCP',
          metric_value: metric.value,
          metric_rating: metric.rating,
        });
      }
      callback(metric);
    });
  });
};

// FID - First Input Delay
export const onFID = (callback: (metric: WebVitalMetric) => void) => {
  import('web-vitals').then(({ onFID }) => {
    onFID((metric) => {
      if (typeof window !== 'undefined') {
        trackEvent('web_vitals', {
          metric_name: 'FID',
          metric_value: metric.value,
          metric_rating: metric.rating,
        });
      }
      callback(metric);
    });
  });
};

// CLS - Cumulative Layout Shift
export const onCLS = (callback: (metric: WebVitalMetric) => void) => {
  import('web-vitals').then(({ onCLS }) => {
    onCLS((metric) => {
      if (typeof window !== 'undefined') {
        trackEvent('web_vitals', {
          metric_name: 'CLS',
          metric_value: metric.value,
          metric_rating: metric.rating,
        });
      }
      callback(metric);
    });
  });
};

// FCP - First Contentful Paint
export const onFCP = (callback: (metric: WebVitalMetric) => void) => {
  import('web-vitals').then(({ onFCP }) => {
    onFCP((metric) => {
      if (typeof window !== 'undefined') {
        trackEvent('web_vitals', {
          metric_name: 'FCP',
          metric_value: metric.value,
          metric_rating: metric.rating,
        });
      }
      callback(metric);
    });
  });
};

// TTFB - Time to First Byte
export const onTTFB = (callback: (metric: WebVitalMetric) => void) => {
  import('web-vitals').then(({ onTTFB }) => {
    onTTFB((metric) => {
      if (typeof window !== 'undefined') {
        trackEvent('web_vitals', {
          metric_name: 'TTFB',
          metric_value: metric.value,
          metric_rating: metric.rating,
        });
      }
      callback(metric);
    });
  });
};

// Initialize all Web Vitals monitoring
export const initWebVitals = () => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return;
  }

  // Check if web-vitals is available
  import('web-vitals').then(({ onLCP, onFID, onCLS, onFCP, onTTFB }) => {
    // Monitor all metrics
    onLCP((metric) => {
      console.log('LCP:', metric);
    });

    onFID((metric) => {
      console.log('FID:', metric);
    });

    onCLS((metric) => {
      console.log('CLS:', metric);
    });

    onFCP((metric) => {
      console.log('FCP:', metric);
    });

    onTTFB((metric) => {
      console.log('TTFB:', metric);
    });
  }).catch((error) => {
    console.warn('Web Vitals monitoring not available:', error);
  });
};

// Get performance rating description
export const getPerformanceRating = (metric: string, value: number): string => {
  const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[metric as keyof typeof thresholds];
  if (!threshold) return 'unknown';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};
