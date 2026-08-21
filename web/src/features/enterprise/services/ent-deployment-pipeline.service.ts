// Enterprise Platform Service - DeploymentPipeline
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentPipeline, DeploymentPipelineCreate } from '@educi/types';
import { EntDeploymentPipelineNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentPipelineService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentPipeline(schoolId: string, id: string): Promise<DeploymentPipeline> {
    const item = await this.repo.findDeploymentPipelineById(schoolId, id);
    if (!item) throw new EntDeploymentPipelineNotFoundError(id);
    return item;
  }
  async listDeploymentPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentPipeline[]> {
    return this.repo.findAllDeploymentPipelines(schoolId, filters);
  }
  async createDeploymentPipeline(schoolId: string, data: DeploymentPipelineCreate): Promise<DeploymentPipeline> {
    return this.repo.createDeploymentPipeline(schoolId, data);
  }
  async updateDeploymentPipeline(schoolId: string, id: string, data: Partial<DeploymentPipelineCreate>): Promise<DeploymentPipeline> {
    const existing = await this.repo.findDeploymentPipelineById(schoolId, id);
    if (!existing) throw new EntDeploymentPipelineNotFoundError(id);
    return this.repo.updateDeploymentPipeline(schoolId, id, data);
  }
  async deleteDeploymentPipeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentPipelineById(schoolId, id);
    if (!existing) throw new EntDeploymentPipelineNotFoundError(id);
    return this.repo.deleteDeploymentPipeline(schoolId, id);
  }
  async countDeploymentPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentPipelines(schoolId, filters);
  }
}
