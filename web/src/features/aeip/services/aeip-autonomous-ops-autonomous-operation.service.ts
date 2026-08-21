import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutonomousOperation } from '@educi/types';
import { AEIPAutonomousOpsOperationError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousOpsOperationService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getOperation(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listOperations(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createOperation(schoolId: string, data: Partial<AutonomousOperation>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateOperation(schoolId: string, id: string, data: Partial<AutonomousOperation>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteOperation(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}