// Enterprise Platform Service - Runbooks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRunbookService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRunbook(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRunbookById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRunbooks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRunbooks(schoolId, filters);
  }
  async createRunbook(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRunbook(schoolId, data);
  }
  async updateRunbook(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRunbookById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRunbook(schoolId, id, data);
  }
  async deleteRunbook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRunbookById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRunbook(schoolId, id);
  }
  async countRunbooks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRunbooks(schoolId, filters);
  }
}
