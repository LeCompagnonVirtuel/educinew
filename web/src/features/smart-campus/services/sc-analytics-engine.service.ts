import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface AnalyticsEvent {
  id: string;
  eventType: string;
  data: Record<string, unknown>;
  timestamp: string;
}

interface AnalyticsResult {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

export class ScAnalyticsEngineService {
  private repo: SmartCampusRepositoryEnterprise;
  private events: AnalyticsEvent[] = [];

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async trackEvent(schoolId: string, eventType: string, data: Record<string, unknown>): Promise<void> {
    this.events.push({
      id: crypto.randomUUID(),
      eventType,
      data: { ...data, schoolId },
      timestamp: new Date().toISOString(),
    });
  }

  async getTransportAnalytics(schoolId: string): Promise<AnalyticsResult[]> {
    const buses = await this.repo.findAllBuses(schoolId);
    return [
      { metric: 'Total Buses', value: buses.length, trend: 'stable', changePercent: 0 },
    ];
  }

  async getLibraryAnalytics(schoolId: string): Promise<AnalyticsResult[]> {
    const books = await this.repo.findAllBooks(schoolId);
    return [
      { metric: 'Total Books', value: books.length, trend: 'stable', changePercent: 0 },
    ];
  }

  async getSecurityAnalytics(schoolId: string): Promise<AnalyticsResult[]> {
    const incidents = await this.repo.findAllSecurityIncidents(schoolId);
    const guards = await this.repo.findAllGuards(schoolId);
    return [
      { metric: 'Total Incidents', value: incidents.length, trend: 'stable', changePercent: 0 },
      { metric: 'Active Guards', value: guards.length, trend: 'stable', changePercent: 0 },
    ];
  }

  async getEventCount(eventType: string): Promise<number> {
    return this.events.filter(e => e.eventType === eventType).length;
  }

  async getEventsByType(eventType: string, limit: number): Promise<AnalyticsEvent[]> {
    return this.events.filter(e => e.eventType === eventType).slice(-limit);
  }

  async getRecentEvents(limit: number): Promise<AnalyticsEvent[]> {
    return this.events.slice(-limit);
  }

  clearEvents(): void {
    this.events = [];
  }
}
