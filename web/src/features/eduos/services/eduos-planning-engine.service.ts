import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlanningEngine } from '@educi/types';
import { EduOSPlanningEngineError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSPlanningEngineService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getPlanningEngine(schoolId: string, id: string): Promise<PlanningEngine> {
    const item = await this.repo.getPlanningEngine(schoolId, id);
    if (!item) throw new EduOSPlanningEngineError(id);
    return item;
  }
  async listPlanningEngines(schoolId: string, filters?: Record<string, unknown>): Promise<PlanningEngine[]> {
    return this.repo.listPlanningEngines(schoolId, filters);
  }
  async createPlanningEngine(schoolId: string, data: Partial<PlanningEngine>): Promise<PlanningEngine> {
    return this.repo.createPlanningEngine(schoolId, data as any);
  }
  async updatePlanningEngine(schoolId: string, id: string, data: Partial<PlanningEngine>): Promise<PlanningEngine> {
    const existing = await this.repo.getPlanningEngine(schoolId, id);
    if (!existing) throw new EduOSPlanningEngineError(id);
    return this.repo.updatePlanningEngine(schoolId, id, data as any);
  }
  async deletePlanningEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPlanningEngine(schoolId, id);
    if (!existing) throw new EduOSPlanningEngineError(id);
    return this.repo.deletePlanningEngine(schoolId, id);
  }
}

