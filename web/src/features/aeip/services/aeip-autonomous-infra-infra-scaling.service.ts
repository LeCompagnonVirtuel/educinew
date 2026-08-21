import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfraScaling } from '@educi/types';
import { AEIPAutonomousInfraScalingError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousInfraScalingService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getScaling(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listScalings(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createScaling(schoolId: string, data: Partial<InfraScaling>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateScaling(schoolId: string, id: string, data: Partial<InfraScaling>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteScaling(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}