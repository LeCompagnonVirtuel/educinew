import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudSecret } from '@educi/types';
import { EduCloudCloudSecretError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudSecret {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudSecret(schoolId: string, id: string): Promise<CloudSecret> {
    const item = await this.repo.getCloudSecret(schoolId, id);
    if (!item) throw new EduCloudCloudSecretError(id);
    return item;
  }
  async listCloudSecrets(schoolId: string, filters?: Record<string, unknown>): Promise<CloudSecret[]> {
    return this.repo.listCloudSecret(schoolId, filters);
  }
  async createCloudSecret(schoolId: string, data: Partial<CloudSecret>): Promise<CloudSecret> {
    return this.repo.createCloudSecret(schoolId, data as any);
  }
  async updateCloudSecret(schoolId: string, id: string, data: Partial<CloudSecret>): Promise<CloudSecret> {
    const existing = await this.repo.getCloudSecret(schoolId, id);
    if (!existing) throw new EduCloudCloudSecretError(id);
    return this.repo.updateCloudSecret(schoolId, id, data as any);
  }
  async deleteCloudSecret(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudSecret(schoolId, id);
    if (!existing) throw new EduCloudCloudSecretError(id);
    return this.repo.deleteCloudSecret(schoolId, id);
  }
}
