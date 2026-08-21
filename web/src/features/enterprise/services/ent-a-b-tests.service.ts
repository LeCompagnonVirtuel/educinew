// Enterprise Platform Service - ABTests
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntABTestService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getABTest(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findABTestById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listABTests(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllABTests(schoolId, filters);
  }
  async createABTest(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createABTest(schoolId, data);
  }
  async updateABTest(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findABTestById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateABTest(schoolId, id, data);
  }
  async deleteABTest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findABTestById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteABTest(schoolId, id);
  }
  async countABTests(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countABTests(schoolId, filters);
  }
}
