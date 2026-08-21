// Enterprise Platform Service - AuditLogger
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuditLogger, AuditLoggerCreate } from '@educi/types';
import { EntAuditLoggerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAuditLoggerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAuditLogger(schoolId: string, id: string): Promise<AuditLogger> {
    const item = await this.repo.findAuditLoggerById(schoolId, id);
    if (!item) throw new EntAuditLoggerNotFoundError(id);
    return item;
  }
  async listAuditLoggers(schoolId: string, filters?: Record<string, unknown>): Promise<AuditLogger[]> {
    return this.repo.findAllAuditLoggers(schoolId, filters);
  }
  async createAuditLogger(schoolId: string, data: AuditLoggerCreate): Promise<AuditLogger> {
    return this.repo.createAuditLogger(schoolId, data);
  }
  async updateAuditLogger(schoolId: string, id: string, data: Partial<AuditLoggerCreate>): Promise<AuditLogger> {
    const existing = await this.repo.findAuditLoggerById(schoolId, id);
    if (!existing) throw new EntAuditLoggerNotFoundError(id);
    return this.repo.updateAuditLogger(schoolId, id, data);
  }
  async deleteAuditLogger(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAuditLoggerById(schoolId, id);
    if (!existing) throw new EntAuditLoggerNotFoundError(id);
    return this.repo.deleteAuditLogger(schoolId, id);
  }
  async countAuditLoggers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAuditLoggers(schoolId, filters);
  }
}
