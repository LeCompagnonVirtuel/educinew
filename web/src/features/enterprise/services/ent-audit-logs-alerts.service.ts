// Enterprise Platform Service - AuditLogsAlerts
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAuditLogAlertService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAuditLogsAlert(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAuditLogsAlertById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAuditLogsAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAuditLogsAlerts(schoolId, filters);
  }
  async createAuditLogsAlert(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAuditLogsAlert(schoolId, data);
  }
  async updateAuditLogsAlert(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAuditLogsAlertById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAuditLogsAlert(schoolId, id, data);
  }
  async deleteAuditLogsAlert(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAuditLogsAlertById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAuditLogsAlert(schoolId, id);
  }
  async countAuditLogsAlerts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAuditLogsAlerts(schoolId, filters);
  }
}
