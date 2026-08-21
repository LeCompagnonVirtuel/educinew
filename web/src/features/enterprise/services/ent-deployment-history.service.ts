// Enterprise Platform Service - DeploymentHistory
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentHistory, DeploymentHistoryCreate } from '@educi/types';
import { EntDeploymentHistoryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentHistoryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentHistory(schoolId: string, id: string): Promise<DeploymentHistory> {
    const item = await this.repo.findDeploymentHistoryById(schoolId, id);
    if (!item) throw new EntDeploymentHistoryNotFoundError(id);
    return item;
  }
  async listDeploymentHistorys(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentHistory[]> {
    return this.repo.findAllDeploymentHistorys(schoolId, filters);
  }
  async createDeploymentHistory(schoolId: string, data: DeploymentHistoryCreate): Promise<DeploymentHistory> {
    return this.repo.createDeploymentHistory(schoolId, data);
  }
  async updateDeploymentHistory(schoolId: string, id: string, data: Partial<DeploymentHistoryCreate>): Promise<DeploymentHistory> {
    const existing = await this.repo.findDeploymentHistoryById(schoolId, id);
    if (!existing) throw new EntDeploymentHistoryNotFoundError(id);
    return this.repo.updateDeploymentHistory(schoolId, id, data);
  }
  async deleteDeploymentHistory(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentHistoryById(schoolId, id);
    if (!existing) throw new EntDeploymentHistoryNotFoundError(id);
    return this.repo.deleteDeploymentHistory(schoolId, id);
  }
  async countDeploymentHistorys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentHistorys(schoolId, filters);
  }
}
