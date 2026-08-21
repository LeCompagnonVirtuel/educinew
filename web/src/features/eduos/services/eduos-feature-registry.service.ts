import type { SupabaseClient } from '@supabase/supabase-js';
import type { FeatureRegistry } from '@educi/types';
import { EduOSFeatureRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSFeatureRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getFeatureRegistry(schoolId: string, id: string): Promise<FeatureRegistry> {
    const item = await this.repo.getFeatureRegistry(schoolId, id);
    if (!item) throw new EduOSFeatureRegistryError(id);
    return item;
  }
  async listFeatureRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureRegistry[]> {
    return this.repo.listFeatureRegistries(schoolId, filters);
  }
  async createFeatureRegistry(schoolId: string, data: Partial<FeatureRegistry>): Promise<FeatureRegistry> {
    return this.repo.createFeatureRegistry(schoolId, data as any);
  }
  async updateFeatureRegistry(schoolId: string, id: string, data: Partial<FeatureRegistry>): Promise<FeatureRegistry> {
    const existing = await this.repo.getFeatureRegistry(schoolId, id);
    if (!existing) throw new EduOSFeatureRegistryError(id);
    return this.repo.updateFeatureRegistry(schoolId, id, data as any);
  }
  async deleteFeatureRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFeatureRegistry(schoolId, id);
    if (!existing) throw new EduOSFeatureRegistryError(id);
    return this.repo.deleteFeatureRegistry(schoolId, id);
  }
}


