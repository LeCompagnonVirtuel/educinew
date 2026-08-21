import type { SupabaseClient } from '@supabase/supabase-js';
import type { FederationMapping } from '@educi/types';
import { EduCloudFederationMappingError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudFederationMapping {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getFederationMapping(schoolId: string, id: string): Promise<FederationMapping> {
    const item = await this.repo.getFederationMapping(schoolId, id);
    if (!item) throw new EduCloudFederationMappingError(id);
    return item;
  }
  async listFederationMappings(schoolId: string, filters?: Record<string, unknown>): Promise<FederationMapping[]> {
    return this.repo.listFederationMapping(schoolId, filters);
  }
  async createFederationMapping(schoolId: string, data: Partial<FederationMapping>): Promise<FederationMapping> {
    return this.repo.createFederationMapping(schoolId, data as any);
  }
  async updateFederationMapping(schoolId: string, id: string, data: Partial<FederationMapping>): Promise<FederationMapping> {
    const existing = await this.repo.getFederationMapping(schoolId, id);
    if (!existing) throw new EduCloudFederationMappingError(id);
    return this.repo.updateFederationMapping(schoolId, id, data as any);
  }
  async deleteFederationMapping(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getFederationMapping(schoolId, id);
    if (!existing) throw new EduCloudFederationMappingError(id);
    return this.repo.deleteFederationMapping(schoolId, id);
  }
}
