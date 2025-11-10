/**
 * Analytics Service
 *
 * This service tracks user behavior and emotional metrics.
 * In production, integrate with analytics providers like Mixpanel, Amplitude, or Firebase Analytics.
 */

export interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: Date;
}

export class AnalyticsService {
  private static events: AnalyticsEvent[] = [];

  /**
   * Track a general event
   */
  static trackEvent(name: string, properties?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      name,
      properties,
      timestamp: new Date(),
    };

    this.events.push(event);
    console.log('[Analytics]', event);

    // In production, send to analytics provider
    // Example: Mixpanel.track(name, properties);
  }

  /**
   * Track when user completes onboarding
   */
  static trackOnboardingComplete(focusAreas: string[]): void {
    this.trackEvent('onboarding_complete', {
      focus_areas: focusAreas,
    });
  }

  /**
   * Track when user likes a quote
   */
  static trackQuoteLiked(quoteId: string, category: string): void {
    this.trackEvent('quote_liked', {
      quote_id: quoteId,
      category,
    });
  }

  /**
   * Track when user saves a quote
   */
  static trackQuoteSaved(quoteId: string, category: string): void {
    this.trackEvent('quote_saved', {
      quote_id: quoteId,
      category,
    });
  }

  /**
   * Track when user downloads a wallpaper
   */
  static trackWallpaperDownloaded(wallpaperId: string): void {
    this.trackEvent('wallpaper_downloaded', {
      wallpaper_id: wallpaperId,
    });
  }

  /**
   * Track when user changes theme
   */
  static trackThemeChanged(theme: string): void {
    this.trackEvent('theme_changed', {
      theme,
    });
  }

  /**
   * Track when user updates reminder settings
   */
  static trackRemindersUpdated(count: number): void {
    this.trackEvent('reminders_updated', {
      count,
    });
  }

  /**
   * Track when user opens a notification
   */
  static trackNotificationOpened(notificationType: string): void {
    this.trackEvent('notification_opened', {
      type: notificationType,
    });
  }

  /**
   * Track user retention (7-day)
   */
  static trackRetention(daysSinceInstall: number): void {
    this.trackEvent('retention_check', {
      days_since_install: daysSinceInstall,
    });
  }

  /**
   * Track subscription events
   */
  static trackSubscriptionEvent(
    event: 'trial_started' | 'trial_converted' | 'subscription_cancelled',
    plan?: 'monthly' | 'yearly'
  ): void {
    this.trackEvent(event, {
      plan,
    });
  }

  /**
   * Get all tracked events (for debugging)
   */
  static getEvents(): AnalyticsEvent[] {
    return this.events;
  }

  /**
   * Clear events (for testing)
   */
  static clearEvents(): void {
    this.events = [];
  }

  /**
   * Calculate engagement score based on recent activity
   */
  static calculateEngagementScore(): number {
    const last7Days = this.events.filter(
      event => Date.now() - event.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000
    );

    const weights: Record<string, number> = {
      quote_liked: 2,
      quote_saved: 3,
      wallpaper_downloaded: 3,
      notification_opened: 1,
      theme_changed: 1,
    };

    const score = last7Days.reduce((total, event) => {
      return total + (weights[event.name] || 0);
    }, 0);

    return Math.min(100, score);
  }
}
