// Enterprise Platform Service - KpisTargets
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntKpiTargetService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getKpisTarget(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findKpisTargetById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listKpisTargets(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllKpisTargets(schoolId, filters);
  }
  async createKpisTarget(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createKpisTarget(schoolId, data);
  }
  async updateKpisTarget(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findKpisTargetById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateKpisTarget(schoolId, id, data);
  }
  async deleteKpisTarget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findKpisTargetById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteKpisTarget(schoolId, id);
  }
  async countKpisTargets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countKpisTargets(schoolId, filters);
  }
}
