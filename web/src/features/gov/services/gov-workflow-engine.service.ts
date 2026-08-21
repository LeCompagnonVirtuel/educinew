// Government & National Governance Service - WorkflowEngine
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowEngine, WorkflowEngineCreate } from '@educi/types';
import { GovWorkflowEngineNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovWorkflowEngineService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getWorkflowEngine(schoolId: string, id: string): Promise<WorkflowEngine> {
    const item = await this.repo.findWorkflowEngineById(schoolId, id);
    if (!item) throw new GovWorkflowEngineNotFoundError(id);
    return item;
  }

  async listWorkflowEngines(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowEngine[]> {
    return this.repo.findAllWorkflowEngines(schoolId, filters);
  }

  async createWorkflowEngine(schoolId: string, data: WorkflowEngineCreate): Promise<WorkflowEngine> {
    return this.repo.createWorkflowEngine(schoolId, data);
  }

  async updateWorkflowEngine(schoolId: string, id: string, data: Partial<WorkflowEngineCreate>): Promise<WorkflowEngine> {
    const existing = await this.repo.findWorkflowEngineById(schoolId, id);
    if (!existing) throw new GovWorkflowEngineNotFoundError(id);
    return this.repo.updateWorkflowEngine(schoolId, id, data);
  }

  async deleteWorkflowEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWorkflowEngineById(schoolId, id);
    if (!existing) throw new GovWorkflowEngineNotFoundError(id);
    return this.repo.deleteWorkflowEngine(schoolId, id);
  }

  async countWorkflowEngines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWorkflowEngines(schoolId, filters);
  }
}
