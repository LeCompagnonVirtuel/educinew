// Government & National Governance Service - InternationalStudentVisa
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalStudentVisa, InternationalStudentVisaCreate } from '@educi/types';
import { GovInternationalStudentVisaNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInternationalStudentVisaService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInternationalStudentVisa(schoolId: string, id: string): Promise<InternationalStudentVisa> {
    const item = await this.repo.findInternationalStudentVisaById(schoolId, id);
    if (!item) throw new GovInternationalStudentVisaNotFoundError(id);
    return item;
  }

  async listInternationalStudentVisas(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalStudentVisa[]> {
    return this.repo.findAllInternationalStudentVisas(schoolId, filters);
  }

  async createInternationalStudentVisa(schoolId: string, data: InternationalStudentVisaCreate): Promise<InternationalStudentVisa> {
    return this.repo.createInternationalStudentVisa(schoolId, data);
  }

  async updateInternationalStudentVisa(schoolId: string, id: string, data: Partial<InternationalStudentVisaCreate>): Promise<InternationalStudentVisa> {
    const existing = await this.repo.findInternationalStudentVisaById(schoolId, id);
    if (!existing) throw new GovInternationalStudentVisaNotFoundError(id);
    return this.repo.updateInternationalStudentVisa(schoolId, id, data);
  }

  async deleteInternationalStudentVisa(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalStudentVisaById(schoolId, id);
    if (!existing) throw new GovInternationalStudentVisaNotFoundError(id);
    return this.repo.deleteInternationalStudentVisa(schoolId, id);
  }

  async countInternationalStudentVisas(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInternationalStudentVisas(schoolId, filters);
  }
}
