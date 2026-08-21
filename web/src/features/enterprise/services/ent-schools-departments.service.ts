// Enterprise Platform Service - SchoolsDepartments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSchoolDepartmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSchoolsDepartment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSchoolsDepartmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSchoolsDepartments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSchoolsDepartments(schoolId, filters);
  }
  async createSchoolsDepartment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSchoolsDepartment(schoolId, data);
  }
  async updateSchoolsDepartment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSchoolsDepartmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSchoolsDepartment(schoolId, id, data);
  }
  async deleteSchoolsDepartment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolsDepartmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSchoolsDepartment(schoolId, id);
  }
  async countSchoolsDepartments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolsDepartments(schoolId, filters);
  }
}
