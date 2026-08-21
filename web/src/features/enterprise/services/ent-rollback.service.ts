// Enterprise Platform Service - Rollback
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Rollback, RollbackCreate } from '@educi/types';
import { EntRollbackNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRollbackService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRollback(schoolId: string, id: string): Promise<Rollback> {
    const item = await this.repo.findRollbackById(schoolId, id);
    if (!item) throw new EntRollbackNotFoundError(id);
    return item;
  }
  async listRollbacks(schoolId: string, filters?: Record<string, unknown>): Promise<Rollback[]> {
    return this.repo.findAllRollbacks(schoolId, filters);
  }
  async createRollback(schoolId: string, data: RollbackCreate): Promise<Rollback> {
    return this.repo.createRollback(schoolId, data);
  }
  async updateRollback(schoolId: string, id: string, data: Partial<RollbackCreate>): Promise<Rollback> {
    const existing = await this.repo.findRollbackById(schoolId, id);
    if (!existing) throw new EntRollbackNotFoundError(id);
    return this.repo.updateRollback(schoolId, id, data);
  }
  async deleteRollback(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRollbackById(schoolId, id);
    if (!existing) throw new EntRollbackNotFoundError(id);
    return this.repo.deleteRollback(schoolId, id);
  }
  async countRollbacks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRollbacks(schoolId, filters);
  }
}
