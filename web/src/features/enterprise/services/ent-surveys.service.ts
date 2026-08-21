// Enterprise Platform Service - Surveys
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSurveyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSurvey(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSurveyById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSurveys(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSurveys(schoolId, filters);
  }
  async createSurvey(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSurvey(schoolId, data);
  }
  async updateSurvey(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSurveyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSurvey(schoolId, id, data);
  }
  async deleteSurvey(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSurveyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSurvey(schoolId, id);
  }
  async countSurveys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSurveys(schoolId, filters);
  }
}
