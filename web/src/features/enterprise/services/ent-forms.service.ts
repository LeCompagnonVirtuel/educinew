// Enterprise Platform Service - Forms
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFormService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getForm(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFormById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listForms(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllForms(schoolId, filters);
  }
  async createForm(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createForm(schoolId, data);
  }
  async updateForm(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFormById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateForm(schoolId, id, data);
  }
  async deleteForm(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFormById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteForm(schoolId, id);
  }
  async countForms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countForms(schoolId, filters);
  }
}
