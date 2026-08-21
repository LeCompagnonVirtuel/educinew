// Enterprise Platform Service - VendorAssessmentsScores
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVendorScoreService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVendorAssessmentsScore(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findVendorAssessmentsScoreById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listVendorAssessmentsScores(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllVendorAssessmentsScores(schoolId, filters);
  }
  async createVendorAssessmentsScore(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createVendorAssessmentsScore(schoolId, data);
  }
  async updateVendorAssessmentsScore(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findVendorAssessmentsScoreById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateVendorAssessmentsScore(schoolId, id, data);
  }
  async deleteVendorAssessmentsScore(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVendorAssessmentsScoreById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteVendorAssessmentsScore(schoolId, id);
  }
  async countVendorAssessmentsScores(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVendorAssessmentsScores(schoolId, filters);
  }
}
