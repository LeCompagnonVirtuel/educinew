// Enterprise Platform Service - DisasterRecoveryPlan
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DisasterRecoveryPlan, DisasterRecoveryPlanCreate } from '@educi/types';
import { EntDisasterRecoveryPlanNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDisasterRecoveryPlanService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDisasterRecoveryPlan(schoolId: string, id: string): Promise<DisasterRecoveryPlan> {
    const item = await this.repo.findDisasterRecoveryPlanById(schoolId, id);
    if (!item) throw new EntDisasterRecoveryPlanNotFoundError(id);
    return item;
  }
  async listDisasterRecoveryPlans(schoolId: string, filters?: Record<string, unknown>): Promise<DisasterRecoveryPlan[]> {
    return this.repo.findAllDisasterRecoveryPlans(schoolId, filters);
  }
  async createDisasterRecoveryPlan(schoolId: string, data: DisasterRecoveryPlanCreate): Promise<DisasterRecoveryPlan> {
    return this.repo.createDisasterRecoveryPlan(schoolId, data);
  }
  async updateDisasterRecoveryPlan(schoolId: string, id: string, data: Partial<DisasterRecoveryPlanCreate>): Promise<DisasterRecoveryPlan> {
    const existing = await this.repo.findDisasterRecoveryPlanById(schoolId, id);
    if (!existing) throw new EntDisasterRecoveryPlanNotFoundError(id);
    return this.repo.updateDisasterRecoveryPlan(schoolId, id, data);
  }
  async deleteDisasterRecoveryPlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDisasterRecoveryPlanById(schoolId, id);
    if (!existing) throw new EntDisasterRecoveryPlanNotFoundError(id);
    return this.repo.deleteDisasterRecoveryPlan(schoolId, id);
  }
  async countDisasterRecoveryPlans(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDisasterRecoveryPlans(schoolId, filters);
  }
}
