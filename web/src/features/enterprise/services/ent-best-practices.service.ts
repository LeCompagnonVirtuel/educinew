// Enterprise Platform Service - BestPractices
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBestPracticeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBestPractice(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findBestPracticeById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listBestPractices(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllBestPractices(schoolId, filters);
  }
  async createBestPractice(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createBestPractice(schoolId, data);
  }
  async updateBestPractice(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findBestPracticeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateBestPractice(schoolId, id, data);
  }
  async deleteBestPractice(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBestPracticeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteBestPractice(schoolId, id);
  }
  async countBestPractices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBestPractices(schoolId, filters);
  }
}
