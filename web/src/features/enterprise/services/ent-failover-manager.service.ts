// Enterprise Platform Service - FailoverManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { FailoverManager, FailoverManagerCreate } from '@educi/types';
import { EntFailoverManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntFailoverManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getFailoverManager(schoolId: string, id: string): Promise<FailoverManager> {
    const item = await this.repo.findFailoverManagerById(schoolId, id);
    if (!item) throw new EntFailoverManagerNotFoundError(id);
    return item;
  }
  async listFailoverManagers(schoolId: string, filters?: Record<string, unknown>): Promise<FailoverManager[]> {
    return this.repo.findAllFailoverManagers(schoolId, filters);
  }
  async createFailoverManager(schoolId: string, data: FailoverManagerCreate): Promise<FailoverManager> {
    return this.repo.createFailoverManager(schoolId, data);
  }
  async updateFailoverManager(schoolId: string, id: string, data: Partial<FailoverManagerCreate>): Promise<FailoverManager> {
    const existing = await this.repo.findFailoverManagerById(schoolId, id);
    if (!existing) throw new EntFailoverManagerNotFoundError(id);
    return this.repo.updateFailoverManager(schoolId, id, data);
  }
  async deleteFailoverManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFailoverManagerById(schoolId, id);
    if (!existing) throw new EntFailoverManagerNotFoundError(id);
    return this.repo.deleteFailoverManager(schoolId, id);
  }
  async countFailoverManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFailoverManagers(schoolId, filters);
  }
}
