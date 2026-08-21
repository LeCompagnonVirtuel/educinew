// Enterprise Platform Service - MetricsAlerts
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMetricsAlertService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMetricsAlert(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMetricsAlertById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMetricsAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMetricsAlerts(schoolId, filters);
  }
  async createMetricsAlert(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMetricsAlert(schoolId, data);
  }
  async updateMetricsAlert(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMetricsAlertById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMetricsAlert(schoolId, id, data);
  }
  async deleteMetricsAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMetricsAlertById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMetricsAlert(schoolId, id);
  }
  async countMetricsAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMetricsAlerts(schoolId, filters);
  }
}
