// Enterprise Platform Service - HelmChart
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { HelmChart, HelmChartCreate } from '@educi/types';
import { EntHelmChartNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntHelmChartService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getHelmChart(schoolId: string, id: string): Promise<HelmChart> {
    const item = await this.repo.findHelmChartById(schoolId, id);
    if (!item) throw new EntHelmChartNotFoundError(id);
    return item;
  }
  async listHelmCharts(schoolId: string, filters?: Record<string, unknown>): Promise<HelmChart[]> {
    return this.repo.findAllHelmCharts(schoolId, filters);
  }
  async createHelmChart(schoolId: string, data: HelmChartCreate): Promise<HelmChart> {
    return this.repo.createHelmChart(schoolId, data);
  }
  async updateHelmChart(schoolId: string, id: string, data: Partial<HelmChartCreate>): Promise<HelmChart> {
    const existing = await this.repo.findHelmChartById(schoolId, id);
    if (!existing) throw new EntHelmChartNotFoundError(id);
    return this.repo.updateHelmChart(schoolId, id, data);
  }
  async deleteHelmChart(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findHelmChartById(schoolId, id);
    if (!existing) throw new EntHelmChartNotFoundError(id);
    return this.repo.deleteHelmChart(schoolId, id);
  }
  async countHelmCharts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countHelmCharts(schoolId, filters);
  }
}
