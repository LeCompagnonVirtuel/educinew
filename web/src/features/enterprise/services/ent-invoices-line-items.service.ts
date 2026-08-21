// Enterprise Platform Service - InvoicesLineItems
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntInvoiceLineItemService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getInvoicesLineItem(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findInvoicesLineItemById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listInvoicesLineItems(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllInvoicesLineItems(schoolId, filters);
  }
  async createInvoicesLineItem(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createInvoicesLineItem(schoolId, data);
  }
  async updateInvoicesLineItem(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findInvoicesLineItemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateInvoicesLineItem(schoolId, id, data);
  }
  async deleteInvoicesLineItem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInvoicesLineItemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteInvoicesLineItem(schoolId, id);
  }
  async countInvoicesLineItems(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInvoicesLineItems(schoolId, filters);
  }
}
