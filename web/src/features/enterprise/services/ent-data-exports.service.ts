// Enterprise Platform Service - DataExports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataExportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataExport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataExportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataExports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataExports(schoolId, filters);
  }
  async createDataExport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataExport(schoolId, data);
  }
  async updateDataExport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataExportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataExport(schoolId, id, data);
  }
  async deleteDataExport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataExportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataExport(schoolId, id);
  }
  async countDataExports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataExports(schoolId, filters);
  }
}
