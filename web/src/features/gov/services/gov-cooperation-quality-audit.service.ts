import type { SupabaseClient } from '@supabase/supabase-js';
import type { QualityAudit, QualityAuditCreate } from '@educi/types';
import { GovQualityAuditNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCooperationQualityAuditService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<QualityAudit> {
    const item = await this.repo.findQualityAuditById(schoolId, id);
    if (!item) throw new GovQualityAuditNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<QualityAudit[]> {
    return this.repo.findAllQualityAudits(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<QualityAuditCreate>): Promise<QualityAudit> {
    return this.repo.createQualityAudit(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<QualityAuditCreate>): Promise<QualityAudit> {
    const existing = await this.repo.findQualityAuditById(schoolId, id);
    if (!existing) throw new GovQualityAuditNotFoundError(id);
    return this.repo.updateQualityAudit(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQualityAuditById(schoolId, id);
    if (!existing) throw new GovQualityAuditNotFoundError(id);
    return this.repo.deleteQualityAudit(schoolId, id);
  }
}
