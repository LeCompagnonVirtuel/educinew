// Enterprise Platform Service - InvoicesPayments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntInvoicePaymentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getInvoicesPayment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findInvoicesPaymentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listInvoicesPayments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllInvoicesPayments(schoolId, filters);
  }
  async createInvoicesPayment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createInvoicesPayment(schoolId, data);
  }
  async updateInvoicesPayment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findInvoicesPaymentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateInvoicesPayment(schoolId, id, data);
  }
  async deleteInvoicesPayment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInvoicesPaymentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteInvoicesPayment(schoolId, id);
  }
  async countInvoicesPayments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInvoicesPayments(schoolId, filters);
  }
}
