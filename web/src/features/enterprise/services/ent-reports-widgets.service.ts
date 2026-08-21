// Enterprise Platform Service - ReportsWidgets
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReportWidgetService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReportsWidget(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findReportsWidgetById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listReportsWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllReportsWidgets(schoolId, filters);
  }
  async createReportsWidget(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReportsWidget(schoolId, data);
  }
  async updateReportsWidget(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findReportsWidgetById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReportsWidget(schoolId, id, data);
  }
  async deleteReportsWidget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReportsWidgetById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReportsWidget(schoolId, id);
  }
  async countReportsWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReportsWidgets(schoolId, filters);
  }
}
