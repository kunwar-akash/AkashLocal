type EventProperties = Record<string, string | number | boolean | undefined>;

export function trackEvent(event: string, properties?: EventProperties): void {
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${event}`, properties ?? {});
  }
  // GA4:      window.gtag?.("event", event, properties);
  // Mixpanel: window.mixpanel?.track(event, properties);
  // PostHog:  window.posthog?.capture(event, properties);
}
