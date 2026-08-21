// Enterprise Platform Service - DeploymentsApprovals
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentApprovalService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentsApproval(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDeploymentsApprovalById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDeploymentsApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDeploymentsApprovals(schoolId, filters);
  }
  async createDeploymentsApproval(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDeploymentsApproval(schoolId, data);
  }
  async updateDeploymentsApproval(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDeploymentsApprovalById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDeploymentsApproval(schoolId, id, data);
  }
  async deleteDeploymentsApproval(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentsApprovalById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDeploymentsApproval(schoolId, id);
  }
  async countDeploymentsApprovals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentsApprovals(schoolId, filters);
  }
}
