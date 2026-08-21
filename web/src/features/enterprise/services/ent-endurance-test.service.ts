// Enterprise Platform Service - EnduranceTest
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnduranceTest, EnduranceTestCreate } from '@educi/types';
import { EntEnduranceTestNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEnduranceTestService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEnduranceTest(schoolId: string, id: string): Promise<EnduranceTest> {
    const item = await this.repo.findEnduranceTestById(schoolId, id);
    if (!item) throw new EntEnduranceTestNotFoundError(id);
    return item;
  }
  async listEnduranceTests(schoolId: string, filters?: Record<string, unknown>): Promise<EnduranceTest[]> {
    return this.repo.findAllEnduranceTests(schoolId, filters);
  }
  async createEnduranceTest(schoolId: string, data: EnduranceTestCreate): Promise<EnduranceTest> {
    return this.repo.createEnduranceTest(schoolId, data);
  }
  async updateEnduranceTest(schoolId: string, id: string, data: Partial<EnduranceTestCreate>): Promise<EnduranceTest> {
    const existing = await this.repo.findEnduranceTestById(schoolId, id);
    if (!existing) throw new EntEnduranceTestNotFoundError(id);
    return this.repo.updateEnduranceTest(schoolId, id, data);
  }
  async deleteEnduranceTest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnduranceTestById(schoolId, id);
    if (!existing) throw new EntEnduranceTestNotFoundError(id);
    return this.repo.deleteEnduranceTest(schoolId, id);
  }
  async countEnduranceTests(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEnduranceTests(schoolId, filters);
  }
}
