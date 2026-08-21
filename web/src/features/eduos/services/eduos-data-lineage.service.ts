import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataLineage } from '@educi/types';
import { EduOSDataLineageError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataLineageService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataLineage(schoolId: string, id: string): Promise<DataLineage> {
    const item = await this.repo.getDataLineage(schoolId, id);
    if (!item) throw new EduOSDataLineageError(id);
    return item;
  }
  async listDataLineages(schoolId: string, filters?: Record<string, unknown>): Promise<DataLineage[]> {
    return this.repo.listDataLineages(schoolId, filters);
  }
  async createDataLineage(schoolId: string, data: Partial<DataLineage>): Promise<DataLineage> {
    return this.repo.createDataLineage(schoolId, data as any);
  }
  async updateDataLineage(schoolId: string, id: string, data: Partial<DataLineage>): Promise<DataLineage> {
    const existing = await this.repo.getDataLineage(schoolId, id);
    if (!existing) throw new EduOSDataLineageError(id);
    return this.repo.updateDataLineage(schoolId, id, data as any);
  }
  async deleteDataLineage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataLineage(schoolId, id);
    if (!existing) throw new EduOSDataLineageError(id);
    return this.repo.deleteDataLineage(schoolId, id);
  }
}

