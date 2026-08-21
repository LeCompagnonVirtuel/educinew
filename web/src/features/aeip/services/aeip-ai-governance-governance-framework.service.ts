import type { SupabaseClient } from '@supabase/supabase-js';
import type { GovernanceFramework } from '@educi/types';
import { AEIPGovernanceFrameworkError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGovernanceFrameworkService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getFramework(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listFrameworks(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createFramework(schoolId: string, data: Partial<GovernanceFramework>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateFramework(schoolId: string, id: string, data: Partial<GovernanceFramework>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteFramework(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}