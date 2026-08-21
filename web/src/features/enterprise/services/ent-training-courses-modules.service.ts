// Enterprise Platform Service - TrainingCoursesModules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTrainingModuleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTrainingCoursesModule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTrainingCoursesModuleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTrainingCoursesModules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTrainingCoursesModules(schoolId, filters);
  }
  async createTrainingCoursesModule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTrainingCoursesModule(schoolId, data);
  }
  async updateTrainingCoursesModule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTrainingCoursesModuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTrainingCoursesModule(schoolId, id, data);
  }
  async deleteTrainingCoursesModule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTrainingCoursesModuleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTrainingCoursesModule(schoolId, id);
  }
  async countTrainingCoursesModules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTrainingCoursesModules(schoolId, filters);
  }
}
