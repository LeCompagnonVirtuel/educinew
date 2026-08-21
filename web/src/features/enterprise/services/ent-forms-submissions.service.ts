// Enterprise Platform Service - FormsSubmissions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFormSubmissionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFormsSubmission(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findFormsSubmissionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listFormsSubmissions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllFormsSubmissions(schoolId, filters);
  }
  async createFormsSubmission(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createFormsSubmission(schoolId, data);
  }
  async updateFormsSubmission(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findFormsSubmissionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateFormsSubmission(schoolId, id, data);
  }
  async deleteFormsSubmission(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFormsSubmissionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteFormsSubmission(schoolId, id);
  }
  async countFormsSubmissions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFormsSubmissions(schoolId, filters);
  }
}
