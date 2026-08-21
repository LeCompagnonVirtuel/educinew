import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernancePolicy } from '@educi/types';
import { AEIPGovernancePolicyError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGovernancePolicyService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getPolicy(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listPolicies(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createPolicy(schoolId: string, data: Partial<GovernancePolicy>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updatePolicy(schoolId: string, id: string, data: Partial<GovernancePolicy>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deletePolicy(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}