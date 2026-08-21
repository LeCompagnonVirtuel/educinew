import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernanceCompliance } from '@educi/types';
import { AEIPGovernanceComplianceError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGovernanceComplianceService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getCompliance(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listCompliances(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createCompliance(schoolId: string, data: Partial<GovernanceCompliance>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateCompliance(schoolId: string, id: string, data: Partial<GovernanceCompliance>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteCompliance(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}