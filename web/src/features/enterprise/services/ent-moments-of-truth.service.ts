// Enterprise Platform Service - MomentsOfTruth
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntMomentOfTruthService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getMomentsOfTruth(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findMomentsOfTruthById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listMomentsOfTruth(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllMomentsOfTruth(schoolId, filters);
  }
  async createMomentsOfTruth(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createMomentsOfTruth(schoolId, data);
  }
  async updateMomentsOfTruth(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findMomentsOfTruthById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateMomentsOfTruth(schoolId, id, data);
  }
  async deleteMomentsOfTruth(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMomentsOfTruthById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteMomentsOfTruth(schoolId, id);
  }
  async countMomentsOfTruth(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMomentsOfTruth(schoolId, filters);
  }
}
