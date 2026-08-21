// Enterprise Platform Service - CustomerJourneys
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCustomerJourneyService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCustomerJourney(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCustomerJourneyById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCustomerJourneys(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCustomerJourneys(schoolId, filters);
  }
  async createCustomerJourney(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCustomerJourney(schoolId, data);
  }
  async updateCustomerJourney(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCustomerJourneyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCustomerJourney(schoolId, id, data);
  }
  async deleteCustomerJourney(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCustomerJourneyById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCustomerJourney(schoolId, id);
  }
  async countCustomerJourneys(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCustomerJourneys(schoolId, filters);
  }
}
