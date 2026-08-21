// Enterprise Platform Service - RecoveryAttempt
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RecoveryAttempt, RecoveryAttemptCreate } from '@educi/types';
import { EntRecoveryAttemptNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRecoveryAttemptService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRecoveryAttempt(schoolId: string, id: string): Promise<RecoveryAttempt> {
    const item = await this.repo.findRecoveryAttemptById(schoolId, id);
    if (!item) throw new EntRecoveryAttemptNotFoundError(id);
    return item;
  }
  async listRecoveryAttempts(schoolId: string, filters?: Record<string, unknown>): Promise<RecoveryAttempt[]> {
    return this.repo.findAllRecoveryAttempts(schoolId, filters);
  }
  async createRecoveryAttempt(schoolId: string, data: RecoveryAttemptCreate): Promise<RecoveryAttempt> {
    return this.repo.createRecoveryAttempt(schoolId, data);
  }
  async updateRecoveryAttempt(schoolId: string, id: string, data: Partial<RecoveryAttemptCreate>): Promise<RecoveryAttempt> {
    const existing = await this.repo.findRecoveryAttemptById(schoolId, id);
    if (!existing) throw new EntRecoveryAttemptNotFoundError(id);
    return this.repo.updateRecoveryAttempt(schoolId, id, data);
  }
  async deleteRecoveryAttempt(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRecoveryAttemptById(schoolId, id);
    if (!existing) throw new EntRecoveryAttemptNotFoundError(id);
    return this.repo.deleteRecoveryAttempt(schoolId, id);
  }
  async countRecoveryAttempts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRecoveryAttempts(schoolId, filters);
  }
}
