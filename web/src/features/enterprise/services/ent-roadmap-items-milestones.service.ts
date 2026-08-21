// Enterprise Platform Service - RoadmapItemsMilestones
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRoadmapMilestoneService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRoadmapItemsMilestone(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRoadmapItemsMilestoneById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRoadmapItemsMilestones(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRoadmapItemsMilestones(schoolId, filters);
  }
  async createRoadmapItemsMilestone(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRoadmapItemsMilestone(schoolId, data);
  }
  async updateRoadmapItemsMilestone(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRoadmapItemsMilestoneById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRoadmapItemsMilestone(schoolId, id, data);
  }
  async deleteRoadmapItemsMilestone(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoadmapItemsMilestoneById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRoadmapItemsMilestone(schoolId, id);
  }
  async countRoadmapItemsMilestones(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRoadmapItemsMilestones(schoolId, filters);
  }
}
