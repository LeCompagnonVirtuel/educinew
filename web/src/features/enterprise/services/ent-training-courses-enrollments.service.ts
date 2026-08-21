// Enterprise Platform Service - TrainingCoursesEnrollments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTrainingEnrollmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTrainingCoursesEnrollment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTrainingCoursesEnrollmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTrainingCoursesEnrollments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTrainingCoursesEnrollments(schoolId, filters);
  }
  async createTrainingCoursesEnrollment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTrainingCoursesEnrollment(schoolId, data);
  }
  async updateTrainingCoursesEnrollment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTrainingCoursesEnrollmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTrainingCoursesEnrollment(schoolId, id, data);
  }
  async deleteTrainingCoursesEnrollment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTrainingCoursesEnrollmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTrainingCoursesEnrollment(schoolId, id);
  }
  async countTrainingCoursesEnrollments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTrainingCoursesEnrollments(schoolId, filters);
  }
}
