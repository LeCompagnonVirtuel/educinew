import type { SupabaseClient } from '@supabase/supabase-js';
import type { DecisionEngine } from '@educi/types';
import { EduOSDecisionEngineError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDecisionEngineService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDecisionEngine(schoolId: string, id: string): Promise<DecisionEngine> {
    const item = await this.repo.getDecisionEngine(schoolId, id);
    if (!item) throw new EduOSDecisionEngineError(id);
    return item;
  }
  async listDecisionEngines(schoolId: string, filters?: Record<string, unknown>): Promise<DecisionEngine[]> {
    return this.repo.listDecisionEngines(schoolId, filters);
  }
  async createDecisionEngine(schoolId: string, data: Partial<DecisionEngine>): Promise<DecisionEngine> {
    return this.repo.createDecisionEngine(schoolId, data as any);
  }
  async updateDecisionEngine(schoolId: string, id: string, data: Partial<DecisionEngine>): Promise<DecisionEngine> {
    const existing = await this.repo.getDecisionEngine(schoolId, id);
    if (!existing) throw new EduOSDecisionEngineError(id);
    return this.repo.updateDecisionEngine(schoolId, id, data as any);
  }
  async deleteDecisionEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDecisionEngine(schoolId, id);
    if (!existing) throw new EduOSDecisionEngineError(id);
    return this.repo.deleteDecisionEngine(schoolId, id);
  }
}

