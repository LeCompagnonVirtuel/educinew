// Government & National Governance Service - EducationForecast
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EducationForecast, EducationForecastCreate } from '@educi/types';
import { GovEducationForecastNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEducationForecastService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEducationForecast(schoolId: string, id: string): Promise<EducationForecast> {
    const item = await this.repo.findEducationForecastById(schoolId, id);
    if (!item) throw new GovEducationForecastNotFoundError(id);
    return item;
  }

  async listEducationForecasts(schoolId: string, filters?: Record<string, unknown>): Promise<EducationForecast[]> {
    return this.repo.findAllEducationForecasts(schoolId, filters);
  }

  async createEducationForecast(schoolId: string, data: EducationForecastCreate): Promise<EducationForecast> {
    return this.repo.createEducationForecast(schoolId, data);
  }

  async updateEducationForecast(schoolId: string, id: string, data: Partial<EducationForecastCreate>): Promise<EducationForecast> {
    const existing = await this.repo.findEducationForecastById(schoolId, id);
    if (!existing) throw new GovEducationForecastNotFoundError(id);
    return this.repo.updateEducationForecast(schoolId, id, data);
  }

  async deleteEducationForecast(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findEducationForecastById(schoolId, id);
    if (!existing) throw new GovEducationForecastNotFoundError(id);
    return this.repo.deleteEducationForecast(schoolId, id);
  }

  async countEducationForecasts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countEducationForecasts(schoolId, filters);
  }
}
