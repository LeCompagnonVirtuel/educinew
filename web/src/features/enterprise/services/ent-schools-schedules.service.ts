// Enterprise Platform Service - SchoolsSchedules
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolScheduleService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchoolsSchedule(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchoolsScheduleById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchoolsSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchoolsSchedules(schoolId, filters);
  }
  async createSchoolsSchedule(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchoolsSchedule(schoolId, data);
  }
  async updateSchoolsSchedule(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchoolsScheduleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchoolsSchedule(schoolId, id, data);
  }
  async deleteSchoolsSchedule(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolsScheduleById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchoolsSchedule(schoolId, id);
  }
  async countSchoolsSchedules(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolsSchedules(schoolId, filters);
  }
}
