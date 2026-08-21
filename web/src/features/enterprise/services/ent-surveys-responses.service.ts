// Enterprise Platform Service - SurveysResponses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSurveyResponseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSurveysResponse(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findSurveysResponseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listSurveysResponses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllSurveysResponses(schoolId, filters);
  }
  async createSurveysResponse(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createSurveysResponse(schoolId, data);
  }
  async updateSurveysResponse(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findSurveysResponseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateSurveysResponse(schoolId, id, data);
  }
  async deleteSurveysResponse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSurveysResponseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteSurveysResponse(schoolId, id);
  }
  async countSurveysResponses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSurveysResponses(schoolId, filters);
  }
}
