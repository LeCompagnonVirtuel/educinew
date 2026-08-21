import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudObservability } from '@educi/types';
import { EduCloudCloudObservabilityError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudObservability {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudObservability(schoolId: string, id: string): Promise<CloudObservability> {
    const item = await this.repo.getCloudObservability(schoolId, id);
    if (!item) throw new EduCloudCloudObservabilityError(id);
    return item;
  }
  async listCloudObservabilitys(schoolId: string, filters?: Record<string, unknown>): Promise<CloudObservability[]> {
    return this.repo.listCloudObservability(schoolId, filters);
  }
  async createCloudObservability(schoolId: string, data: Partial<CloudObservability>): Promise<CloudObservability> {
    return this.repo.createCloudObservability(schoolId, data as any);
  }
  async updateCloudObservability(schoolId: string, id: string, data: Partial<CloudObservability>): Promise<CloudObservability> {
    const existing = await this.repo.getCloudObservability(schoolId, id);
    if (!existing) throw new EduCloudCloudObservabilityError(id);
    return this.repo.updateCloudObservability(schoolId, id, data as any);
  }
  async deleteCloudObservability(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudObservability(schoolId, id);
    if (!existing) throw new EduCloudCloudObservabilityError(id);
    return this.repo.deleteCloudObservability(schoolId, id);
  }
}
