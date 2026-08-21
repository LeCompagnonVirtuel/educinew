// Enterprise Platform Service - TrainingCourses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTrainingCourseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTrainingCourse(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTrainingCourseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTrainingCourses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTrainingCourses(schoolId, filters);
  }
  async createTrainingCourse(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTrainingCourse(schoolId, data);
  }
  async updateTrainingCourse(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTrainingCourseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTrainingCourse(schoolId, id, data);
  }
  async deleteTrainingCourse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTrainingCourseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTrainingCourse(schoolId, id);
  }
  async countTrainingCourses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTrainingCourses(schoolId, filters);
  }
}
