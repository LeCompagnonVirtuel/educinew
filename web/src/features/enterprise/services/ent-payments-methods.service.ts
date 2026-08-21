// Enterprise Platform Service - PaymentsMethods
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPaymentMethodService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPaymentsMethod(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPaymentsMethodById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPaymentsMethods(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPaymentsMethods(schoolId, filters);
  }
  async createPaymentsMethod(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPaymentsMethod(schoolId, data);
  }
  async updatePaymentsMethod(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPaymentsMethodById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePaymentsMethod(schoolId, id, data);
  }
  async deletePaymentsMethod(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPaymentsMethodById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePaymentsMethod(schoolId, id);
  }
  async countPaymentsMethods(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPaymentsMethods(schoolId, filters);
  }
}
