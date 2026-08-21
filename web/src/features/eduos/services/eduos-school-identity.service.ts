import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolIdentity } from '@educi/types';
import { EduOSSchoolIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSchoolIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getSchoolIdentity(schoolId: string, id: string): Promise<SchoolIdentity> {
    const item = await this.repo.getSchoolIdentity(schoolId, id);
    if (!item) throw new EduOSSchoolIdentityError(id);
    return item;
  }
  async listSchoolIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolIdentity[]> {
    return this.repo.listSchoolIdentities(schoolId, filters);
  }
  async createSchoolIdentity(schoolId: string, data: Partial<SchoolIdentity>): Promise<SchoolIdentity> {
    return this.repo.createSchoolIdentity(schoolId, data as any);
  }
  async updateSchoolIdentity(schoolId: string, id: string, data: Partial<SchoolIdentity>): Promise<SchoolIdentity> {
    const existing = await this.repo.getSchoolIdentity(schoolId, id);
    if (!existing) throw new EduOSSchoolIdentityError(id);
    return this.repo.updateSchoolIdentity(schoolId, id, data as any);
  }
  async deleteSchoolIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSchoolIdentity(schoolId, id);
    if (!existing) throw new EduOSSchoolIdentityError(id);
    return this.repo.deleteSchoolIdentity(schoolId, id);
  }
}


