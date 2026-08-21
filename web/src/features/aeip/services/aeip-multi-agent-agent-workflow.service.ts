import type { SupabaseClient } from '@supabase/supabase-js';
import type { AgentWorkflow } from '@educi/types';
import { AEIPMultiAgentWorkflowError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPMultiAgentWorkflowService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getWorkflow(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listWorkflows(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createWorkflow(schoolId: string, data: Partial<AgentWorkflow>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateWorkflow(schoolId: string, id: string, data: Partial<AgentWorkflow>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteWorkflow(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}