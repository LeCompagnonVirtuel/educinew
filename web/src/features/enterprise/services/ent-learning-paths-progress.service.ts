// Enterprise Platform Service - LearningPathsProgress
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLearningPathProgressService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLearningPathsProgress(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLearningPathsProgressById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLearningPathsProgress(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLearningPathsProgress(schoolId, filters);
  }
  async createLearningPathsProgress(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLearningPathsProgress(schoolId, data);
  }
  async updateLearningPathsProgress(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLearningPathsProgressById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLearningPathsProgress(schoolId, id, data);
  }
  async deleteLearningPathsProgress(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLearningPathsProgressById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLearningPathsProgress(schoolId, id);
  }
  async countLearningPathsProgress(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLearningPathsProgress(schoolId, filters);
  }
}
