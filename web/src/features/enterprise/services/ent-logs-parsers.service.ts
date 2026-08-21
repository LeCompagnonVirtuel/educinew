// Enterprise Platform Service - LogsParsers
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLogParserService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLogsParser(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLogsParserById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLogsParsers(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLogsParsers(schoolId, filters);
  }
  async createLogsParser(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLogsParser(schoolId, data);
  }
  async updateLogsParser(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLogsParserById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLogsParser(schoolId, id, data);
  }
  async deleteLogsParser(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLogsParserById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLogsParser(schoolId, id);
  }
  async countLogsParsers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLogsParsers(schoolId, filters);
  }
}
