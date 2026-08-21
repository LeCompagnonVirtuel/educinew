import type { SupabaseClient } from '@supabase/supabase-js';
import type { DisasterRecoveryTest } from '@educi/types';
import { EduCloudDisasterRecoveryTestError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDisasterRecoveryTest {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDisasterRecoveryTest(schoolId: string, id: string): Promise<DisasterRecoveryTest> {
    const item = await this.repo.getDisasterRecoveryTest(schoolId, id);
    if (!item) throw new EduCloudDisasterRecoveryTestError(id);
    return item;
  }
  async listDisasterRecoveryTests(schoolId: string, filters?: Record<string, unknown>): Promise<DisasterRecoveryTest[]> {
    return this.repo.listDisasterRecoveryTest(schoolId, filters);
  }
  async createDisasterRecoveryTest(schoolId: string, data: Partial<DisasterRecoveryTest>): Promise<DisasterRecoveryTest> {
    return this.repo.createDisasterRecoveryTest(schoolId, data as any);
  }
  async updateDisasterRecoveryTest(schoolId: string, id: string, data: Partial<DisasterRecoveryTest>): Promise<DisasterRecoveryTest> {
    const existing = await this.repo.getDisasterRecoveryTest(schoolId, id);
    if (!existing) throw new EduCloudDisasterRecoveryTestError(id);
    return this.repo.updateDisasterRecoveryTest(schoolId, id, data as any);
  }
  async deleteDisasterRecoveryTest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDisasterRecoveryTest(schoolId, id);
    if (!existing) throw new EduCloudDisasterRecoveryTestError(id);
    return this.repo.deleteDisasterRecoveryTest(schoolId, id);
  }
}
