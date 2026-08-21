import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernanceControl } from '@educi/types';
import { AEIPGovernanceControlError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGovernanceControlService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getControl(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listControls(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createControl(schoolId: string, data: Partial<GovernanceControl>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateControl(schoolId: string, id: string, data: Partial<GovernanceControl>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteControl(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}