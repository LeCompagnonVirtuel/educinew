// Enterprise Platform Service - ReportsScheduled
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntScheduledReportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReportsScheduled(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findReportsScheduledById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listReportsScheduled(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllReportsScheduled(schoolId, filters);
  }
  async createReportsScheduled(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createReportsScheduled(schoolId, data);
  }
  async updateReportsScheduled(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findReportsScheduledById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateReportsScheduled(schoolId, id, data);
  }
  async deleteReportsScheduled(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReportsScheduledById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteReportsScheduled(schoolId, id);
  }
  async countReportsScheduled(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReportsScheduled(schoolId, filters);
  }
}
