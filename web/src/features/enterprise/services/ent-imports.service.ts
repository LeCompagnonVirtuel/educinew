// Enterprise Platform Service - Imports
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntImportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getImport(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findImportById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listImports(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllImports(schoolId, filters);
  }
  async createImport(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createImport(schoolId, data);
  }
  async updateImport(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findImportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateImport(schoolId, id, data);
  }
  async deleteImport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findImportById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteImport(schoolId, id);
  }
  async countImports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countImports(schoolId, filters);
  }
}
