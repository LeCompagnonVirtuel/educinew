// Enterprise Platform Service - Procurement
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProcurementService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProcurement(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findProcurementById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listProcurement(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllProcurement(schoolId, filters);
  }
  async createProcurement(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createProcurement(schoolId, data);
  }
  async updateProcurement(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findProcurementById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateProcurement(schoolId, id, data);
  }
  async deleteProcurement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProcurementById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteProcurement(schoolId, id);
  }
  async countProcurement(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProcurement(schoolId, filters);
  }
}
