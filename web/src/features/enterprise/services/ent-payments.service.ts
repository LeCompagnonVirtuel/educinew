// Enterprise Platform Service - Payments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPaymentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPayment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPaymentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPayments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPayments(schoolId, filters);
  }
  async createPayment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPayment(schoolId, data);
  }
  async updatePayment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPaymentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePayment(schoolId, id, data);
  }
  async deletePayment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPaymentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePayment(schoolId, id);
  }
  async countPayments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPayments(schoolId, filters);
  }
}
