import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfraHealth } from '@educi/types';
import { AEIPAutonomousInfraHealthError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousInfraHealthService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getHealth(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listHealthChecks(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createHealthCheck(schoolId: string, data: Partial<InfraHealth>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateHealthCheck(schoolId: string, id: string, data: Partial<InfraHealth>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteHealthCheck(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}