import type { SupabaseClient } from '@supabase/supabase-js';
import type { WorkflowAuditTrail } from '@educi/types';
import { EduOSWorkflowAuditTrailError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSWorkflowAuditTrailService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getWorkflowAuditTrail(schoolId: string, id: string): Promise<WorkflowAuditTrail> {
    const item = await this.repo.getWorkflowAuditTrail(schoolId, id);
    if (!item) throw new EduOSWorkflowAuditTrailError(id);
    return item;
  }
  async listWorkflowAuditTrails(schoolId: string, filters?: Record<string, unknown>): Promise<WorkflowAuditTrail[]> {
    return this.repo.listWorkflowAuditTrails(schoolId, filters);
  }
  async createWorkflowAuditTrail(schoolId: string, data: Partial<WorkflowAuditTrail>): Promise<WorkflowAuditTrail> {
    return this.repo.createWorkflowAuditTrail(schoolId, data as any);
  }
  async updateWorkflowAuditTrail(schoolId: string, id: string, data: Partial<WorkflowAuditTrail>): Promise<WorkflowAuditTrail> {
    const existing = await this.repo.getWorkflowAuditTrail(schoolId, id);
    if (!existing) throw new EduOSWorkflowAuditTrailError(id);
    return this.repo.updateWorkflowAuditTrail(schoolId, id, data as any);
  }
  async deleteWorkflowAuditTrail(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWorkflowAuditTrail(schoolId, id);
    if (!existing) throw new EduOSWorkflowAuditTrailError(id);
    return this.repo.deleteWorkflowAuditTrail(schoolId, id);
  }
}

