// Enterprise Platform Service - ProcessingActivities
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntProcessingActivityService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getProcessingActivitie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findProcessingActivitieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listProcessingActivities(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllProcessingActivities(schoolId, filters);
  }
  async createProcessingActivitie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createProcessingActivitie(schoolId, data);
  }
  async updateProcessingActivitie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findProcessingActivitieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateProcessingActivitie(schoolId, id, data);
  }
  async deleteProcessingActivitie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findProcessingActivitieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteProcessingActivitie(schoolId, id);
  }
  async countProcessingActivities(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countProcessingActivities(schoolId, filters);
  }
}
