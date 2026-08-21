import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicInsight } from '@educi/types';
import { AEIPAutonomousAcademicInsightError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousAcademicInsightService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getInsight(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listInsights(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createInsight(schoolId: string, data: Partial<AcademicInsight>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateInsight(schoolId: string, id: string, data: Partial<AcademicInsight>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteInsight(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}