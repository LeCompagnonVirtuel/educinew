import type { SupabaseClient } from '@supabase/supabase-js';
import type { SecretAudit } from '@educi/types';
import { EduCloudSecretAuditError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSecretAudit {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSecretAudit(schoolId: string, id: string): Promise<SecretAudit> {
    const item = await this.repo.getSecretAudit(schoolId, id);
    if (!item) throw new EduCloudSecretAuditError(id);
    return item;
  }
  async listSecretAudits(schoolId: string, filters?: Record<string, unknown>): Promise<SecretAudit[]> {
    return this.repo.listSecretAudit(schoolId, filters);
  }
  async createSecretAudit(schoolId: string, data: Partial<SecretAudit>): Promise<SecretAudit> {
    return this.repo.createSecretAudit(schoolId, data as any);
  }
  async updateSecretAudit(schoolId: string, id: string, data: Partial<SecretAudit>): Promise<SecretAudit> {
    const existing = await this.repo.getSecretAudit(schoolId, id);
    if (!existing) throw new EduCloudSecretAuditError(id);
    return this.repo.updateSecretAudit(schoolId, id, data as any);
  }
  async deleteSecretAudit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSecretAudit(schoolId, id);
    if (!existing) throw new EduCloudSecretAuditError(id);
    return this.repo.deleteSecretAudit(schoolId, id);
  }
}
