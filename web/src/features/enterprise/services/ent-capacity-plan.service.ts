// Enterprise Platform Service - CapacityPlan
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CapacityPlan, CapacityPlanCreate } from '@educi/types';
import { EntCapacityPlanNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCapacityPlanService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCapacityPlan(schoolId: string, id: string): Promise<CapacityPlan> {
    const item = await this.repo.findCapacityPlanById(schoolId, id);
    if (!item) throw new EntCapacityPlanNotFoundError(id);
    return item;
  }
  async listCapacityPlans(schoolId: string, filters?: Record<string, unknown>): Promise<CapacityPlan[]> {
    return this.repo.findAllCapacityPlans(schoolId, filters);
  }
  async createCapacityPlan(schoolId: string, data: CapacityPlanCreate): Promise<CapacityPlan> {
    return this.repo.createCapacityPlan(schoolId, data);
  }
  async updateCapacityPlan(schoolId: string, id: string, data: Partial<CapacityPlanCreate>): Promise<CapacityPlan> {
    const existing = await this.repo.findCapacityPlanById(schoolId, id);
    if (!existing) throw new EntCapacityPlanNotFoundError(id);
    return this.repo.updateCapacityPlan(schoolId, id, data);
  }
  async deleteCapacityPlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCapacityPlanById(schoolId, id);
    if (!existing) throw new EntCapacityPlanNotFoundError(id);
    return this.repo.deleteCapacityPlan(schoolId, id);
  }
  async countCapacityPlans(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCapacityPlans(schoolId, filters);
  }
}
