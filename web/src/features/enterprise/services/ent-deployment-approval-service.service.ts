// Enterprise Platform Service - DeploymentApproval
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentApproval, DeploymentApprovalCreate } from '@educi/types';
import { EntDeploymentApprovalNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentApprovalServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentApprovalService(schoolId: string, id: string): Promise<DeploymentApproval> {
    const item = await this.repo.findDeploymentApprovalServiceById(schoolId, id);
    if (!item) throw new EntDeploymentApprovalNotFoundError(id);
    return item;
  }
  async listDeploymentApprovalServices(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentApproval[]> {
    return this.repo.findAllDeploymentApprovalServices(schoolId, filters);
  }
  async createDeploymentApprovalService(schoolId: string, data: DeploymentApprovalCreate): Promise<DeploymentApproval> {
    return this.repo.createDeploymentApprovalService(schoolId, data);
  }
  async updateDeploymentApprovalService(schoolId: string, id: string, data: Partial<DeploymentApprovalCreate>): Promise<DeploymentApproval> {
    const existing = await this.repo.findDeploymentApprovalServiceById(schoolId, id);
    if (!existing) throw new EntDeploymentApprovalNotFoundError(id);
    return this.repo.updateDeploymentApprovalService(schoolId, id, data);
  }
  async deleteDeploymentApprovalService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentApprovalServiceById(schoolId, id);
    if (!existing) throw new EntDeploymentApprovalNotFoundError(id);
    return this.repo.deleteDeploymentApprovalService(schoolId, id);
  }
  async countDeploymentApprovalServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentApprovalServices(schoolId, filters);
  }
}
