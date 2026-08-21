// Enterprise Platform Service - FeatureDeployment
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FeatureDeployment, FeatureDeploymentCreate } from '@educi/types';
import { EntFeatureDeploymentNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFeatureDeploymentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFeatureDeployment(schoolId: string, id: string): Promise<FeatureDeployment> {
    const item = await this.repo.findFeatureDeploymentById(schoolId, id);
    if (!item) throw new EntFeatureDeploymentNotFoundError(id);
    return item;
  }
  async listFeatureDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<FeatureDeployment[]> {
    return this.repo.findAllFeatureDeployments(schoolId, filters);
  }
  async createFeatureDeployment(schoolId: string, data: FeatureDeploymentCreate): Promise<FeatureDeployment> {
    return this.repo.createFeatureDeployment(schoolId, data);
  }
  async updateFeatureDeployment(schoolId: string, id: string, data: Partial<FeatureDeploymentCreate>): Promise<FeatureDeployment> {
    const existing = await this.repo.findFeatureDeploymentById(schoolId, id);
    if (!existing) throw new EntFeatureDeploymentNotFoundError(id);
    return this.repo.updateFeatureDeployment(schoolId, id, data);
  }
  async deleteFeatureDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFeatureDeploymentById(schoolId, id);
    if (!existing) throw new EntFeatureDeploymentNotFoundError(id);
    return this.repo.deleteFeatureDeployment(schoolId, id);
  }
  async countFeatureDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFeatureDeployments(schoolId, filters);
  }
}
