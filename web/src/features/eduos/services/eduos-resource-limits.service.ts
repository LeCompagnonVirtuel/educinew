import type { SupabaseClient } from '@supabase/supabase-js';
import type { ResourceLimits } from '@educi/types';
import { EduOSResourceLimitsError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSResourceLimitsService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getResourceLimits(schoolId: string, id: string): Promise<ResourceLimits> {
    const item = await this.repo.getResourceLimits(schoolId, id);
    if (!item) throw new EduOSResourceLimitsError(id);
    return item;
  }
  async listResourceLimits(schoolId: string, filters?: Record<string, unknown>): Promise<ResourceLimits[]> {
    return this.repo.listResourceLimits(schoolId, filters);
  }
  async createResourceLimits(schoolId: string, data: Partial<ResourceLimits>): Promise<ResourceLimits> {
    return this.repo.createResourceLimits(schoolId, data as any);
  }
  async updateResourceLimits(schoolId: string, id: string, data: Partial<ResourceLimits>): Promise<ResourceLimits> {
    const existing = await this.repo.getResourceLimits(schoolId, id);
    if (!existing) throw new EduOSResourceLimitsError(id);
    return this.repo.updateResourceLimits(schoolId, id, data as any);
  }
  async deleteResourceLimits(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getResourceLimits(schoolId, id);
    if (!existing) throw new EduOSResourceLimitsError(id);
    return this.repo.deleteResourceLimits(schoolId, id);
  }
}

