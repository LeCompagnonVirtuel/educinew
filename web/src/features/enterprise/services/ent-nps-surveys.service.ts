// Enterprise Platform Service - NpsSurveys
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNpsSurveyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNpsSurvey(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNpsSurveyById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNpsSurveys(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNpsSurveys(schoolId, filters);
  }
  async createNpsSurvey(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNpsSurvey(schoolId, data);
  }
  async updateNpsSurvey(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNpsSurveyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNpsSurvey(schoolId, id, data);
  }
  async deleteNpsSurvey(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNpsSurveyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNpsSurvey(schoolId, id);
  }
  async countNpsSurveys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNpsSurveys(schoolId, filters);
  }
}
