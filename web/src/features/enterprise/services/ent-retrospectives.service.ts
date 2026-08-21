// Enterprise Platform Service - Retrospectives
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRetrospectiveService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRetrospective(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRetrospectiveById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRetrospectives(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRetrospectives(schoolId, filters);
  }
  async createRetrospective(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRetrospective(schoolId, data);
  }
  async updateRetrospective(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRetrospectiveById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRetrospective(schoolId, id, data);
  }
  async deleteRetrospective(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRetrospectiveById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRetrospective(schoolId, id);
  }
  async countRetrospectives(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRetrospectives(schoolId, filters);
  }
}
