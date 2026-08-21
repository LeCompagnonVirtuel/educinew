// Enterprise Platform Service - UsabilityTests
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntUsabilityTestService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getUsabilityTest(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findUsabilityTestById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listUsabilityTests(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllUsabilityTests(schoolId, filters);
  }
  async createUsabilityTest(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createUsabilityTest(schoolId, data);
  }
  async updateUsabilityTest(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findUsabilityTestById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateUsabilityTest(schoolId, id, data);
  }
  async deleteUsabilityTest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUsabilityTestById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteUsabilityTest(schoolId, id);
  }
  async countUsabilityTests(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countUsabilityTests(schoolId, filters);
  }
}
