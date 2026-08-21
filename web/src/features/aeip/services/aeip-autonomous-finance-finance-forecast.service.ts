import type { SupabaseClient } from '@supabase/supabase-js';
import type { FinanceForecast } from '@educi/types';
import { AEIPAutonomousFinanceForecastError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousFinanceForecastService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getForecast(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listForecasts(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createForecast(schoolId: string, data: Partial<FinanceForecast>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateForecast(schoolId: string, id: string, data: Partial<FinanceForecast>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteForecast(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}