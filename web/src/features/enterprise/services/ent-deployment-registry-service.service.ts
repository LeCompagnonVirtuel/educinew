// Enterprise Platform Service - DeploymentRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentRegistry, DeploymentRegistryCreate } from '@educi/types';
import { EntDeploymentRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentRegistryServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentRegistryService(schoolId: string, id: string): Promise<DeploymentRegistry> {
    const item = await this.repo.findDeploymentRegistryServiceById(schoolId, id);
    if (!item) throw new EntDeploymentRegistryNotFoundError(id);
    return item;
  }
  async listDeploymentRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentRegistry[]> {
    return this.repo.findAllDeploymentRegistryServices(schoolId, filters);
  }
  async createDeploymentRegistryService(schoolId: string, data: DeploymentRegistryCreate): Promise<DeploymentRegistry> {
    return this.repo.createDeploymentRegistryService(schoolId, data);
  }
  async updateDeploymentRegistryService(schoolId: string, id: string, data: Partial<DeploymentRegistryCreate>): Promise<DeploymentRegistry> {
    const existing = await this.repo.findDeploymentRegistryServiceById(schoolId, id);
    if (!existing) throw new EntDeploymentRegistryNotFoundError(id);
    return this.repo.updateDeploymentRegistryService(schoolId, id, data);
  }
  async deleteDeploymentRegistryService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentRegistryServiceById(schoolId, id);
    if (!existing) throw new EntDeploymentRegistryNotFoundError(id);
    return this.repo.deleteDeploymentRegistryService(schoolId, id);
  }
  async countDeploymentRegistryServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentRegistryServices(schoolId, filters);
  }
}
