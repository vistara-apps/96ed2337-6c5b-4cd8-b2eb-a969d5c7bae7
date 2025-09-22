// Analytics utilities for tracking user interactions

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: string;
  userId?: string;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private userId?: string;

  setUserId(userId: string) {
    this.userId = userId;
  }

  track(event: string, properties?: Record<string, any>) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: new Date().toISOString(),
      userId: this.userId,
    };

    this.events.push(analyticsEvent);

    // In production, send to analytics service
    console.log('Analytics event:', analyticsEvent);

    // Limit stored events to prevent memory issues
    if (this.events.length > 1000) {
      this.events = this.events.slice(-500);
    }
  }

  // Specific tracking methods
  trackPageView(page: string) {
    this.track('page_view', { page });
  }

  trackUserAction(action: string, details?: Record<string, any>) {
    this.track('user_action', { action, ...details });
  }

  trackCollaborationRequest(sent: boolean, recipientId?: string) {
    this.track('collaboration_request', {
      action: sent ? 'sent' : 'received',
      recipientId,
    });
  }

  trackProjectCreated(projectId: string, skills: string[]) {
    this.track('project_created', {
      projectId,
      skillCount: skills.length,
      skills,
    });
  }

  trackSearch(query: string, filters: Record<string, any>) {
    this.track('search_performed', {
      query,
      filters,
    });
  }

  trackPayment(amount: number, type: string, success: boolean) {
    this.track('payment_attempted', {
      amount,
      type,
      success,
    });
  }

  // Get analytics data (for debugging/admin purposes)
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  clearEvents() {
    this.events = [];
  }
}

// Export singleton instance
export const analytics = new Analytics();

