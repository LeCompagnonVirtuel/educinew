// Enterprise Platform Service - ConfigDeployment
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ConfigDeployment, ConfigDeploymentCreate } from '@educi/types';
import { EntConfigDeploymentNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntConfigDeploymentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getConfigDeployment(schoolId: string, id: string): Promise<ConfigDeployment> {
    const item = await this.repo.findConfigDeploymentById(schoolId, id);
    if (!item) throw new EntConfigDeploymentNotFoundError(id);
    return item;
  }
  async listConfigDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<ConfigDeployment[]> {
    return this.repo.findAllConfigDeployments(schoolId, filters);
  }
  async createConfigDeployment(schoolId: string, data: ConfigDeploymentCreate): Promise<ConfigDeployment> {
    return this.repo.createConfigDeployment(schoolId, data);
  }
  async updateConfigDeployment(schoolId: string, id: string, data: Partial<ConfigDeploymentCreate>): Promise<ConfigDeployment> {
    const existing = await this.repo.findConfigDeploymentById(schoolId, id);
    if (!existing) throw new EntConfigDeploymentNotFoundError(id);
    return this.repo.updateConfigDeployment(schoolId, id, data);
  }
  async deleteConfigDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findConfigDeploymentById(schoolId, id);
    if (!existing) throw new EntConfigDeploymentNotFoundError(id);
    return this.repo.deleteConfigDeployment(schoolId, id);
  }
  async countConfigDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countConfigDeployments(schoolId, filters);
  }
}
