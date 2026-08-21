// Intelligence Platform Service - Scenario
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Scenario, ScenarioCreate } from '@educi/types';
import { IntScenarioNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntScenarioService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getScenario(schoolId: string, id: string): Promise<Scenario> {
    const item = await this.repo.getScenario(id, schoolId);
    if (!item) throw new IntScenarioNotFoundError(id);
    return item;
  }
  async listScenarios(schoolId: string, filters?: Record<string, unknown>): Promise<Scenario[]> {
    return this.repo.listScenarios(schoolId, filters);
  }
  async createScenario(schoolId: string, data: ScenarioCreate): Promise<Scenario> {
    return this.repo.createScenario({ ...data, school_id: schoolId });
  }
  async updateScenario(schoolId: string, id: string, data: Partial<ScenarioCreate>): Promise<Scenario> {
    const existing = await this.repo.getScenario(id, schoolId);
    if (!existing) throw new IntScenarioNotFoundError(id);
    return this.repo.updateScenario(id, schoolId, data);
  }
  async deleteScenario(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getScenario(id, schoolId);
    if (!existing) throw new IntScenarioNotFoundError(id);
    return this.repo.deleteScenario(id, schoolId);
  }
}
