// Enterprise Platform Service - CanaryDeployment
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CanaryDeployment, CanaryDeploymentCreate } from '@educi/types';
import { EntCanaryDeploymentNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCanaryDeploymentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCanaryDeployment(schoolId: string, id: string): Promise<CanaryDeployment> {
    const item = await this.repo.findCanaryDeploymentById(schoolId, id);
    if (!item) throw new EntCanaryDeploymentNotFoundError(id);
    return item;
  }
  async listCanaryDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<CanaryDeployment[]> {
    return this.repo.findAllCanaryDeployments(schoolId, filters);
  }
  async createCanaryDeployment(schoolId: string, data: CanaryDeploymentCreate): Promise<CanaryDeployment> {
    return this.repo.createCanaryDeployment(schoolId, data);
  }
  async updateCanaryDeployment(schoolId: string, id: string, data: Partial<CanaryDeploymentCreate>): Promise<CanaryDeployment> {
    const existing = await this.repo.findCanaryDeploymentById(schoolId, id);
    if (!existing) throw new EntCanaryDeploymentNotFoundError(id);
    return this.repo.updateCanaryDeployment(schoolId, id, data);
  }
  async deleteCanaryDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCanaryDeploymentById(schoolId, id);
    if (!existing) throw new EntCanaryDeploymentNotFoundError(id);
    return this.repo.deleteCanaryDeployment(schoolId, id);
  }
  async countCanaryDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCanaryDeployments(schoolId, filters);
  }
}
