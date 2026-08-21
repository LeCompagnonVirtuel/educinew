// Enterprise Platform Service - NpsSurveysResponses
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNpsResponseService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNpsSurveysResponse(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNpsSurveysResponseById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNpsSurveysResponses(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNpsSurveysResponses(schoolId, filters);
  }
  async createNpsSurveysResponse(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNpsSurveysResponse(schoolId, data);
  }
  async updateNpsSurveysResponse(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNpsSurveysResponseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNpsSurveysResponse(schoolId, id, data);
  }
  async deleteNpsSurveysResponse(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNpsSurveysResponseById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNpsSurveysResponse(schoolId, id);
  }
  async countNpsSurveysResponses(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNpsSurveysResponses(schoolId, filters);
  }
}
