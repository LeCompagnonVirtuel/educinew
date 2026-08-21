// Enterprise Platform Service - RoadmapItems
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRoadmapItemService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRoadmapItem(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRoadmapItemById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRoadmapItems(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRoadmapItems(schoolId, filters);
  }
  async createRoadmapItem(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRoadmapItem(schoolId, data);
  }
  async updateRoadmapItem(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRoadmapItemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRoadmapItem(schoolId, id, data);
  }
  async deleteRoadmapItem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoadmapItemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRoadmapItem(schoolId, id);
  }
  async countRoadmapItems(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRoadmapItems(schoolId, filters);
  }
}
