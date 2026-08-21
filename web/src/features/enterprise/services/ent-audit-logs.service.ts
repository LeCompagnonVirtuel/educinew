// Enterprise Platform Service - AuditLogs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAuditLogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAuditLog(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findAuditLogById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listAuditLogs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllAuditLogs(schoolId, filters);
  }
  async createAuditLog(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createAuditLog(schoolId, data);
  }
  async updateAuditLog(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findAuditLogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateAuditLog(schoolId, id, data);
  }
  async deleteAuditLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAuditLogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteAuditLog(schoolId, id);
  }
  async countAuditLogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAuditLogs(schoolId, filters);
  }
}
