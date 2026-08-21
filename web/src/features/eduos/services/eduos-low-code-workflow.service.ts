import type { SupabaseClient } from '@supabase/supabase-js';
import type { LowCodeWorkflow } from '@educi/types';
import { EduOSLowCodeWorkflowError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSLowCodeWorkflowService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getLowCodeWorkflow(schoolId: string, id: string): Promise<LowCodeWorkflow> {
    const item = await this.repo.getLowCodeWorkflow(schoolId, id);
    if (!item) throw new EduOSLowCodeWorkflowError(id);
    return item;
  }
  async listLowCodeWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<LowCodeWorkflow[]> {
    return this.repo.listLowCodeWorkflows(schoolId, filters);
  }
  async createLowCodeWorkflow(schoolId: string, data: Partial<LowCodeWorkflow>): Promise<LowCodeWorkflow> {
    return this.repo.createLowCodeWorkflow(schoolId, data as any);
  }
  async updateLowCodeWorkflow(schoolId: string, id: string, data: Partial<LowCodeWorkflow>): Promise<LowCodeWorkflow> {
    const existing = await this.repo.getLowCodeWorkflow(schoolId, id);
    if (!existing) throw new EduOSLowCodeWorkflowError(id);
    return this.repo.updateLowCodeWorkflow(schoolId, id, data as any);
  }
  async deleteLowCodeWorkflow(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLowCodeWorkflow(schoolId, id);
    if (!existing) throw new EduOSLowCodeWorkflowError(id);
    return this.repo.deleteLowCodeWorkflow(schoolId, id);
  }
}

