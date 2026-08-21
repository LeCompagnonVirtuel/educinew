// Enterprise Platform Service - Deployments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeployment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDeploymentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDeployments(schoolId, filters);
  }
  async createDeployment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDeployment(schoolId, data);
  }
  async updateDeployment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDeploymentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDeployment(schoolId, id, data);
  }
  async deleteDeployment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDeployment(schoolId, id);
  }
  async countDeployments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeployments(schoolId, filters);
  }
}
