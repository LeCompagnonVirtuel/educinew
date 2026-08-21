// Enterprise Platform Service - PaymentsRefunds
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPaymentRefundService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPaymentsRefund(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPaymentsRefundById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPaymentsRefunds(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPaymentsRefunds(schoolId, filters);
  }
  async createPaymentsRefund(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPaymentsRefund(schoolId, data);
  }
  async updatePaymentsRefund(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPaymentsRefundById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePaymentsRefund(schoolId, id, data);
  }
  async deletePaymentsRefund(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPaymentsRefundById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePaymentsRefund(schoolId, id);
  }
  async countPaymentsRefunds(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPaymentsRefunds(schoolId, filters);
  }
}
