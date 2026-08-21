// Government & National Governance Service - ExamCertificateGeneration
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExamCertificateGeneration, ExamCertificateGenerationCreate } from '@educi/types';
import { GovExamCertificateGenerationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExamCertificateGenerationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExamCertificateGeneration(schoolId: string, id: string): Promise<ExamCertificateGeneration> {
    const item = await this.repo.findExamCertificateGenerationById(schoolId, id);
    if (!item) throw new GovExamCertificateGenerationNotFoundError(id);
    return item;
  }

  async listExamCertificateGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<ExamCertificateGeneration[]> {
    return this.repo.findAllExamCertificateGenerations(schoolId, filters);
  }

  async createExamCertificateGeneration(schoolId: string, data: ExamCertificateGenerationCreate): Promise<ExamCertificateGeneration> {
    return this.repo.createExamCertificateGeneration(schoolId, data);
  }

  async updateExamCertificateGeneration(schoolId: string, id: string, data: Partial<ExamCertificateGenerationCreate>): Promise<ExamCertificateGeneration> {
    const existing = await this.repo.findExamCertificateGenerationById(schoolId, id);
    if (!existing) throw new GovExamCertificateGenerationNotFoundError(id);
    return this.repo.updateExamCertificateGeneration(schoolId, id, data);
  }

  async deleteExamCertificateGeneration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExamCertificateGenerationById(schoolId, id);
    if (!existing) throw new GovExamCertificateGenerationNotFoundError(id);
    return this.repo.deleteExamCertificateGeneration(schoolId, id);
  }

  async countExamCertificateGenerations(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExamCertificateGenerations(schoolId, filters);
  }
}
