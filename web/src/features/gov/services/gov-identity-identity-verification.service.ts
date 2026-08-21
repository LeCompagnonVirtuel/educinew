import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityVerification, IdentityVerificationCreate } from '@educi/types';
import { GovIdentityVerificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityIdentityVerificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<IdentityVerification> {
    const item = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!item) throw new GovIdentityVerificationNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]> {
    return this.repo.findAllIdentityVerifications(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<IdentityVerificationCreate>): Promise<IdentityVerification> {
    return this.repo.createIdentityVerification(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<IdentityVerificationCreate>): Promise<IdentityVerification> {
    const existing = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!existing) throw new GovIdentityVerificationNotFoundError(id);
    return this.repo.updateIdentityVerification(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!existing) throw new GovIdentityVerificationNotFoundError(id);
    return this.repo.deleteIdentityVerification(schoolId, id);
  }
}
