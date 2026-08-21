// Enterprise Platform Service - LearningPathsSteps
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLearningPathStepService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLearningPathsStep(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLearningPathsStepById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLearningPathsSteps(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLearningPathsSteps(schoolId, filters);
  }
  async createLearningPathsStep(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLearningPathsStep(schoolId, data);
  }
  async updateLearningPathsStep(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLearningPathsStepById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLearningPathsStep(schoolId, id, data);
  }
  async deleteLearningPathsStep(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLearningPathsStepById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLearningPathsStep(schoolId, id);
  }
  async countLearningPathsSteps(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLearningPathsSteps(schoolId, filters);
  }
}
