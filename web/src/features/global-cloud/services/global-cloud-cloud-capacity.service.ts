import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudCapacity } from '@educi/types';
import { EduCloudCloudCapacityError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudCapacity {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudCapacity(schoolId: string, id: string): Promise<CloudCapacity> {
    const item = await this.repo.getCloudCapacity(schoolId, id);
    if (!item) throw new EduCloudCloudCapacityError(id);
    return item;
  }
  async listCloudCapacitys(schoolId: string, filters?: Record<string, unknown>): Promise<CloudCapacity[]> {
    return this.repo.listCloudCapacity(schoolId, filters);
  }
  async createCloudCapacity(schoolId: string, data: Partial<CloudCapacity>): Promise<CloudCapacity> {
    return this.repo.createCloudCapacity(schoolId, data as any);
  }
  async updateCloudCapacity(schoolId: string, id: string, data: Partial<CloudCapacity>): Promise<CloudCapacity> {
    const existing = await this.repo.getCloudCapacity(schoolId, id);
    if (!existing) throw new EduCloudCloudCapacityError(id);
    return this.repo.updateCloudCapacity(schoolId, id, data as any);
  }
  async deleteCloudCapacity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudCapacity(schoolId, id);
    if (!existing) throw new EduCloudCloudCapacityError(id);
    return this.repo.deleteCloudCapacity(schoolId, id);
  }
}
