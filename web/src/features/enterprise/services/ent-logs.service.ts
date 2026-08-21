// Enterprise Platform Service - Logs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLog(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLogById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLogs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLogs(schoolId, filters);
  }
  async createLog(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLog(schoolId, data);
  }
  async updateLog(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLog(schoolId, id, data);
  }
  async deleteLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLog(schoolId, id);
  }
  async countLogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLogs(schoolId, filters);
  }
}
