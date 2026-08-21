import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationWallet } from '@educi/types';
import { EduOSEducationWalletError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSEducationWalletService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getEducationWallet(schoolId: string, id: string): Promise<EducationWallet> {
    const item = await this.repo.getEducationWallet(schoolId, id);
    if (!item) throw new EduOSEducationWalletError(id);
    return item;
  }
  async listEducationWallets(schoolId: string, filters?: Record<string, unknown>): Promise<EducationWallet[]> {
    return this.repo.listEducationWallets(schoolId, filters);
  }
  async createEducationWallet(schoolId: string, data: Partial<EducationWallet>): Promise<EducationWallet> {
    return this.repo.createEducationWallet(schoolId, data as any);
  }
  async updateEducationWallet(schoolId: string, id: string, data: Partial<EducationWallet>): Promise<EducationWallet> {
    const existing = await this.repo.getEducationWallet(schoolId, id);
    if (!existing) throw new EduOSEducationWalletError(id);
    return this.repo.updateEducationWallet(schoolId, id, data as any);
  }
  async deleteEducationWallet(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEducationWallet(schoolId, id);
    if (!existing) throw new EduOSEducationWalletError(id);
    return this.repo.deleteEducationWallet(schoolId, id);
  }
}

