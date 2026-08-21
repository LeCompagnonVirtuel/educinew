// Enterprise Platform Service - DataImports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataImportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataImport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDataImportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDataImports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDataImports(schoolId, filters);
  }
  async createDataImport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDataImport(schoolId, data);
  }
  async updateDataImport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDataImportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDataImport(schoolId, id, data);
  }
  async deleteDataImport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataImportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDataImport(schoolId, id);
  }
  async countDataImports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataImports(schoolId, filters);
  }
}
