// Enterprise Platform Service - SchoolsAttendance
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolAttendanceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchoolsAttendance(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchoolsAttendanceById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchoolsAttendance(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchoolsAttendance(schoolId, filters);
  }
  async createSchoolsAttendance(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchoolsAttendance(schoolId, data);
  }
  async updateSchoolsAttendance(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchoolsAttendanceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchoolsAttendance(schoolId, id, data);
  }
  async deleteSchoolsAttendance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolsAttendanceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchoolsAttendance(schoolId, id);
  }
  async countSchoolsAttendance(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolsAttendance(schoolId, filters);
  }
}
