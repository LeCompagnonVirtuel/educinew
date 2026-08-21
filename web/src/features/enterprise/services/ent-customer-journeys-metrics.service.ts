// Enterprise Platform Service - CustomerJourneysMetrics
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntJourneyMetricService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCustomerJourneysMetric(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCustomerJourneysMetricById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCustomerJourneysMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCustomerJourneysMetrics(schoolId, filters);
  }
  async createCustomerJourneysMetric(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCustomerJourneysMetric(schoolId, data);
  }
  async updateCustomerJourneysMetric(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCustomerJourneysMetricById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCustomerJourneysMetric(schoolId, id, data);
  }
  async deleteCustomerJourneysMetric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCustomerJourneysMetricById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCustomerJourneysMetric(schoolId, id);
  }
  async countCustomerJourneysMetrics(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCustomerJourneysMetrics(schoolId, filters);
  }
}
