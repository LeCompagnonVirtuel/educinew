// Government & National Governance Service - NationalExam
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NationalExam, NationalExamCreate } from '@educi/types';
import { GovNationalExamNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNationalExamService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNationalExam(schoolId: string, id: string): Promise<NationalExam> {
    const item = await this.repo.findNationalExamById(schoolId, id);
    if (!item) throw new GovNationalExamNotFoundError(id);
    return item;
  }

  async listNationalExams(schoolId: string, filters?: Record<string, unknown>): Promise<NationalExam[]> {
    return this.repo.findAllNationalExams(schoolId, filters);
  }

  async createNationalExam(schoolId: string, data: NationalExamCreate): Promise<NationalExam> {
    return this.repo.createNationalExam(schoolId, data);
  }

  async updateNationalExam(schoolId: string, id: string, data: Partial<NationalExamCreate>): Promise<NationalExam> {
    const existing = await this.repo.findNationalExamById(schoolId, id);
    if (!existing) throw new GovNationalExamNotFoundError(id);
    return this.repo.updateNationalExam(schoolId, id, data);
  }

  async deleteNationalExam(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNationalExamById(schoolId, id);
    if (!existing) throw new GovNationalExamNotFoundError(id);
    return this.repo.deleteNationalExam(schoolId, id);
  }

  async countNationalExams(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNationalExams(schoolId, filters);
  }
}
