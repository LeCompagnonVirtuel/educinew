// Enterprise Platform Service - DataLineage
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataLineage, DataLineageCreate } from '@educi/types';
import { EntDataLineageNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntDataLineageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getDataLineage(schoolId: string, id: string): Promise<DataLineage> {
    const item = await this.repo.findDataLineageById(schoolId, id);
    if (!item) throw new EntDataLineageNotFoundError(id);
    return item;
  }
  async listDataLineages(schoolId: string, filters?: Record<string, unknown>): Promise<DataLineage[]> {
    return this.repo.findAllDataLineages(schoolId, filters);
  }
  async createDataLineage(schoolId: string, data: DataLineageCreate): Promise<DataLineage> {
    return this.repo.createDataLineage(schoolId, data);
  }
  async updateDataLineage(schoolId: string, id: string, data: Partial<DataLineageCreate>): Promise<DataLineage> {
    const existing = await this.repo.findDataLineageById(schoolId, id);
    if (!existing) throw new EntDataLineageNotFoundError(id);
    return this.repo.updateDataLineage(schoolId, id, data);
  }
  async deleteDataLineage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDataLineageById(schoolId, id);
    if (!existing) throw new EntDataLineageNotFoundError(id);
    return this.repo.deleteDataLineage(schoolId, id);
  }
  async countDataLineages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDataLineages(schoolId, filters);
  }
}
