// Enterprise Platform Service - PainPoints
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPainPointService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPainPoint(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findPainPointById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listPainPoints(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllPainPoints(schoolId, filters);
  }
  async createPainPoint(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createPainPoint(schoolId, data);
  }
  async updatePainPoint(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findPainPointById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updatePainPoint(schoolId, id, data);
  }
  async deletePainPoint(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPainPointById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deletePainPoint(schoolId, id);
  }
  async countPainPoints(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPainPoints(schoolId, filters);
  }
}
