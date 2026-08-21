import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiAnalytics, AiAnalyticsQuery, AiAnalyticsCreate, AiAnalyticsUpdate } from '@educi/types';
import { AiAnalyticsNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiAnalyticsService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAnalytics(schoolId: string, id: string): Promise<AiAnalytics> {
    const analytics = await this.repo.findById(schoolId, id);
    if (!analytics) throw new AiAnalyticsNotFoundError(id);
    return analytics;
  }

  async listAnalytics(schoolId: string, query: AiAnalyticsQuery): Promise<AiAnalytics[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAnalytics(schoolId: string, data: AiAnalyticsCreate): Promise<AiAnalytics> {
    return this.repo.create(schoolId, data);
  }

  async updateAnalytics(schoolId: string, id: string, data: AiAnalyticsUpdate): Promise<AiAnalytics> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAnalyticsNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAnalytics(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAnalyticsNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getAnalyticsReport(schoolId: string, id: string): Promise<AiAnalyticsReport> {
    const analytics = await this.repo.findById(schoolId, id);
    if (!analytics) throw new AiAnalyticsNotFoundError(id);
    return this.repo.findReportById(schoolId, id);
  }

  async getAnalyticsMetrics(schoolId: string): Promise<AiAnalyticsMetrics> {
    return this.repo.findAnalyticsMetrics(schoolId);
  }

  async getAnalyticsTrends(schoolId: string, startDate: string, endDate: string): Promise<AiAnalyticsTrend[]> {
    return this.repo.findAnalyticsTrends(schoolId, startDate, endDate);
  }
}
