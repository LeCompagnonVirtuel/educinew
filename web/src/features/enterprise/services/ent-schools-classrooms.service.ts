// Enterprise Platform Service - SchoolsClassrooms
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolClassroomService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchoolsClassroom(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchoolsClassroomById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchoolsClassrooms(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchoolsClassrooms(schoolId, filters);
  }
  async createSchoolsClassroom(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchoolsClassroom(schoolId, data);
  }
  async updateSchoolsClassroom(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchoolsClassroomById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchoolsClassroom(schoolId, id, data);
  }
  async deleteSchoolsClassroom(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolsClassroomById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchoolsClassroom(schoolId, id);
  }
  async countSchoolsClassrooms(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolsClassrooms(schoolId, filters);
  }
}
