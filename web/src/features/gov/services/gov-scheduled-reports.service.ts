// Government & National Governance Service - ScheduledReports
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScheduledReports, ScheduledReportsCreate } from '@educi/types';
import { GovScheduledReportsNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovScheduledReportsService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getScheduledReports(schoolId: string, id: string): Promise<ScheduledReports> {
    const item = await this.repo.findScheduledReportsById(schoolId, id);
    if (!item) throw new GovScheduledReportsNotFoundError(id);
    return item;
  }

  async listScheduledReportss(schoolId: string, filters?: Record<string, unknown>): Promise<ScheduledReports[]> {
    return this.repo.findAllScheduledReportss(schoolId, filters);
  }

  async createScheduledReports(schoolId: string, data: ScheduledReportsCreate): Promise<ScheduledReports> {
    return this.repo.createScheduledReports(schoolId, data);
  }

  async updateScheduledReports(schoolId: string, id: string, data: Partial<ScheduledReportsCreate>): Promise<ScheduledReports> {
    const existing = await this.repo.findScheduledReportsById(schoolId, id);
    if (!existing) throw new GovScheduledReportsNotFoundError(id);
    return this.repo.updateScheduledReports(schoolId, id, data);
  }

  async deleteScheduledReports(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findScheduledReportsById(schoolId, id);
    if (!existing) throw new GovScheduledReportsNotFoundError(id);
    return this.repo.deleteScheduledReports(schoolId, id);
  }

  async countScheduledReportss(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countScheduledReportss(schoolId, filters);
  }
}
