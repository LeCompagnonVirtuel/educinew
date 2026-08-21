// Enterprise Platform Service - SLOTracker
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SLOTracker, SLOTrackerCreate } from '@educi/types';
import { EntSLOTrackerNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSLOTrackerService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSLOTracker(schoolId: string, id: string): Promise<SLOTracker> {
    const item = await this.repo.findSLOTrackerById(schoolId, id);
    if (!item) throw new EntSLOTrackerNotFoundError(id);
    return item;
  }
  async listSLOTrackers(schoolId: string, filters?: Record<string, unknown>): Promise<SLOTracker[]> {
    return this.repo.findAllSLOTrackers(schoolId, filters);
  }
  async createSLOTracker(schoolId: string, data: SLOTrackerCreate): Promise<SLOTracker> {
    return this.repo.createSLOTracker(schoolId, data);
  }
  async updateSLOTracker(schoolId: string, id: string, data: Partial<SLOTrackerCreate>): Promise<SLOTracker> {
    const existing = await this.repo.findSLOTrackerById(schoolId, id);
    if (!existing) throw new EntSLOTrackerNotFoundError(id);
    return this.repo.updateSLOTracker(schoolId, id, data);
  }
  async deleteSLOTracker(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSLOTrackerById(schoolId, id);
    if (!existing) throw new EntSLOTrackerNotFoundError(id);
    return this.repo.deleteSLOTracker(schoolId, id);
  }
  async countSLOTrackers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSLOTrackers(schoolId, filters);
  }
}
