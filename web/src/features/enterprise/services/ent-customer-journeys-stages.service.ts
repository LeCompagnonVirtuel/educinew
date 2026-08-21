// Enterprise Platform Service - CustomerJourneysStages
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntJourneyStageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCustomerJourneysStage(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCustomerJourneysStageById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCustomerJourneysStages(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCustomerJourneysStages(schoolId, filters);
  }
  async createCustomerJourneysStage(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCustomerJourneysStage(schoolId, data);
  }
  async updateCustomerJourneysStage(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCustomerJourneysStageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCustomerJourneysStage(schoolId, id, data);
  }
  async deleteCustomerJourneysStage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCustomerJourneysStageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCustomerJourneysStage(schoolId, id);
  }
  async countCustomerJourneysStages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCustomerJourneysStages(schoolId, filters);
  }
}
