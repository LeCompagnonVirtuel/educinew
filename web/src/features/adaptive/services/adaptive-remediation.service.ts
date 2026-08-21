// Adaptive Learning Service - RemediationPlan
// Phase 3.2 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { RemediationPlan } from '@educi/types';
import { AdaptiveRemediationNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveRemediationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getRemediationPlan(schoolId: string, id: string): Promise<RemediationPlan> {
    const item = await this.repo.getRemediationPlan(schoolId, id);
    if (!item) throw new AdaptiveRemediationNotFoundError(id);
    return item;
  }
  async listRemediationPlans(schoolId: string, filters?: Record<string, unknown>): Promise<RemediationPlan[]> {
    return this.repo.listRemediationPlans(schoolId, filters);
  }
  async createRemediationPlan(schoolId: string, data: Omit<RemediationPlan, 'id' | 'created_at' | 'updated_at'>): Promise<RemediationPlan> {
    return this.repo.createRemediationPlan(schoolId, data);
  }
  async updateRemediationPlan(schoolId: string, id: string, data: Partial<Omit<RemediationPlan, 'id' | 'created_at' | 'updated_at'>>): Promise<RemediationPlan> {
    const existing = await this.repo.getRemediationPlan(schoolId, id);
    if (!existing) throw new AdaptiveRemediationNotFoundError(id);
    return this.repo.updateRemediationPlan(schoolId, id, data);
  }
  async deleteRemediationPlan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRemediationPlan(schoolId, id);
    if (!existing) throw new AdaptiveRemediationNotFoundError(id);
    return this.repo.deleteRemediationPlan(schoolId, id);
  }
}
