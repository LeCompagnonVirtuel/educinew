import type { SupabaseClient } from '@supabase/supabase-js';
import type { MultiMinistry } from '@educi/types';
import { EduCloudMultiMinistryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMultiMinistry {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMultiMinistry(schoolId: string, id: string): Promise<MultiMinistry> {
    const item = await this.repo.getMultiMinistry(schoolId, id);
    if (!item) throw new EduCloudMultiMinistryError(id);
    return item;
  }
  async listMultiMinistrys(schoolId: string, filters?: Record<string, unknown>): Promise<MultiMinistry[]> {
    return this.repo.listMultiMinistry(schoolId, filters);
  }
  async createMultiMinistry(schoolId: string, data: Partial<MultiMinistry>): Promise<MultiMinistry> {
    return this.repo.createMultiMinistry(schoolId, data as any);
  }
  async updateMultiMinistry(schoolId: string, id: string, data: Partial<MultiMinistry>): Promise<MultiMinistry> {
    const existing = await this.repo.getMultiMinistry(schoolId, id);
    if (!existing) throw new EduCloudMultiMinistryError(id);
    return this.repo.updateMultiMinistry(schoolId, id, data as any);
  }
  async deleteMultiMinistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMultiMinistry(schoolId, id);
    if (!existing) throw new EduCloudMultiMinistryError(id);
    return this.repo.deleteMultiMinistry(schoolId, id);
  }
}
