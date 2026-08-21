import type { SupabaseClient } from '@supabase/supabase-js';
import type { InsightEngine } from '@educi/types';
import { AEIPDigitalBrainInsightError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDigitalBrainInsightService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getInsight(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listInsights(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createInsight(schoolId: string, data: Partial<InsightEngine>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateInsight(schoolId: string, id: string, data: Partial<InsightEngine>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteInsight(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}