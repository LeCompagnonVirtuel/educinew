import type { SupabaseClient } from '@supabase/supabase-js';
import type { CapacityForecast } from '@educi/types';
import { EduCloudCapacityForecastError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCapacityForecast {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCapacityForecast(schoolId: string, id: string): Promise<CapacityForecast> {
    const item = await this.repo.getCapacityForecast(schoolId, id);
    if (!item) throw new EduCloudCapacityForecastError(id);
    return item;
  }
  async listCapacityForecasts(schoolId: string, filters?: Record<string, unknown>): Promise<CapacityForecast[]> {
    return this.repo.listCapacityForecast(schoolId, filters);
  }
  async createCapacityForecast(schoolId: string, data: Partial<CapacityForecast>): Promise<CapacityForecast> {
    return this.repo.createCapacityForecast(schoolId, data as any);
  }
  async updateCapacityForecast(schoolId: string, id: string, data: Partial<CapacityForecast>): Promise<CapacityForecast> {
    const existing = await this.repo.getCapacityForecast(schoolId, id);
    if (!existing) throw new EduCloudCapacityForecastError(id);
    return this.repo.updateCapacityForecast(schoolId, id, data as any);
  }
  async deleteCapacityForecast(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCapacityForecast(schoolId, id);
    if (!existing) throw new EduCloudCapacityForecastError(id);
    return this.repo.deleteCapacityForecast(schoolId, id);
  }
}
