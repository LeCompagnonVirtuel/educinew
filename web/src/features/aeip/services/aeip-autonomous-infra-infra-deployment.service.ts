import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfraDeployment } from '@educi/types';
import { AEIPAutonomousInfraDeploymentError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousInfraDeploymentService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getDeployment(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listDeployments(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createDeployment(schoolId: string, data: Partial<InfraDeployment>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateDeployment(schoolId: string, id: string, data: Partial<InfraDeployment>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteDeployment(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}