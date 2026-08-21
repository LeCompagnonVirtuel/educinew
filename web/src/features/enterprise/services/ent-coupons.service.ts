// Enterprise Platform Service - Coupons
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCouponService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCoupon(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCouponById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCoupons(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCoupons(schoolId, filters);
  }
  async createCoupon(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCoupon(schoolId, data);
  }
  async updateCoupon(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCouponById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCoupon(schoolId, id, data);
  }
  async deleteCoupon(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCouponById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCoupon(schoolId, id);
  }
  async countCoupons(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCoupons(schoolId, filters);
  }
}
