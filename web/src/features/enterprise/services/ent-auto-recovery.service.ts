// Enterprise Platform Service - AutoRecovery
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutoRecovery, AutoRecoveryCreate } from '@educi/types';
import { EntAutoRecoveryNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntAutoRecoveryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getAutoRecovery(schoolId: string, id: string): Promise<AutoRecovery> {
    const item = await this.repo.findAutoRecoveryById(schoolId, id);
    if (!item) throw new EntAutoRecoveryNotFoundError(id);
    return item;
  }
  async listAutoRecoverys(schoolId: string, filters?: Record<string, unknown>): Promise<AutoRecovery[]> {
    return this.repo.findAllAutoRecoverys(schoolId, filters);
  }
  async createAutoRecovery(schoolId: string, data: AutoRecoveryCreate): Promise<AutoRecovery> {
    return this.repo.createAutoRecovery(schoolId, data);
  }
  async updateAutoRecovery(schoolId: string, id: string, data: Partial<AutoRecoveryCreate>): Promise<AutoRecovery> {
    const existing = await this.repo.findAutoRecoveryById(schoolId, id);
    if (!existing) throw new EntAutoRecoveryNotFoundError(id);
    return this.repo.updateAutoRecovery(schoolId, id, data);
  }
  async deleteAutoRecovery(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAutoRecoveryById(schoolId, id);
    if (!existing) throw new EntAutoRecoveryNotFoundError(id);
    return this.repo.deleteAutoRecovery(schoolId, id);
  }
  async countAutoRecoverys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAutoRecoverys(schoolId, filters);
  }
}
