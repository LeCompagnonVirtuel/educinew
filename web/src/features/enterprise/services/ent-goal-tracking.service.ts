// Enterprise Platform Service - GoalTracking
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntGoalTrackingService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getGoalTracking(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findGoalTrackingById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listGoalTracking(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllGoalTracking(schoolId, filters);
  }
  async createGoalTracking(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createGoalTracking(schoolId, data);
  }
  async updateGoalTracking(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findGoalTrackingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateGoalTracking(schoolId, id, data);
  }
  async deleteGoalTracking(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGoalTrackingById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteGoalTracking(schoolId, id);
  }
  async countGoalTracking(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGoalTracking(schoolId, filters);
  }
}
