// Intelligence Platform Service - IntelligenceAPI
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceAPI, IntelligenceAPICreate } from '@educi/types';
import { IntAPINotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntAPIService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getAPI(schoolId: string, id: string): Promise<IntelligenceAPI> {
    const item = await this.repo.getAPI(id, schoolId);
    if (!item) throw new IntAPINotFoundError(id);
    return item;
  }
  async listAPIs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceAPI[]> {
    return this.repo.listAPIs(schoolId, filters);
  }
  async createAPI(schoolId: string, data: IntelligenceAPICreate): Promise<IntelligenceAPI> {
    return this.repo.createAPI({ ...data, school_id: schoolId });
  }
  async updateAPI(schoolId: string, id: string, data: Partial<IntelligenceAPICreate>): Promise<IntelligenceAPI> {
    const existing = await this.repo.getAPI(id, schoolId);
    if (!existing) throw new IntAPINotFoundError(id);
    return this.repo.updateAPI(id, schoolId, data);
  }
  async deleteAPI(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAPI(id, schoolId);
    if (!existing) throw new IntAPINotFoundError(id);
    return this.repo.deleteAPI(id, schoolId);
  }
}
