// Enterprise Platform Service - Schools
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchool(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchoolById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchools(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchools(schoolId, filters);
  }
  async createSchool(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchool(schoolId, data);
  }
  async updateSchool(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchoolById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchool(schoolId, id, data);
  }
  async deleteSchool(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchool(schoolId, id);
  }
  async countSchools(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchools(schoolId, filters);
  }
}
