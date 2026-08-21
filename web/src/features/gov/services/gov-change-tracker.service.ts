// Government & National Governance Service - ChangeTracker
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ChangeTracker, ChangeTrackerCreate } from '@educi/types';
import { GovChangeTrackerNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovChangeTrackerService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getChangeTracker(schoolId: string, id: string): Promise<ChangeTracker> {
    const item = await this.repo.findChangeTrackerById(schoolId, id);
    if (!item) throw new GovChangeTrackerNotFoundError(id);
    return item;
  }

  async listChangeTrackers(schoolId: string, filters?: Record<string, unknown>): Promise<ChangeTracker[]> {
    return this.repo.findAllChangeTrackers(schoolId, filters);
  }

  async createChangeTracker(schoolId: string, data: ChangeTrackerCreate): Promise<ChangeTracker> {
    return this.repo.createChangeTracker(schoolId, data);
  }

  async updateChangeTracker(schoolId: string, id: string, data: Partial<ChangeTrackerCreate>): Promise<ChangeTracker> {
    const existing = await this.repo.findChangeTrackerById(schoolId, id);
    if (!existing) throw new GovChangeTrackerNotFoundError(id);
    return this.repo.updateChangeTracker(schoolId, id, data);
  }

  async deleteChangeTracker(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findChangeTrackerById(schoolId, id);
    if (!existing) throw new GovChangeTrackerNotFoundError(id);
    return this.repo.deleteChangeTracker(schoolId, id);
  }

  async countChangeTrackers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countChangeTrackers(schoolId, filters);
  }
}
