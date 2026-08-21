import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudCompliance } from '@educi/types';
import { EduCloudCloudComplianceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudCompliance {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudCompliance(schoolId: string, id: string): Promise<CloudCompliance> {
    const item = await this.repo.getCloudCompliance(schoolId, id);
    if (!item) throw new EduCloudCloudComplianceError(id);
    return item;
  }
  async listCloudCompliances(schoolId: string, filters?: Record<string, unknown>): Promise<CloudCompliance[]> {
    return this.repo.listCloudCompliance(schoolId, filters);
  }
  async createCloudCompliance(schoolId: string, data: Partial<CloudCompliance>): Promise<CloudCompliance> {
    return this.repo.createCloudCompliance(schoolId, data as any);
  }
  async updateCloudCompliance(schoolId: string, id: string, data: Partial<CloudCompliance>): Promise<CloudCompliance> {
    const existing = await this.repo.getCloudCompliance(schoolId, id);
    if (!existing) throw new EduCloudCloudComplianceError(id);
    return this.repo.updateCloudCompliance(schoolId, id, data as any);
  }
  async deleteCloudCompliance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudCompliance(schoolId, id);
    if (!existing) throw new EduCloudCloudComplianceError(id);
    return this.repo.deleteCloudCompliance(schoolId, id);
  }
}
