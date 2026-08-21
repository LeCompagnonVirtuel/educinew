// Enterprise Platform Service - Questionnaires
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQuestionnaireService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getQuestionnaire(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findQuestionnaireById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listQuestionnaires(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllQuestionnaires(schoolId, filters);
  }
  async createQuestionnaire(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createQuestionnaire(schoolId, data);
  }
  async updateQuestionnaire(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findQuestionnaireById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateQuestionnaire(schoolId, id, data);
  }
  async deleteQuestionnaire(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQuestionnaireById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteQuestionnaire(schoolId, id);
  }
  async countQuestionnaires(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQuestionnaires(schoolId, filters);
  }
}
