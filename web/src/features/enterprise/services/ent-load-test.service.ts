// Enterprise Platform Service - LoadTest
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { LoadTest, LoadTestCreate } from '@educi/types';
import { EntLoadTestNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLoadTestService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLoadTest(schoolId: string, id: string): Promise<LoadTest> {
    const item = await this.repo.findLoadTestById(schoolId, id);
    if (!item) throw new EntLoadTestNotFoundError(id);
    return item;
  }
  async listLoadTests(schoolId: string, filters?: Record<string, unknown>): Promise<LoadTest[]> {
    return this.repo.findAllLoadTests(schoolId, filters);
  }
  async createLoadTest(schoolId: string, data: LoadTestCreate): Promise<LoadTest> {
    return this.repo.createLoadTest(schoolId, data);
  }
  async updateLoadTest(schoolId: string, id: string, data: Partial<LoadTestCreate>): Promise<LoadTest> {
    const existing = await this.repo.findLoadTestById(schoolId, id);
    if (!existing) throw new EntLoadTestNotFoundError(id);
    return this.repo.updateLoadTest(schoolId, id, data);
  }
  async deleteLoadTest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLoadTestById(schoolId, id);
    if (!existing) throw new EntLoadTestNotFoundError(id);
    return this.repo.deleteLoadTest(schoolId, id);
  }
  async countLoadTests(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLoadTests(schoolId, filters);
  }
}
