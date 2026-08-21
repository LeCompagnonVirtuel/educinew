// Enterprise Platform Service - SchoolsCourses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolCourseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchoolsCourse(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchoolsCourseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchoolsCourses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchoolsCourses(schoolId, filters);
  }
  async createSchoolsCourse(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchoolsCourse(schoolId, data);
  }
  async updateSchoolsCourse(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchoolsCourseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchoolsCourse(schoolId, id, data);
  }
  async deleteSchoolsCourse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolsCourseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchoolsCourse(schoolId, id);
  }
  async countSchoolsCourses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolsCourses(schoolId, filters);
  }
}
