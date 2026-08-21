import type { SupabaseClient } from '@supabase/supabase-js';
import type { NFCIdentity } from '@educi/types';
import { EduOSNFCIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSNFCIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getNFCIdentity(schoolId: string, id: string): Promise<NFCIdentity> {
    const item = await this.repo.getNFCIdentity(schoolId, id);
    if (!item) throw new EduOSNFCIdentityError(id);
    return item;
  }
  async listNfcIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<NFCIdentity[]> {
    return this.repo.listNfcIdentities(schoolId, filters);
  }
  async createNFCIdentity(schoolId: string, data: Partial<NFCIdentity>): Promise<NFCIdentity> {
    return this.repo.createNFCIdentity(schoolId, data as any);
  }
  async updateNFCIdentity(schoolId: string, id: string, data: Partial<NFCIdentity>): Promise<NFCIdentity> {
    const existing = await this.repo.getNFCIdentity(schoolId, id);
    if (!existing) throw new EduOSNFCIdentityError(id);
    return this.repo.updateNFCIdentity(schoolId, id, data as any);
  }
  async deleteNFCIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNFCIdentity(schoolId, id);
    if (!existing) throw new EduOSNFCIdentityError(id);
    return this.repo.deleteNFCIdentity(schoolId, id);
  }
}


