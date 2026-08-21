// Enterprise Platform Service - DeploymentsRollbacks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDeploymentRollbackService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDeploymentsRollback(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDeploymentsRollbackById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDeploymentsRollbacks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDeploymentsRollbacks(schoolId, filters);
  }
  async createDeploymentsRollback(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDeploymentsRollback(schoolId, data);
  }
  async updateDeploymentsRollback(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDeploymentsRollbackById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDeploymentsRollback(schoolId, id, data);
  }
  async deleteDeploymentsRollback(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDeploymentsRollbackById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDeploymentsRollback(schoolId, id);
  }
  async countDeploymentsRollbacks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDeploymentsRollbacks(schoolId, filters);
  }
}
