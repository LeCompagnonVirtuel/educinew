// Enterprise Platform Service - Alerts
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAlertService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAlert(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAlertById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAlerts(schoolId, filters);
  }
  async createAlert(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAlert(schoolId, data);
  }
  async updateAlert(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAlertById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAlert(schoolId, id, data);
  }
  async deleteAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAlertById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAlert(schoolId, id);
  }
  async countAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAlerts(schoolId, filters);
  }
}
