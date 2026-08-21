import type { SupabaseClient } from '@supabase/supabase-js';
import type { DigitalWalletIdentity } from '@educi/types';
import { EduOSDigitalWalletIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDigitalWalletIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDigitalWalletIdentity(schoolId: string, id: string): Promise<DigitalWalletIdentity> {
    const item = await this.repo.getDigitalWalletIdentity(schoolId, id);
    if (!item) throw new EduOSDigitalWalletIdentityError(id);
    return item;
  }
  async listDigitalWalletIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<DigitalWalletIdentity[]> {
    return this.repo.listDigitalWalletIdentities(schoolId, filters);
  }
  async createDigitalWalletIdentity(schoolId: string, data: Partial<DigitalWalletIdentity>): Promise<DigitalWalletIdentity> {
    return this.repo.createDigitalWalletIdentity(schoolId, data as any);
  }
  async updateDigitalWalletIdentity(schoolId: string, id: string, data: Partial<DigitalWalletIdentity>): Promise<DigitalWalletIdentity> {
    const existing = await this.repo.getDigitalWalletIdentity(schoolId, id);
    if (!existing) throw new EduOSDigitalWalletIdentityError(id);
    return this.repo.updateDigitalWalletIdentity(schoolId, id, data as any);
  }
  async deleteDigitalWalletIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDigitalWalletIdentity(schoolId, id);
    if (!existing) throw new EduOSDigitalWalletIdentityError(id);
    return this.repo.deleteDigitalWalletIdentity(schoolId, id);
  }
}


