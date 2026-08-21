import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationForecast, EducationForecastCreate } from '@educi/types';
import { GovEducationForecastNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAnalyticsEducationForecastService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<EducationForecast> {
    const item = await this.repo.findEducationForecastById(schoolId, id);
    if (!item) throw new GovEducationForecastNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<EducationForecast[]> {
    return this.repo.findAllEducationForecasts(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<EducationForecastCreate>): Promise<EducationForecast> {
    return this.repo.createEducationForecast(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<EducationForecastCreate>): Promise<EducationForecast> {
    const existing = await this.repo.findEducationForecastById(schoolId, id);
    if (!existing) throw new GovEducationForecastNotFoundError(id);
    return this.repo.updateEducationForecast(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationForecastById(schoolId, id);
    if (!existing) throw new GovEducationForecastNotFoundError(id);
    return this.repo.deleteEducationForecast(schoolId, id);
  }
}
