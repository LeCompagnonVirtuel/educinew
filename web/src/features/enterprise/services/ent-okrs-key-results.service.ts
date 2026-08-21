// Enterprise Platform Service - OkrsKeyResults
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntKeyResultService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getOkrsKeyResult(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findOkrsKeyResultById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listOkrsKeyResults(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllOkrsKeyResults(schoolId, filters);
  }
  async createOkrsKeyResult(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createOkrsKeyResult(schoolId, data);
  }
  async updateOkrsKeyResult(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findOkrsKeyResultById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateOkrsKeyResult(schoolId, id, data);
  }
  async deleteOkrsKeyResult(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOkrsKeyResultById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteOkrsKeyResult(schoolId, id);
  }
  async countOkrsKeyResults(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countOkrsKeyResults(schoolId, filters);
  }
}
