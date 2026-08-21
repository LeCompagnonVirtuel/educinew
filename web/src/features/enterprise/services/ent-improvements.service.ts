// Enterprise Platform Service - Improvements
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntImprovementService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getImprovement(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findImprovementById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listImprovements(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllImprovements(schoolId, filters);
  }
  async createImprovement(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createImprovement(schoolId, data);
  }
  async updateImprovement(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findImprovementById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateImprovement(schoolId, id, data);
  }
  async deleteImprovement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findImprovementById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteImprovement(schoolId, id);
  }
  async countImprovements(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countImprovements(schoolId, filters);
  }
}
