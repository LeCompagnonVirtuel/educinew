// Enterprise Platform Service - RoadmapItemsDependencies
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntRoadmapDependencyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getRoadmapItemsDependencie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findRoadmapItemsDependencieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listRoadmapItemsDependencies(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllRoadmapItemsDependencies(schoolId, filters);
  }
  async createRoadmapItemsDependencie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createRoadmapItemsDependencie(schoolId, data);
  }
  async updateRoadmapItemsDependencie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findRoadmapItemsDependencieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateRoadmapItemsDependencie(schoolId, id, data);
  }
  async deleteRoadmapItemsDependencie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRoadmapItemsDependencieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteRoadmapItemsDependencie(schoolId, id);
  }
  async countRoadmapItemsDependencies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countRoadmapItemsDependencies(schoolId, filters);
  }
}
