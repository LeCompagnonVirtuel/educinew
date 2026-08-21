// Enterprise Platform Service - Discounts
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDiscountService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDiscount(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findDiscountById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listDiscounts(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllDiscounts(schoolId, filters);
  }
  async createDiscount(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createDiscount(schoolId, data);
  }
  async updateDiscount(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findDiscountById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateDiscount(schoolId, id, data);
  }
  async deleteDiscount(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDiscountById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteDiscount(schoolId, id);
  }
  async countDiscounts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDiscounts(schoolId, filters);
  }
}
