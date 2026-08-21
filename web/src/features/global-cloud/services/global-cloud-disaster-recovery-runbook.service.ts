import type { SupabaseClient } from '@supabase/supabase-js';
import type { DisasterRecoveryRunbook } from '@educi/types';
import { EduCloudDisasterRecoveryRunbookError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudDisasterRecoveryRunbook {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getDisasterRecoveryRunbook(schoolId: string, id: string): Promise<DisasterRecoveryRunbook> {
    const item = await this.repo.getDisasterRecoveryRunbook(schoolId, id);
    if (!item) throw new EduCloudDisasterRecoveryRunbookError(id);
    return item;
  }
  async listDisasterRecoveryRunbooks(schoolId: string, filters?: Record<string, unknown>): Promise<DisasterRecoveryRunbook[]> {
    return this.repo.listDisasterRecoveryRunbook(schoolId, filters);
  }
  async createDisasterRecoveryRunbook(schoolId: string, data: Partial<DisasterRecoveryRunbook>): Promise<DisasterRecoveryRunbook> {
    return this.repo.createDisasterRecoveryRunbook(schoolId, data as any);
  }
  async updateDisasterRecoveryRunbook(schoolId: string, id: string, data: Partial<DisasterRecoveryRunbook>): Promise<DisasterRecoveryRunbook> {
    const existing = await this.repo.getDisasterRecoveryRunbook(schoolId, id);
    if (!existing) throw new EduCloudDisasterRecoveryRunbookError(id);
    return this.repo.updateDisasterRecoveryRunbook(schoolId, id, data as any);
  }
  async deleteDisasterRecoveryRunbook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDisasterRecoveryRunbook(schoolId, id);
    if (!existing) throw new EduCloudDisasterRecoveryRunbookError(id);
    return this.repo.deleteDisasterRecoveryRunbook(schoolId, id);
  }
}
