import type { SupabaseClient } from '@supabase/supabase-js';
import type { QrVerification, QrVerificationCreate } from '@educi/types';
import { GovQrVerificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityQrVerificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<QrVerification> {
    const item = await this.repo.findQrVerificationById(schoolId, id);
    if (!item) throw new GovQrVerificationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<QrVerification[]> {
    return this.repo.findAllQrVerifications(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<QrVerificationCreate>): Promise<QrVerification> {
    return this.repo.createQrVerification(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<QrVerificationCreate>): Promise<QrVerification> {
    const existing = await this.repo.findQrVerificationById(schoolId, id);
    if (!existing) throw new GovQrVerificationNotFoundError(id);
    return this.repo.updateQrVerification(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQrVerificationById(schoolId, id);
    if (!existing) throw new GovQrVerificationNotFoundError(id);
    return this.repo.deleteQrVerification(schoolId, id);
  }
}
