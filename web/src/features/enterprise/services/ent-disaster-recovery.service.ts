// Enterprise Platform Service - DisasterRecovery
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DisasterRecovery, DisasterRecoveryCreate } from '@educi/types';
import { EntDisasterRecoveryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDisasterRecoveryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDisasterRecovery(schoolId: string, id: string): Promise<DisasterRecovery> {
    const item = await this.repo.findDisasterRecoveryById(schoolId, id);
    if (!item) throw new EntDisasterRecoveryNotFoundError(id);
    return item;
  }
  async listDisasterRecoverys(schoolId: string, filters?: Record<string, unknown>): Promise<DisasterRecovery[]> {
    return this.repo.findAllDisasterRecoverys(schoolId, filters);
  }
  async createDisasterRecovery(schoolId: string, data: DisasterRecoveryCreate): Promise<DisasterRecovery> {
    return this.repo.createDisasterRecovery(schoolId, data);
  }
  async updateDisasterRecovery(schoolId: string, id: string, data: Partial<DisasterRecoveryCreate>): Promise<DisasterRecovery> {
    const existing = await this.repo.findDisasterRecoveryById(schoolId, id);
    if (!existing) throw new EntDisasterRecoveryNotFoundError(id);
    return this.repo.updateDisasterRecovery(schoolId, id, data);
  }
  async deleteDisasterRecovery(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDisasterRecoveryById(schoolId, id);
    if (!existing) throw new EntDisasterRecoveryNotFoundError(id);
    return this.repo.deleteDisasterRecovery(schoolId, id);
  }
  async countDisasterRecoverys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDisasterRecoverys(schoolId, filters);
  }
}
