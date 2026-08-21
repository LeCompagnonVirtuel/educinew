import type { SupabaseClient } from '@supabase/supabase-js';
import type { InstitutionRegistry } from '@educi/types';
import { EduOSInstitutionRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSInstitutionRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getInstitutionRegistry(schoolId: string, id: string): Promise<InstitutionRegistry> {
    const item = await this.repo.getInstitutionRegistry(schoolId, id);
    if (!item) throw new EduOSInstitutionRegistryError(id);
    return item;
  }
  async listInstitutionRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<InstitutionRegistry[]> {
    return this.repo.listInstitutionRegistries(schoolId, filters);
  }
  async createInstitutionRegistry(schoolId: string, data: Partial<InstitutionRegistry>): Promise<InstitutionRegistry> {
    return this.repo.createInstitutionRegistry(schoolId, data as any);
  }
  async updateInstitutionRegistry(schoolId: string, id: string, data: Partial<InstitutionRegistry>): Promise<InstitutionRegistry> {
    const existing = await this.repo.getInstitutionRegistry(schoolId, id);
    if (!existing) throw new EduOSInstitutionRegistryError(id);
    return this.repo.updateInstitutionRegistry(schoolId, id, data as any);
  }
  async deleteInstitutionRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getInstitutionRegistry(schoolId, id);
    if (!existing) throw new EduOSInstitutionRegistryError(id);
    return this.repo.deleteInstitutionRegistry(schoolId, id);
  }
}


