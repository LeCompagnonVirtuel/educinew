import type { SupabaseClient } from '@supabase/supabase-js';
import type { OperationExecution } from '@educi/types';
import { AEIPAutonomousOpsExecutionError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousOpsExecutionService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getExecution(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listExecutions(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createExecution(schoolId: string, data: Partial<OperationExecution>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateExecution(schoolId: string, id: string, data: Partial<OperationExecution>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteExecution(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}