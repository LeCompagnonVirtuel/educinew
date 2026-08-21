// Enterprise Platform Service - LearningPaths
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntLearningPathService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getLearningPath(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findLearningPathById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listLearningPaths(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllLearningPaths(schoolId, filters);
  }
  async createLearningPath(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createLearningPath(schoolId, data);
  }
  async updateLearningPath(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findLearningPathById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateLearningPath(schoolId, id, data);
  }
  async deleteLearningPath(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLearningPathById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteLearningPath(schoolId, id);
  }
  async countLearningPaths(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLearningPaths(schoolId, filters);
  }
}
