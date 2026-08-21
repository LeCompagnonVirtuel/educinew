// Government & National Governance Service - AuditFinding
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuditFinding, AuditFindingCreate } from '@educi/types';
import { GovAuditFindingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAuditFindingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAuditFinding(schoolId: string, id: string): Promise<AuditFinding> {
    const item = await this.repo.findAuditFindingById(schoolId, id);
    if (!item) throw new GovAuditFindingNotFoundError(id);
    return item;
  }

  async listAuditFindings(schoolId: string, filters?: Record<string, unknown>): Promise<AuditFinding[]> {
    return this.repo.findAllAuditFindings(schoolId, filters);
  }

  async createAuditFinding(schoolId: string, data: AuditFindingCreate): Promise<AuditFinding> {
    return this.repo.createAuditFinding(schoolId, data);
  }

  async updateAuditFinding(schoolId: string, id: string, data: Partial<AuditFindingCreate>): Promise<AuditFinding> {
    const existing = await this.repo.findAuditFindingById(schoolId, id);
    if (!existing) throw new GovAuditFindingNotFoundError(id);
    return this.repo.updateAuditFinding(schoolId, id, data);
  }

  async deleteAuditFinding(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAuditFindingById(schoolId, id);
    if (!existing) throw new GovAuditFindingNotFoundError(id);
    return this.repo.deleteAuditFinding(schoolId, id);
  }

  async countAuditFindings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAuditFindings(schoolId, filters);
  }
}
