import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowNode } from '@educi/types';
import { EduOSWorkflowNodeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowNodeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowNode(schoolId: string, id: string): Promise<WorkflowNode> {
    const item = await this.repo.getWorkflowNode(schoolId, id);
    if (!item) throw new EduOSWorkflowNodeError(id);
    return item;
  }
  async listWorkflowNodes(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowNode[]> {
    return this.repo.listWorkflowNodes(schoolId, filters);
  }
  async createWorkflowNode(schoolId: string, data: Partial<WorkflowNode>): Promise<WorkflowNode> {
    return this.repo.createWorkflowNode(schoolId, data as any);
  }
  async updateWorkflowNode(schoolId: string, id: string, data: Partial<WorkflowNode>): Promise<WorkflowNode> {
    const existing = await this.repo.getWorkflowNode(schoolId, id);
    if (!existing) throw new EduOSWorkflowNodeError(id);
    return this.repo.updateWorkflowNode(schoolId, id, data as any);
  }
  async deleteWorkflowNode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowNode(schoolId, id);
    if (!existing) throw new EduOSWorkflowNodeError(id);
    return this.repo.deleteWorkflowNode(schoolId, id);
  }
}

