import type { SupabaseClient } from '@supabase/supabase-js';
import type { DecisionRule } from '@educi/types';
import { AEIPDecisionRuleError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDecisionRuleService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getRule(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listRules(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createRule(schoolId: string, data: Partial<DecisionRule>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateRule(schoolId: string, id: string, data: Partial<DecisionRule>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteRule(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}