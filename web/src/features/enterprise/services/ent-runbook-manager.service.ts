// Enterprise Platform Service - RunbookManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RunbookManager, RunbookManagerCreate } from '@educi/types';
import { EntRunbookManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRunbookManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRunbookManager(schoolId: string, id: string): Promise<RunbookManager> {
    const item = await this.repo.findRunbookManagerById(schoolId, id);
    if (!item) throw new EntRunbookManagerNotFoundError(id);
    return item;
  }
  async listRunbookManagers(schoolId: string, filters?: Record<string, unknown>): Promise<RunbookManager[]> {
    return this.repo.findAllRunbookManagers(schoolId, filters);
  }
  async createRunbookManager(schoolId: string, data: RunbookManagerCreate): Promise<RunbookManager> {
    return this.repo.createRunbookManager(schoolId, data);
  }
  async updateRunbookManager(schoolId: string, id: string, data: Partial<RunbookManagerCreate>): Promise<RunbookManager> {
    const existing = await this.repo.findRunbookManagerById(schoolId, id);
    if (!existing) throw new EntRunbookManagerNotFoundError(id);
    return this.repo.updateRunbookManager(schoolId, id, data);
  }
  async deleteRunbookManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRunbookManagerById(schoolId, id);
    if (!existing) throw new EntRunbookManagerNotFoundError(id);
    return this.repo.deleteRunbookManager(schoolId, id);
  }
  async countRunbookManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRunbookManagers(schoolId, filters);
  }
}
