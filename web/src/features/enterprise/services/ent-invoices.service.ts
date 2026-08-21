// Enterprise Platform Service - Invoices
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntInvoiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getInvoice(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findInvoiceById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listInvoices(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllInvoices(schoolId, filters);
  }
  async createInvoice(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createInvoice(schoolId, data);
  }
  async updateInvoice(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findInvoiceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateInvoice(schoolId, id, data);
  }
  async deleteInvoice(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInvoiceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteInvoice(schoolId, id);
  }
  async countInvoices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInvoices(schoolId, filters);
  }
}
