// Intelligence Platform Service - IntelligenceDataSync
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceDataSync, IntelligenceDataSyncCreate } from '@educi/types';
import { IntDataSyncNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntDataSyncService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getDataSync(schoolId: string, id: string): Promise<IntelligenceDataSync> {
    const item = await this.repo.getDataSync(id, schoolId);
    if (!item) throw new IntDataSyncNotFoundError(id);
    return item;
  }
  async listDataSyncs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceDataSync[]> {
    return this.repo.listDataSyncs(schoolId, filters);
  }
  async createDataSync(schoolId: string, data: IntelligenceDataSyncCreate): Promise<IntelligenceDataSync> {
    return this.repo.createDataSync({ ...data, school_id: schoolId });
  }
  async updateDataSync(schoolId: string, id: string, data: Partial<IntelligenceDataSyncCreate>): Promise<IntelligenceDataSync> {
    const existing = await this.repo.getDataSync(id, schoolId);
    if (!existing) throw new IntDataSyncNotFoundError(id);
    return this.repo.updateDataSync(id, schoolId, data);
  }
  async deleteDataSync(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataSync(id, schoolId);
    if (!existing) throw new IntDataSyncNotFoundError(id);
    return this.repo.deleteDataSync(id, schoolId);
  }
}
