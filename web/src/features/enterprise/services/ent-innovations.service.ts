// Enterprise Platform Service - Innovations
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntInnovationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getInnovation(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findInnovationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listInnovations(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllInnovations(schoolId, filters);
  }
  async createInnovation(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createInnovation(schoolId, data);
  }
  async updateInnovation(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findInnovationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateInnovation(schoolId, id, data);
  }
  async deleteInnovation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInnovationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteInnovation(schoolId, id);
  }
  async countInnovations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInnovations(schoolId, filters);
  }
}
