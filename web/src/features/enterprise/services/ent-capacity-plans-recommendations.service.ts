// Enterprise Platform Service - CapacityPlansRecommendations
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCapacityRecommendationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCapacityPlansRecommendation(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCapacityPlansRecommendationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCapacityPlansRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCapacityPlansRecommendations(schoolId, filters);
  }
  async createCapacityPlansRecommendation(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCapacityPlansRecommendation(schoolId, data);
  }
  async updateCapacityPlansRecommendation(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCapacityPlansRecommendationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCapacityPlansRecommendation(schoolId, id, data);
  }
  async deleteCapacityPlansRecommendation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCapacityPlansRecommendationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCapacityPlansRecommendation(schoolId, id);
  }
  async countCapacityPlansRecommendations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCapacityPlansRecommendations(schoolId, filters);
  }
}
