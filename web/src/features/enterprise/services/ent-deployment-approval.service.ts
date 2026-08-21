// Enterprise Platform Service - DeploymentApproval
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentApproval, DeploymentApprovalCreate } from '@educi/types';
import { EntDeploymentApprovalNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentApprovalService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentApproval(schoolId: string, id: string): Promise<DeploymentApproval> {
    const item = await this.repo.findDeploymentApprovalById(schoolId, id);
    if (!item) throw new EntDeploymentApprovalNotFoundError(id);
    return item;
  }
  async listDeploymentApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentApproval[]> {
    return this.repo.findAllDeploymentApprovals(schoolId, filters);
  }
  async createDeploymentApproval(schoolId: string, data: DeploymentApprovalCreate): Promise<DeploymentApproval> {
    return this.repo.createDeploymentApproval(schoolId, data);
  }
  async updateDeploymentApproval(schoolId: string, id: string, data: Partial<DeploymentApprovalCreate>): Promise<DeploymentApproval> {
    const existing = await this.repo.findDeploymentApprovalById(schoolId, id);
    if (!existing) throw new EntDeploymentApprovalNotFoundError(id);
    return this.repo.updateDeploymentApproval(schoolId, id, data);
  }
  async deleteDeploymentApproval(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentApprovalById(schoolId, id);
    if (!existing) throw new EntDeploymentApprovalNotFoundError(id);
    return this.repo.deleteDeploymentApproval(schoolId, id);
  }
  async countDeploymentApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentApprovals(schoolId, filters);
  }
}
