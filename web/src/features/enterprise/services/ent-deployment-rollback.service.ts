// Enterprise Platform Service - DeploymentRollback
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentRollback, DeploymentRollbackCreate } from '@educi/types';
import { EntDeploymentRollbackNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentRollbackService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentRollback(schoolId: string, id: string): Promise<DeploymentRollback> {
    const item = await this.repo.findDeploymentRollbackById(schoolId, id);
    if (!item) throw new EntDeploymentRollbackNotFoundError(id);
    return item;
  }
  async listDeploymentRollbacks(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentRollback[]> {
    return this.repo.findAllDeploymentRollbacks(schoolId, filters);
  }
  async createDeploymentRollback(schoolId: string, data: DeploymentRollbackCreate): Promise<DeploymentRollback> {
    return this.repo.createDeploymentRollback(schoolId, data);
  }
  async updateDeploymentRollback(schoolId: string, id: string, data: Partial<DeploymentRollbackCreate>): Promise<DeploymentRollback> {
    const existing = await this.repo.findDeploymentRollbackById(schoolId, id);
    if (!existing) throw new EntDeploymentRollbackNotFoundError(id);
    return this.repo.updateDeploymentRollback(schoolId, id, data);
  }
  async deleteDeploymentRollback(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentRollbackById(schoolId, id);
    if (!existing) throw new EntDeploymentRollbackNotFoundError(id);
    return this.repo.deleteDeploymentRollback(schoolId, id);
  }
  async countDeploymentRollbacks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentRollbacks(schoolId, filters);
  }
}
