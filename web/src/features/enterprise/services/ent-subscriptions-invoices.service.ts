// Enterprise Platform Service - SubscriptionsInvoices
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSubscriptionInvoiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSubscriptionsInvoice(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSubscriptionsInvoiceById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSubscriptionsInvoices(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSubscriptionsInvoices(schoolId, filters);
  }
  async createSubscriptionsInvoice(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSubscriptionsInvoice(schoolId, data);
  }
  async updateSubscriptionsInvoice(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSubscriptionsInvoiceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSubscriptionsInvoice(schoolId, id, data);
  }
  async deleteSubscriptionsInvoice(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSubscriptionsInvoiceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSubscriptionsInvoice(schoolId, id);
  }
  async countSubscriptionsInvoices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSubscriptionsInvoices(schoolId, filters);
  }
}
