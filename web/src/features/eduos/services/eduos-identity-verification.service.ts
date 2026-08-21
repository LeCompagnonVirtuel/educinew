import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityVerification } from '@educi/types';
import { EduOSIdentityVerificationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIdentityVerificationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIdentityVerification(schoolId: string, id: string): Promise<IdentityVerification> {
    const item = await this.repo.getIdentityVerification(schoolId, id);
    if (!item) throw new EduOSIdentityVerificationError(id);
    return item;
  }
  async listIdentityVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]> {
    return this.repo.listIdentityVerifications(schoolId, filters);
  }
  async createIdentityVerification(schoolId: string, data: Partial<IdentityVerification>): Promise<IdentityVerification> {
    return this.repo.createIdentityVerification(schoolId, data as any);
  }
  async updateIdentityVerification(schoolId: string, id: string, data: Partial<IdentityVerification>): Promise<IdentityVerification> {
    const existing = await this.repo.getIdentityVerification(schoolId, id);
    if (!existing) throw new EduOSIdentityVerificationError(id);
    return this.repo.updateIdentityVerification(schoolId, id, data as any);
  }
  async deleteIdentityVerification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIdentityVerification(schoolId, id);
    if (!existing) throw new EduOSIdentityVerificationError(id);
    return this.repo.deleteIdentityVerification(schoolId, id);
  }
}

