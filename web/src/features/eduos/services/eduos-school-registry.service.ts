import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolRegistry } from '@educi/types';
import { EduOSSchoolRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSchoolRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getSchoolRegistry(schoolId: string, id: string): Promise<SchoolRegistry> {
    const item = await this.repo.getSchoolRegistry(schoolId, id);
    if (!item) throw new EduOSSchoolRegistryError(id);
    return item;
  }
  async listSchoolRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolRegistry[]> {
    return this.repo.listSchoolRegistries(schoolId, filters);
  }
  async createSchoolRegistry(schoolId: string, data: Partial<SchoolRegistry>): Promise<SchoolRegistry> {
    return this.repo.createSchoolRegistry(schoolId, data as any);
  }
  async updateSchoolRegistry(schoolId: string, id: string, data: Partial<SchoolRegistry>): Promise<SchoolRegistry> {
    const existing = await this.repo.getSchoolRegistry(schoolId, id);
    if (!existing) throw new EduOSSchoolRegistryError(id);
    return this.repo.updateSchoolRegistry(schoolId, id, data as any);
  }
  async deleteSchoolRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSchoolRegistry(schoolId, id);
    if (!existing) throw new EduOSSchoolRegistryError(id);
    return this.repo.deleteSchoolRegistry(schoolId, id);
  }
}


