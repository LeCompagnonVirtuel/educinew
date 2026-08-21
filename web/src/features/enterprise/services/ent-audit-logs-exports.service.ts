// Enterprise Platform Service - AuditLogsExports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAuditLogExportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAuditLogsExport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAuditLogsExportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAuditLogsExports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAuditLogsExports(schoolId, filters);
  }
  async createAuditLogsExport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAuditLogsExport(schoolId, data);
  }
  async updateAuditLogsExport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAuditLogsExportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAuditLogsExport(schoolId, id, data);
  }
  async deleteAuditLogsExport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAuditLogsExportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAuditLogsExport(schoolId, id);
  }
  async countAuditLogsExports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAuditLogsExports(schoolId, filters);
  }
}
