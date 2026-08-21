// Enterprise Platform Service - DisasterRecoveryTest
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DisasterRecoveryTest, DisasterRecoveryTestCreate } from '@educi/types';
import { EntDisasterRecoveryTestNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDisasterRecoveryTestService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDisasterRecoveryTest(schoolId: string, id: string): Promise<DisasterRecoveryTest> {
    const item = await this.repo.findDisasterRecoveryTestById(schoolId, id);
    if (!item) throw new EntDisasterRecoveryTestNotFoundError(id);
    return item;
  }
  async listDisasterRecoveryTests(schoolId: string, filters?: Record<string, unknown>): Promise<DisasterRecoveryTest[]> {
    return this.repo.findAllDisasterRecoveryTests(schoolId, filters);
  }
  async createDisasterRecoveryTest(schoolId: string, data: DisasterRecoveryTestCreate): Promise<DisasterRecoveryTest> {
    return this.repo.createDisasterRecoveryTest(schoolId, data);
  }
  async updateDisasterRecoveryTest(schoolId: string, id: string, data: Partial<DisasterRecoveryTestCreate>): Promise<DisasterRecoveryTest> {
    const existing = await this.repo.findDisasterRecoveryTestById(schoolId, id);
    if (!existing) throw new EntDisasterRecoveryTestNotFoundError(id);
    return this.repo.updateDisasterRecoveryTest(schoolId, id, data);
  }
  async deleteDisasterRecoveryTest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDisasterRecoveryTestById(schoolId, id);
    if (!existing) throw new EntDisasterRecoveryTestNotFoundError(id);
    return this.repo.deleteDisasterRecoveryTest(schoolId, id);
  }
  async countDisasterRecoveryTests(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDisasterRecoveryTests(schoolId, filters);
  }
}
