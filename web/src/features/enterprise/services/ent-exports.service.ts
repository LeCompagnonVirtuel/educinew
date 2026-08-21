// Enterprise Platform Service - Exports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntExportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getExport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findExportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listExports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllExports(schoolId, filters);
  }
  async createExport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createExport(schoolId, data);
  }
  async updateExport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findExportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateExport(schoolId, id, data);
  }
  async deleteExport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteExport(schoolId, id);
  }
  async countExports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExports(schoolId, filters);
  }
}
