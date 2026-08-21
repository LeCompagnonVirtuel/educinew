import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowEdge } from '@educi/types';
import { EduOSWorkflowEdgeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowEdgeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowEdge(schoolId: string, id: string): Promise<WorkflowEdge> {
    const item = await this.repo.getWorkflowEdge(schoolId, id);
    if (!item) throw new EduOSWorkflowEdgeError(id);
    return item;
  }
  async listWorkflowEdges(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowEdge[]> {
    return this.repo.listWorkflowEdges(schoolId, filters);
  }
  async createWorkflowEdge(schoolId: string, data: Partial<WorkflowEdge>): Promise<WorkflowEdge> {
    return this.repo.createWorkflowEdge(schoolId, data as any);
  }
  async updateWorkflowEdge(schoolId: string, id: string, data: Partial<WorkflowEdge>): Promise<WorkflowEdge> {
    const existing = await this.repo.getWorkflowEdge(schoolId, id);
    if (!existing) throw new EduOSWorkflowEdgeError(id);
    return this.repo.updateWorkflowEdge(schoolId, id, data as any);
  }
  async deleteWorkflowEdge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowEdge(schoolId, id);
    if (!existing) throw new EduOSWorkflowEdgeError(id);
    return this.repo.deleteWorkflowEdge(schoolId, id);
  }
}

