// Enterprise Platform Service - ProcurementItems
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProcurementItemService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProcurementItem(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findProcurementItemById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listProcurementItems(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllProcurementItems(schoolId, filters);
  }
  async createProcurementItem(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createProcurementItem(schoolId, data);
  }
  async updateProcurementItem(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findProcurementItemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateProcurementItem(schoolId, id, data);
  }
  async deleteProcurementItem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProcurementItemById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteProcurementItem(schoolId, id);
  }
  async countProcurementItems(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProcurementItems(schoolId, filters);
  }
}
