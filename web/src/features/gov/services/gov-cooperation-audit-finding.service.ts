import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuditFinding, AuditFindingCreate } from '@educi/types';
import { GovAuditFindingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCooperationAuditFindingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<AuditFinding> {
    const item = await this.repo.findAuditFindingById(schoolId, id);
    if (!item) throw new GovAuditFindingNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<AuditFinding[]> {
    return this.repo.findAllAuditFindings(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<AuditFindingCreate>): Promise<AuditFinding> {
    return this.repo.createAuditFinding(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<AuditFindingCreate>): Promise<AuditFinding> {
    const existing = await this.repo.findAuditFindingById(schoolId, id);
    if (!existing) throw new GovAuditFindingNotFoundError(id);
    return this.repo.updateAuditFinding(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAuditFindingById(schoolId, id);
    if (!existing) throw new GovAuditFindingNotFoundError(id);
    return this.repo.deleteAuditFinding(schoolId, id);
  }
}
