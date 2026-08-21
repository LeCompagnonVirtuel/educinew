// Enterprise Platform Service - Workbooks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntWorkbookService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getWorkbook(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findWorkbookById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listWorkbooks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllWorkbooks(schoolId, filters);
  }
  async createWorkbook(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createWorkbook(schoolId, data);
  }
  async updateWorkbook(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findWorkbookById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateWorkbook(schoolId, id, data);
  }
  async deleteWorkbook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWorkbookById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteWorkbook(schoolId, id);
  }
  async countWorkbooks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWorkbooks(schoolId, filters);
  }
}
