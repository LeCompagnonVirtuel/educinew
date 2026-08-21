// Government & National Governance Service - InternationalStudent
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalStudent, InternationalStudentCreate } from '@educi/types';
import { GovInternationalStudentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInternationalStudentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInternationalStudent(schoolId: string, id: string): Promise<InternationalStudent> {
    const item = await this.repo.findInternationalStudentById(schoolId, id);
    if (!item) throw new GovInternationalStudentNotFoundError(id);
    return item;
  }

  async listInternationalStudents(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalStudent[]> {
    return this.repo.findAllInternationalStudents(schoolId, filters);
  }

  async createInternationalStudent(schoolId: string, data: InternationalStudentCreate): Promise<InternationalStudent> {
    return this.repo.createInternationalStudent(schoolId, data);
  }

  async updateInternationalStudent(schoolId: string, id: string, data: Partial<InternationalStudentCreate>): Promise<InternationalStudent> {
    const existing = await this.repo.findInternationalStudentById(schoolId, id);
    if (!existing) throw new GovInternationalStudentNotFoundError(id);
    return this.repo.updateInternationalStudent(schoolId, id, data);
  }

  async deleteInternationalStudent(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalStudentById(schoolId, id);
    if (!existing) throw new GovInternationalStudentNotFoundError(id);
    return this.repo.deleteInternationalStudent(schoolId, id);
  }

  async countInternationalStudents(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInternationalStudents(schoolId, filters);
  }
}
