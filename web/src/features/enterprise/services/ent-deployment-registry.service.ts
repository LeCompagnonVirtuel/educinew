// Enterprise Platform Service - DeploymentRegistry
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DeploymentRegistry, DeploymentRegistryCreate } from '@educi/types';
import { EntDeploymentRegistryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentRegistryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentRegistry(schoolId: string, id: string): Promise<DeploymentRegistry> {
    const item = await this.repo.findDeploymentRegistryById(schoolId, id);
    if (!item) throw new EntDeploymentRegistryNotFoundError(id);
    return item;
  }
  async listDeploymentRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<DeploymentRegistry[]> {
    return this.repo.findAllDeploymentRegistrys(schoolId, filters);
  }
  async createDeploymentRegistry(schoolId: string, data: DeploymentRegistryCreate): Promise<DeploymentRegistry> {
    return this.repo.createDeploymentRegistry(schoolId, data);
  }
  async updateDeploymentRegistry(schoolId: string, id: string, data: Partial<DeploymentRegistryCreate>): Promise<DeploymentRegistry> {
    const existing = await this.repo.findDeploymentRegistryById(schoolId, id);
    if (!existing) throw new EntDeploymentRegistryNotFoundError(id);
    return this.repo.updateDeploymentRegistry(schoolId, id, data);
  }
  async deleteDeploymentRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentRegistryById(schoolId, id);
    if (!existing) throw new EntDeploymentRegistryNotFoundError(id);
    return this.repo.deleteDeploymentRegistry(schoolId, id);
  }
  async countDeploymentRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentRegistrys(schoolId, filters);
  }
}
