import type { SupabaseClient } from '@supabase/supabase-js';
import type { BiometricIdentity } from '@educi/types';
import { EduOSBiometricIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBiometricIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBiometricIdentity(schoolId: string, id: string): Promise<BiometricIdentity> {
    const item = await this.repo.getBiometricIdentity(schoolId, id);
    if (!item) throw new EduOSBiometricIdentityError(id);
    return item;
  }
  async listBiometricIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<BiometricIdentity[]> {
    return this.repo.listBiometricIdentities(schoolId, filters);
  }
  async createBiometricIdentity(schoolId: string, data: Partial<BiometricIdentity>): Promise<BiometricIdentity> {
    return this.repo.createBiometricIdentity(schoolId, data as any);
  }
  async updateBiometricIdentity(schoolId: string, id: string, data: Partial<BiometricIdentity>): Promise<BiometricIdentity> {
    const existing = await this.repo.getBiometricIdentity(schoolId, id);
    if (!existing) throw new EduOSBiometricIdentityError(id);
    return this.repo.updateBiometricIdentity(schoolId, id, data as any);
  }
  async deleteBiometricIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBiometricIdentity(schoolId, id);
    if (!existing) throw new EduOSBiometricIdentityError(id);
    return this.repo.deleteBiometricIdentity(schoolId, id);
  }
}


