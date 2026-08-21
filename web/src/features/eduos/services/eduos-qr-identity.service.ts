import type { SupabaseClient } from '@supabase/supabase-js';
import type { QRIdentity } from '@educi/types';
import { EduOSQRIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSQRIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getQRIdentity(schoolId: string, id: string): Promise<QRIdentity> {
    const item = await this.repo.getQRIdentity(schoolId, id);
    if (!item) throw new EduOSQRIdentityError(id);
    return item;
  }
  async listQrIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<QRIdentity[]> {
    return this.repo.listQrIdentities(schoolId, filters);
  }
  async createQRIdentity(schoolId: string, data: Partial<QRIdentity>): Promise<QRIdentity> {
    return this.repo.createQRIdentity(schoolId, data as any);
  }
  async updateQRIdentity(schoolId: string, id: string, data: Partial<QRIdentity>): Promise<QRIdentity> {
    const existing = await this.repo.getQRIdentity(schoolId, id);
    if (!existing) throw new EduOSQRIdentityError(id);
    return this.repo.updateQRIdentity(schoolId, id, data as any);
  }
  async deleteQRIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getQRIdentity(schoolId, id);
    if (!existing) throw new EduOSQRIdentityError(id);
    return this.repo.deleteQRIdentity(schoolId, id);
  }
}


