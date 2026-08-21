import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityConsent } from '@educi/types';
import { EduOSIdentityConsentError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIdentityConsentService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIdentityConsent(schoolId: string, id: string): Promise<IdentityConsent> {
    const item = await this.repo.getIdentityConsent(schoolId, id);
    if (!item) throw new EduOSIdentityConsentError(id);
    return item;
  }
  async listIdentityConsents(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityConsent[]> {
    return this.repo.listIdentityConsents(schoolId, filters);
  }
  async createIdentityConsent(schoolId: string, data: Partial<IdentityConsent>): Promise<IdentityConsent> {
    return this.repo.createIdentityConsent(schoolId, data as any);
  }
  async updateIdentityConsent(schoolId: string, id: string, data: Partial<IdentityConsent>): Promise<IdentityConsent> {
    const existing = await this.repo.getIdentityConsent(schoolId, id);
    if (!existing) throw new EduOSIdentityConsentError(id);
    return this.repo.updateIdentityConsent(schoolId, id, data as any);
  }
  async deleteIdentityConsent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIdentityConsent(schoolId, id);
    if (!existing) throw new EduOSIdentityConsentError(id);
    return this.repo.deleteIdentityConsent(schoolId, id);
  }
}

