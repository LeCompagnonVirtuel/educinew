import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalEducationIdentity } from '@educi/types';
import { EduOSNationalEducationIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSNationalEducationIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getNationalEducationIdentity(schoolId: string, id: string): Promise<NationalEducationIdentity> {
    const item = await this.repo.getNationalEducationIdentity(schoolId, id);
    if (!item) throw new EduOSNationalEducationIdentityError(id);
    return item;
  }
  async listNationalEducationIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<NationalEducationIdentity[]> {
    return this.repo.listNationalEducationIdentities(schoolId, filters);
  }
  async createNationalEducationIdentity(schoolId: string, data: Partial<NationalEducationIdentity>): Promise<NationalEducationIdentity> {
    return this.repo.createNationalEducationIdentity(schoolId, data as any);
  }
  async updateNationalEducationIdentity(schoolId: string, id: string, data: Partial<NationalEducationIdentity>): Promise<NationalEducationIdentity> {
    const existing = await this.repo.getNationalEducationIdentity(schoolId, id);
    if (!existing) throw new EduOSNationalEducationIdentityError(id);
    return this.repo.updateNationalEducationIdentity(schoolId, id, data as any);
  }
  async deleteNationalEducationIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNationalEducationIdentity(schoolId, id);
    if (!existing) throw new EduOSNationalEducationIdentityError(id);
    return this.repo.deleteNationalEducationIdentity(schoolId, id);
  }
}


