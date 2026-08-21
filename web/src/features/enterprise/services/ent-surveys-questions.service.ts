// Enterprise Platform Service - SurveysQuestions
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSurveyQuestionService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSurveysQuestion(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSurveysQuestionById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSurveysQuestions(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSurveysQuestions(schoolId, filters);
  }
  async createSurveysQuestion(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSurveysQuestion(schoolId, data);
  }
  async updateSurveysQuestion(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSurveysQuestionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSurveysQuestion(schoolId, id, data);
  }
  async deleteSurveysQuestion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSurveysQuestionById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSurveysQuestion(schoolId, id);
  }
  async countSurveysQuestions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSurveysQuestions(schoolId, filters);
  }
}
