// Enterprise Platform Service - CapacityPlans
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCapacityPlanService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCapacityPlan(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCapacityPlanById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCapacityPlans(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCapacityPlans(schoolId, filters);
  }
  async createCapacityPlan(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCapacityPlan(schoolId, data);
  }
  async updateCapacityPlan(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCapacityPlanById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCapacityPlan(schoolId, id, data);
  }
  async deleteCapacityPlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCapacityPlanById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCapacityPlan(schoolId, id);
  }
  async countCapacityPlans(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCapacityPlans(schoolId, filters);
  }
}
