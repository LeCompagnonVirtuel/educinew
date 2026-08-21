// Enterprise Platform Service - PurchaseOrders
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPurchaseOrderService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPurchaseOrder(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPurchaseOrderById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPurchaseOrders(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPurchaseOrders(schoolId, filters);
  }
  async createPurchaseOrder(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPurchaseOrder(schoolId, data);
  }
  async updatePurchaseOrder(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPurchaseOrderById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePurchaseOrder(schoolId, id, data);
  }
  async deletePurchaseOrder(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPurchaseOrderById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePurchaseOrder(schoolId, id);
  }
  async countPurchaseOrders(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPurchaseOrders(schoolId, filters);
  }
}
