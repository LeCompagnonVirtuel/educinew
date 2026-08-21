import type { SupabaseClient } from '@supabase/supabase-js';
import type { OrganizationIdentity } from '@educi/types';
import { EduOSOrganizationIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSOrganizationIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getOrganizationIdentity(schoolId: string, id: string): Promise<OrganizationIdentity> {
    const item = await this.repo.getOrganizationIdentity(schoolId, id);
    if (!item) throw new EduOSOrganizationIdentityError(id);
    return item;
  }
  async listOrganizationIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<OrganizationIdentity[]> {
    return this.repo.listOrganizationIdentities(schoolId, filters);
  }
  async createOrganizationIdentity(schoolId: string, data: Partial<OrganizationIdentity>): Promise<OrganizationIdentity> {
    return this.repo.createOrganizationIdentity(schoolId, data as any);
  }
  async updateOrganizationIdentity(schoolId: string, id: string, data: Partial<OrganizationIdentity>): Promise<OrganizationIdentity> {
    const existing = await this.repo.getOrganizationIdentity(schoolId, id);
    if (!existing) throw new EduOSOrganizationIdentityError(id);
    return this.repo.updateOrganizationIdentity(schoolId, id, data as any);
  }
  async deleteOrganizationIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getOrganizationIdentity(schoolId, id);
    if (!existing) throw new EduOSOrganizationIdentityError(id);
    return this.repo.deleteOrganizationIdentity(schoolId, id);
  }
}


