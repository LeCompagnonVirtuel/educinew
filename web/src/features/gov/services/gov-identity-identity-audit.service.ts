import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityAudit, IdentityAuditCreate } from '@educi/types';
import { GovIdentityAuditNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityIdentityAuditService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<IdentityAudit> {
    const item = await this.repo.findIdentityAuditById(schoolId, id);
    if (!item) throw new GovIdentityAuditNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityAudit[]> {
    return this.repo.findAllIdentityAudits(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<IdentityAuditCreate>): Promise<IdentityAudit> {
    return this.repo.createIdentityAudit(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<IdentityAuditCreate>): Promise<IdentityAudit> {
    const existing = await this.repo.findIdentityAuditById(schoolId, id);
    if (!existing) throw new GovIdentityAuditNotFoundError(id);
    return this.repo.updateIdentityAudit(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityAuditById(schoolId, id);
    if (!existing) throw new GovIdentityAuditNotFoundError(id);
    return this.repo.deleteIdentityAudit(schoolId, id);
  }
}
