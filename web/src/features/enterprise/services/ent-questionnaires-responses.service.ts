// Enterprise Platform Service - QuestionnairesResponses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntQuestionnaireResponseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getQuestionnairesResponse(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findQuestionnairesResponseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listQuestionnairesResponses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllQuestionnairesResponses(schoolId, filters);
  }
  async createQuestionnairesResponse(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createQuestionnairesResponse(schoolId, data);
  }
  async updateQuestionnairesResponse(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findQuestionnairesResponseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateQuestionnairesResponse(schoolId, id, data);
  }
  async deleteQuestionnairesResponse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findQuestionnairesResponseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteQuestionnairesResponse(schoolId, id);
  }
  async countQuestionnairesResponses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countQuestionnairesResponses(schoolId, filters);
  }
}
