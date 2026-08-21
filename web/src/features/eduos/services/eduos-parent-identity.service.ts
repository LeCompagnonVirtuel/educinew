import type { SupabaseClient } from '@supabase/supabase-js';
import type { ParentIdentity } from '@educi/types';
import { EduOSParentIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSParentIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getParentIdentity(schoolId: string, id: string): Promise<ParentIdentity> {
    const item = await this.repo.getParentIdentity(schoolId, id);
    if (!item) throw new EduOSParentIdentityError(id);
    return item;
  }
  async listParentIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<ParentIdentity[]> {
    return this.repo.listParentIdentities(schoolId, filters);
  }
  async createParentIdentity(schoolId: string, data: Partial<ParentIdentity>): Promise<ParentIdentity> {
    return this.repo.createParentIdentity(schoolId, data as any);
  }
  async updateParentIdentity(schoolId: string, id: string, data: Partial<ParentIdentity>): Promise<ParentIdentity> {
    const existing = await this.repo.getParentIdentity(schoolId, id);
    if (!existing) throw new EduOSParentIdentityError(id);
    return this.repo.updateParentIdentity(schoolId, id, data as any);
  }
  async deleteParentIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getParentIdentity(schoolId, id);
    if (!existing) throw new EduOSParentIdentityError(id);
    return this.repo.deleteParentIdentity(schoolId, id);
  }
}


