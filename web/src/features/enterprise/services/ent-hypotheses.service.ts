// Enterprise Platform Service - Hypotheses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntHypothesisService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getHypothese(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findHypotheseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listHypotheses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllHypotheses(schoolId, filters);
  }
  async createHypothese(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createHypothese(schoolId, data);
  }
  async updateHypothese(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findHypotheseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateHypothese(schoolId, id, data);
  }
  async deleteHypothese(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHypotheseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteHypothese(schoolId, id);
  }
  async countHypotheses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countHypotheses(schoolId, filters);
  }
}
