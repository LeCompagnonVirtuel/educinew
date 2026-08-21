// Enterprise Platform Service - VendorAssessmentsQuestionnaires
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntVendorQuestionnaireService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getVendorAssessmentsQuestionnaire(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findVendorAssessmentsQuestionnaireById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listVendorAssessmentsQuestionnaires(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllVendorAssessmentsQuestionnaires(schoolId, filters);
  }
  async createVendorAssessmentsQuestionnaire(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createVendorAssessmentsQuestionnaire(schoolId, data);
  }
  async updateVendorAssessmentsQuestionnaire(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findVendorAssessmentsQuestionnaireById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateVendorAssessmentsQuestionnaire(schoolId, id, data);
  }
  async deleteVendorAssessmentsQuestionnaire(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVendorAssessmentsQuestionnaireById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteVendorAssessmentsQuestionnaire(schoolId, id);
  }
  async countVendorAssessmentsQuestionnaires(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVendorAssessmentsQuestionnaires(schoolId, filters);
  }
}
