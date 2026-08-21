// Intelligence Platform Service - DataSource
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataSource, DataSourceCreate } from '@educi/types';
import { IntDataSourceNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntDataSourceService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getDataSource(schoolId: string, id: string): Promise<DataSource> {
    const item = await this.repo.getDataSource(id, schoolId);
    if (!item) throw new IntDataSourceNotFoundError(id);
    return item;
  }
  async listDataSources(schoolId: string, filters?: Record<string, unknown>): Promise<DataSource[]> {
    return this.repo.listDataSources(schoolId, filters);
  }
  async createDataSource(schoolId: string, data: DataSourceCreate): Promise<DataSource> {
    return this.repo.createDataSource({ ...data, school_id: schoolId });
  }
  async updateDataSource(schoolId: string, id: string, data: Partial<DataSourceCreate>): Promise<DataSource> {
    const existing = await this.repo.getDataSource(id, schoolId);
    if (!existing) throw new IntDataSourceNotFoundError(id);
    return this.repo.updateDataSource(id, schoolId, data);
  }
  async deleteDataSource(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataSource(id, schoolId);
    if (!existing) throw new IntDataSourceNotFoundError(id);
    return this.repo.deleteDataSource(id, schoolId);
  }
}
