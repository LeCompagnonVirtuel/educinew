// Government & National Governance Service - CampusTransferApproval
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CampusTransferApproval, CampusTransferApprovalCreate } from '@educi/types';
import { GovCampusTransferApprovalNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovCampusTransferApprovalService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getCampusTransferApproval(schoolId: string, id: string): Promise<CampusTransferApproval> {
    const item = await this.repo.findCampusTransferApprovalById(schoolId, id);
    if (!item) throw new GovCampusTransferApprovalNotFoundError(id);
    return item;
  }

  async listCampusTransferApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<CampusTransferApproval[]> {
    return this.repo.findAllCampusTransferApprovals(schoolId, filters);
  }

  async createCampusTransferApproval(schoolId: string, data: CampusTransferApprovalCreate): Promise<CampusTransferApproval> {
    return this.repo.createCampusTransferApproval(schoolId, data);
  }

  async updateCampusTransferApproval(schoolId: string, id: string, data: Partial<CampusTransferApprovalCreate>): Promise<CampusTransferApproval> {
    const existing = await this.repo.findCampusTransferApprovalById(schoolId, id);
    if (!existing) throw new GovCampusTransferApprovalNotFoundError(id);
    return this.repo.updateCampusTransferApproval(schoolId, id, data);
  }

  async deleteCampusTransferApproval(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCampusTransferApprovalById(schoolId, id);
    if (!existing) throw new GovCampusTransferApprovalNotFoundError(id);
    return this.repo.deleteCampusTransferApproval(schoolId, id);
  }

  async countCampusTransferApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCampusTransferApprovals(schoolId, filters);
  }
}
