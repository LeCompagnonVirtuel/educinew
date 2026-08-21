import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegistrySearchQuery } from '@educi/types';
import { EduOSRegistrySearchQueryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRegistrySearchQueryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRegistrySearchQuery(schoolId: string, id: string): Promise<RegistrySearchQuery> {
    const item = await this.repo.getRegistrySearchQuery(schoolId, id);
    if (!item) throw new EduOSRegistrySearchQueryError(id);
    return item;
  }
  async listRegistrySearchQueries(schoolId: string, filters?: Record<string, unknown>): Promise<RegistrySearchQuery[]> {
    return this.repo.listRegistrySearchQueries(schoolId, filters);
  }
  async createRegistrySearchQuery(schoolId: string, data: Partial<RegistrySearchQuery>): Promise<RegistrySearchQuery> {
    return this.repo.createRegistrySearchQuery(schoolId, data as any);
  }
  async updateRegistrySearchQuery(schoolId: string, id: string, data: Partial<RegistrySearchQuery>): Promise<RegistrySearchQuery> {
    const existing = await this.repo.getRegistrySearchQuery(schoolId, id);
    if (!existing) throw new EduOSRegistrySearchQueryError(id);
    return this.repo.updateRegistrySearchQuery(schoolId, id, data as any);
  }
  async deleteRegistrySearchQuery(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRegistrySearchQuery(schoolId, id);
    if (!existing) throw new EduOSRegistrySearchQueryError(id);
    return this.repo.deleteRegistrySearchQuery(schoolId, id);
  }
}


