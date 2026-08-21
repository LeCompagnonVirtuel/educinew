// Enterprise Platform Service - StressTest
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { StressTest, StressTestCreate } from '@educi/types';
import { EntStressTestNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntStressTestService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getStressTest(schoolId: string, id: string): Promise<StressTest> {
    const item = await this.repo.findStressTestById(schoolId, id);
    if (!item) throw new EntStressTestNotFoundError(id);
    return item;
  }
  async listStressTests(schoolId: string, filters?: Record<string, unknown>): Promise<StressTest[]> {
    return this.repo.findAllStressTests(schoolId, filters);
  }
  async createStressTest(schoolId: string, data: StressTestCreate): Promise<StressTest> {
    return this.repo.createStressTest(schoolId, data);
  }
  async updateStressTest(schoolId: string, id: string, data: Partial<StressTestCreate>): Promise<StressTest> {
    const existing = await this.repo.findStressTestById(schoolId, id);
    if (!existing) throw new EntStressTestNotFoundError(id);
    return this.repo.updateStressTest(schoolId, id, data);
  }
  async deleteStressTest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findStressTestById(schoolId, id);
    if (!existing) throw new EntStressTestNotFoundError(id);
    return this.repo.deleteStressTest(schoolId, id);
  }
  async countStressTests(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countStressTests(schoolId, filters);
  }
}
