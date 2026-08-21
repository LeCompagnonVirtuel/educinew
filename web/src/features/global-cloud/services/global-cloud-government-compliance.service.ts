import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernmentCompliance } from '@educi/types';
import { EduCloudGovernmentComplianceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudGovernmentCompliance {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getGovernmentCompliance(schoolId: string, id: string): Promise<GovernmentCompliance> {
    const item = await this.repo.getGovernmentCompliance(schoolId, id);
    if (!item) throw new EduCloudGovernmentComplianceError(id);
    return item;
  }
  async listGovernmentCompliances(schoolId: string, filters?: Record<string, unknown>): Promise<GovernmentCompliance[]> {
    return this.repo.listGovernmentCompliance(schoolId, filters);
  }
  async createGovernmentCompliance(schoolId: string, data: Partial<GovernmentCompliance>): Promise<GovernmentCompliance> {
    return this.repo.createGovernmentCompliance(schoolId, data as any);
  }
  async updateGovernmentCompliance(schoolId: string, id: string, data: Partial<GovernmentCompliance>): Promise<GovernmentCompliance> {
    const existing = await this.repo.getGovernmentCompliance(schoolId, id);
    if (!existing) throw new EduCloudGovernmentComplianceError(id);
    return this.repo.updateGovernmentCompliance(schoolId, id, data as any);
  }
  async deleteGovernmentCompliance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGovernmentCompliance(schoolId, id);
    if (!existing) throw new EduCloudGovernmentComplianceError(id);
    return this.repo.deleteGovernmentCompliance(schoolId, id);
  }
}
