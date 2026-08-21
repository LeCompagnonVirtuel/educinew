// Enterprise Platform Service - Synthetics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSyntheticService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSynthetic(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSyntheticById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSynthetics(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSynthetics(schoolId, filters);
  }
  async createSynthetic(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSynthetic(schoolId, data);
  }
  async updateSynthetic(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSyntheticById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSynthetic(schoolId, id, data);
  }
  async deleteSynthetic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSyntheticById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSynthetic(schoolId, id);
  }
  async countSynthetics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSynthetics(schoolId, filters);
  }
}
