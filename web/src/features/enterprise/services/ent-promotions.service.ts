// Enterprise Platform Service - Promotions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPromotionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPromotion(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPromotionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPromotions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPromotions(schoolId, filters);
  }
  async createPromotion(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPromotion(schoolId, data);
  }
  async updatePromotion(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPromotionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePromotion(schoolId, id, data);
  }
  async deletePromotion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPromotionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePromotion(schoolId, id);
  }
  async countPromotions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPromotions(schoolId, filters);
  }
}
