// Enterprise Platform Service - SchoolsGrades
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolGradeService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchoolsGrade(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchoolsGradeById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchoolsGrades(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchoolsGrades(schoolId, filters);
  }
  async createSchoolsGrade(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchoolsGrade(schoolId, data);
  }
  async updateSchoolsGrade(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchoolsGradeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchoolsGrade(schoolId, id, data);
  }
  async deleteSchoolsGrade(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolsGradeById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchoolsGrade(schoolId, id);
  }
  async countSchoolsGrades(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolsGrades(schoolId, filters);
  }
}
