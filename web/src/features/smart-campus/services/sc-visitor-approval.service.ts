import type { SupabaseClient } from '@supabase/supabase-js';
import type { VisitorApproval, VisitorApprovalCreate } from '@educi/types';
import { ScVisitorApprovalNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVisitorApprovalService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getApproval(schoolId: string, id: string): Promise<VisitorApproval> {
    const approval = await this.repo.findVisitorApprovalById(schoolId, id);
    if (!approval) throw new ScVisitorApprovalNotFoundError(id);
    return approval;
  }

  async listApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<VisitorApproval[]> {
    return this.repo.findAllVisitorApprovals(schoolId, filters);
  }

  async createApproval(schoolId: string, data: VisitorApprovalCreate): Promise<VisitorApproval> {
    return this.repo.createVisitorApproval(schoolId, data);
  }

  async updateApproval(schoolId: string, id: string, data: Partial<VisitorApprovalCreate>): Promise<VisitorApproval> {
    const existing = await this.repo.findVisitorApprovalById(schoolId, id);
    if (!existing) throw new ScVisitorApprovalNotFoundError(id);
    return this.repo.updateVisitorApproval(schoolId, id, data);
  }

  async deleteApproval(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVisitorApprovalById(schoolId, id);
    if (!existing) throw new ScVisitorApprovalNotFoundError(id);
    return this.repo.deleteVisitorApproval(schoolId, id);
  }

  async countApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVisitorApprovals(schoolId, filters);
  }
}
