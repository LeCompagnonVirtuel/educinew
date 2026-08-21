import type { SupabaseClient } from '@supabase/supabase-js';
import type { VerificationPortal } from '@educi/types';
import { EduOSVerificationPortalError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSVerificationPortalService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getVerificationPortal(schoolId: string, id: string): Promise<VerificationPortal> {
    const item = await this.repo.getVerificationPortal(schoolId, id);
    if (!item) throw new EduOSVerificationPortalError(id);
    return item;
  }
  async listVerificationPortals(schoolId: string, filters?: Record<string, unknown>): Promise<VerificationPortal[]> {
    return this.repo.listVerificationPortals(schoolId, filters);
  }
  async createVerificationPortal(schoolId: string, data: Partial<VerificationPortal>): Promise<VerificationPortal> {
    return this.repo.createVerificationPortal(schoolId, data as any);
  }
  async updateVerificationPortal(schoolId: string, id: string, data: Partial<VerificationPortal>): Promise<VerificationPortal> {
    const existing = await this.repo.getVerificationPortal(schoolId, id);
    if (!existing) throw new EduOSVerificationPortalError(id);
    return this.repo.updateVerificationPortal(schoolId, id, data as any);
  }
  async deleteVerificationPortal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVerificationPortal(schoolId, id);
    if (!existing) throw new EduOSVerificationPortalError(id);
    return this.repo.deleteVerificationPortal(schoolId, id);
  }
}

