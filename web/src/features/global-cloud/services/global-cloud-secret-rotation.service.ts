import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecretRotation } from '@educi/types';
import { EduCloudSecretRotationError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSecretRotation {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSecretRotation(schoolId: string, id: string): Promise<SecretRotation> {
    const item = await this.repo.getSecretRotation(schoolId, id);
    if (!item) throw new EduCloudSecretRotationError(id);
    return item;
  }
  async listSecretRotations(schoolId: string, filters?: Record<string, unknown>): Promise<SecretRotation[]> {
    return this.repo.listSecretRotation(schoolId, filters);
  }
  async createSecretRotation(schoolId: string, data: Partial<SecretRotation>): Promise<SecretRotation> {
    return this.repo.createSecretRotation(schoolId, data as any);
  }
  async updateSecretRotation(schoolId: string, id: string, data: Partial<SecretRotation>): Promise<SecretRotation> {
    const existing = await this.repo.getSecretRotation(schoolId, id);
    if (!existing) throw new EduCloudSecretRotationError(id);
    return this.repo.updateSecretRotation(schoolId, id, data as any);
  }
  async deleteSecretRotation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSecretRotation(schoolId, id);
    if (!existing) throw new EduCloudSecretRotationError(id);
    return this.repo.deleteSecretRotation(schoolId, id);
  }
}
