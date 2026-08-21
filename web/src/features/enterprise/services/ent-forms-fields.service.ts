// Enterprise Platform Service - FormsFields
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFormFieldService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFormsField(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFormsFieldById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFormsFields(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFormsFields(schoolId, filters);
  }
  async createFormsField(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFormsField(schoolId, data);
  }
  async updateFormsField(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFormsFieldById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFormsField(schoolId, id, data);
  }
  async deleteFormsField(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFormsFieldById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFormsField(schoolId, id);
  }
  async countFormsFields(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFormsFields(schoolId, filters);
  }
}
