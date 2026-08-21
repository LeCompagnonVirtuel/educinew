// Enterprise Platform Service - ReleaseManager
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReleaseManager, ReleaseManagerCreate } from '@educi/types';
import { EntReleaseManagerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntReleaseManagerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getReleaseManager(schoolId: string, id: string): Promise<ReleaseManager> {
    const item = await this.repo.findReleaseManagerById(schoolId, id);
    if (!item) throw new EntReleaseManagerNotFoundError(id);
    return item;
  }
  async listReleaseManagers(schoolId: string, filters?: Record<string, unknown>): Promise<ReleaseManager[]> {
    return this.repo.findAllReleaseManagers(schoolId, filters);
  }
  async createReleaseManager(schoolId: string, data: ReleaseManagerCreate): Promise<ReleaseManager> {
    return this.repo.createReleaseManager(schoolId, data);
  }
  async updateReleaseManager(schoolId: string, id: string, data: Partial<ReleaseManagerCreate>): Promise<ReleaseManager> {
    const existing = await this.repo.findReleaseManagerById(schoolId, id);
    if (!existing) throw new EntReleaseManagerNotFoundError(id);
    return this.repo.updateReleaseManager(schoolId, id, data);
  }
  async deleteReleaseManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findReleaseManagerById(schoolId, id);
    if (!existing) throw new EntReleaseManagerNotFoundError(id);
    return this.repo.deleteReleaseManager(schoolId, id);
  }
  async countReleaseManagers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countReleaseManagers(schoolId, filters);
  }
}
