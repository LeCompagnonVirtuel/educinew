// Enterprise Platform Service - EnvironmentPromotion
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EnvironmentPromotion, EnvironmentPromotionCreate } from '@educi/types';
import { EntEnvironmentPromotionNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntEnvironmentPromotionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getEnvironmentPromotion(schoolId: string, id: string): Promise<EnvironmentPromotion> {
    const item = await this.repo.findEnvironmentPromotionById(schoolId, id);
    if (!item) throw new EntEnvironmentPromotionNotFoundError(id);
    return item;
  }
  async listEnvironmentPromotions(schoolId: string, filters?: Record<string, unknown>): Promise<EnvironmentPromotion[]> {
    return this.repo.findAllEnvironmentPromotions(schoolId, filters);
  }
  async createEnvironmentPromotion(schoolId: string, data: EnvironmentPromotionCreate): Promise<EnvironmentPromotion> {
    return this.repo.createEnvironmentPromotion(schoolId, data);
  }
  async updateEnvironmentPromotion(schoolId: string, id: string, data: Partial<EnvironmentPromotionCreate>): Promise<EnvironmentPromotion> {
    const existing = await this.repo.findEnvironmentPromotionById(schoolId, id);
    if (!existing) throw new EntEnvironmentPromotionNotFoundError(id);
    return this.repo.updateEnvironmentPromotion(schoolId, id, data);
  }
  async deleteEnvironmentPromotion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEnvironmentPromotionById(schoolId, id);
    if (!existing) throw new EntEnvironmentPromotionNotFoundError(id);
    return this.repo.deleteEnvironmentPromotion(schoolId, id);
  }
  async countEnvironmentPromotions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEnvironmentPromotions(schoolId, filters);
  }
}
