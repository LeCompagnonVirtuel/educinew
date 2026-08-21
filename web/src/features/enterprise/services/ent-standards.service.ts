// Enterprise Platform Service - Standards
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStandardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStandard(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findStandardById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listStandards(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllStandards(schoolId, filters);
  }
  async createStandard(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createStandard(schoolId, data);
  }
  async updateStandard(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findStandardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateStandard(schoolId, id, data);
  }
  async deleteStandard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStandardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteStandard(schoolId, id);
  }
  async countStandards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStandards(schoolId, filters);
  }
}
