import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudGovernance } from '@educi/types';
import { EduCloudCloudGovernanceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudGovernance {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudGovernance(schoolId: string, id: string): Promise<CloudGovernance> {
    const item = await this.repo.getCloudGovernance(schoolId, id);
    if (!item) throw new EduCloudCloudGovernanceError(id);
    return item;
  }
  async listCloudGovernances(schoolId: string, filters?: Record<string, unknown>): Promise<CloudGovernance[]> {
    return this.repo.listCloudGovernance(schoolId, filters);
  }
  async createCloudGovernance(schoolId: string, data: Partial<CloudGovernance>): Promise<CloudGovernance> {
    return this.repo.createCloudGovernance(schoolId, data as any);
  }
  async updateCloudGovernance(schoolId: string, id: string, data: Partial<CloudGovernance>): Promise<CloudGovernance> {
    const existing = await this.repo.getCloudGovernance(schoolId, id);
    if (!existing) throw new EduCloudCloudGovernanceError(id);
    return this.repo.updateCloudGovernance(schoolId, id, data as any);
  }
  async deleteCloudGovernance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudGovernance(schoolId, id);
    if (!existing) throw new EduCloudCloudGovernanceError(id);
    return this.repo.deleteCloudGovernance(schoolId, id);
  }
}
