// Enterprise Platform Service - CapacityPlansForecasts
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCapacityForecastService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCapacityPlansForecast(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findCapacityPlansForecastById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listCapacityPlansForecasts(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllCapacityPlansForecasts(schoolId, filters);
  }
  async createCapacityPlansForecast(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createCapacityPlansForecast(schoolId, data);
  }
  async updateCapacityPlansForecast(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findCapacityPlansForecastById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateCapacityPlansForecast(schoolId, id, data);
  }
  async deleteCapacityPlansForecast(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCapacityPlansForecastById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteCapacityPlansForecast(schoolId, id);
  }
  async countCapacityPlansForecasts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCapacityPlansForecasts(schoolId, filters);
  }
}
