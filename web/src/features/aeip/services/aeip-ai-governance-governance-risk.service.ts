import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernanceRisk } from '@educi/types';
import { AEIPGovernanceRiskError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGovernanceRiskService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getRisk(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listRisks(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createRisk(schoolId: string, data: Partial<GovernanceRisk>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateRisk(schoolId: string, id: string, data: Partial<GovernanceRisk>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteRisk(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}