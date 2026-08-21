import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiWorkflow, AiWorkflowQuery, AiWorkflowCreate, AiWorkflowUpdate } from '@educi/types';
import { AiWorkflowNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiWorkflowService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getWorkflow(schoolId: string, id: string): Promise<AiWorkflow> {
    const workflow = await this.repo.findById(schoolId, id);
    if (!workflow) throw new AiWorkflowNotFoundError(id);
    return workflow;
  }

  async listWorkflows(schoolId: string, query: AiWorkflowQuery): Promise<AiWorkflow[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createWorkflow(schoolId: string, data: AiWorkflowCreate): Promise<AiWorkflow> {
    return this.repo.create(schoolId, data);
  }

  async updateWorkflow(schoolId: string, id: string, data: AiWorkflowUpdate): Promise<AiWorkflow> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiWorkflowNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteWorkflow(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiWorkflowNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async executeWorkflow(schoolId: string, id: string): Promise<AiWorkflowExecution> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiWorkflowNotFoundError(id);
    return this.repo.executeWorkflow(schoolId, id);
  }

  async getWorkflowExecution(schoolId: string, id: string, executionId: string): Promise<AiWorkflowExecution> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiWorkflowNotFoundError(id);
    return this.repo.findWorkflowExecution(schoolId, id, executionId);
  }

  async getWorkflowExecutions(schoolId: string, id: string): Promise<AiWorkflowExecution[]> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiWorkflowNotFoundError(id);
    return this.repo.findWorkflowExecutions(schoolId, id);
  }
}
