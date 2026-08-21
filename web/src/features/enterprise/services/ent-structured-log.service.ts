// Enterprise Platform Service - StructuredLog
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { StructuredLog, StructuredLogCreate } from '@educi/types';
import { EntStructuredLogNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStructuredLogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStructuredLog(schoolId: string, id: string): Promise<StructuredLog> {
    const item = await this.repo.findStructuredLogById(schoolId, id);
    if (!item) throw new EntStructuredLogNotFoundError(id);
    return item;
  }
  async listStructuredLogs(schoolId: string, filters?: Record<string, unknown>): Promise<StructuredLog[]> {
    return this.repo.findAllStructuredLogs(schoolId, filters);
  }
  async createStructuredLog(schoolId: string, data: StructuredLogCreate): Promise<StructuredLog> {
    return this.repo.createStructuredLog(schoolId, data);
  }
  async updateStructuredLog(schoolId: string, id: string, data: Partial<StructuredLogCreate>): Promise<StructuredLog> {
    const existing = await this.repo.findStructuredLogById(schoolId, id);
    if (!existing) throw new EntStructuredLogNotFoundError(id);
    return this.repo.updateStructuredLog(schoolId, id, data);
  }
  async deleteStructuredLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStructuredLogById(schoolId, id);
    if (!existing) throw new EntStructuredLogNotFoundError(id);
    return this.repo.deleteStructuredLog(schoolId, id);
  }
  async countStructuredLogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStructuredLogs(schoolId, filters);
  }
}
