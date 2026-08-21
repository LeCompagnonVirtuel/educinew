// Enterprise Platform Service - KpisActuals
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntKpiActualService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getKpisActual(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findKpisActualById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listKpisActuals(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllKpisActuals(schoolId, filters);
  }
  async createKpisActual(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createKpisActual(schoolId, data);
  }
  async updateKpisActual(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findKpisActualById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateKpisActual(schoolId, id, data);
  }
  async deleteKpisActual(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findKpisActualById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteKpisActual(schoolId, id);
  }
  async countKpisActuals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countKpisActuals(schoolId, filters);
  }
}
