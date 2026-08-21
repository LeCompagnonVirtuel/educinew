import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecretVersion } from '@educi/types';
import { EduCloudSecretVersionError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSecretVersion {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSecretVersion(schoolId: string, id: string): Promise<SecretVersion> {
    const item = await this.repo.getSecretVersion(schoolId, id);
    if (!item) throw new EduCloudSecretVersionError(id);
    return item;
  }
  async listSecretVersions(schoolId: string, filters?: Record<string, unknown>): Promise<SecretVersion[]> {
    return this.repo.listSecretVersion(schoolId, filters);
  }
  async createSecretVersion(schoolId: string, data: Partial<SecretVersion>): Promise<SecretVersion> {
    return this.repo.createSecretVersion(schoolId, data as any);
  }
  async updateSecretVersion(schoolId: string, id: string, data: Partial<SecretVersion>): Promise<SecretVersion> {
    const existing = await this.repo.getSecretVersion(schoolId, id);
    if (!existing) throw new EduCloudSecretVersionError(id);
    return this.repo.updateSecretVersion(schoolId, id, data as any);
  }
  async deleteSecretVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSecretVersion(schoolId, id);
    if (!existing) throw new EduCloudSecretVersionError(id);
    return this.repo.deleteSecretVersion(schoolId, id);
  }
}
