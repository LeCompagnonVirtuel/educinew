// Enterprise Platform Service - Okrs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntOkrService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getOkr(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findOkrById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listOkrs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllOkrs(schoolId, filters);
  }
  async createOkr(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createOkr(schoolId, data);
  }
  async updateOkr(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findOkrById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateOkr(schoolId, id, data);
  }
  async deleteOkr(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOkrById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteOkr(schoolId, id);
  }
  async countOkrs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countOkrs(schoolId, filters);
  }
}
