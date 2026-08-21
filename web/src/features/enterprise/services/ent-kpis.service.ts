// Enterprise Platform Service - Kpis
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntKpiService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getKpi(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findKpiById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listKpis(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllKpis(schoolId, filters);
  }
  async createKpi(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createKpi(schoolId, data);
  }
  async updateKpi(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findKpiById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateKpi(schoolId, id, data);
  }
  async deleteKpi(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findKpiById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteKpi(schoolId, id);
  }
  async countKpis(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countKpis(schoolId, filters);
  }
}
