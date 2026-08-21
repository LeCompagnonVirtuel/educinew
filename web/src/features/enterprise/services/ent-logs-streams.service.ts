// Enterprise Platform Service - LogsStreams
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLogStreamService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLogsStream(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLogsStreamById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLogsStreams(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLogsStreams(schoolId, filters);
  }
  async createLogsStream(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLogsStream(schoolId, data);
  }
  async updateLogsStream(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLogsStreamById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLogsStream(schoolId, id, data);
  }
  async deleteLogsStream(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLogsStreamById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLogsStream(schoolId, id);
  }
  async countLogsStreams(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLogsStreams(schoolId, filters);
  }
}
