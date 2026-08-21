import type { SupabaseClient } from '@supabase/supabase-js';
import type { NoCodeWorkflow } from '@educi/types';
import { EduOSNoCodeWorkflowError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSNoCodeWorkflowService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getNoCodeWorkflow(schoolId: string, id: string): Promise<NoCodeWorkflow> {
    const item = await this.repo.getNoCodeWorkflow(schoolId, id);
    if (!item) throw new EduOSNoCodeWorkflowError(id);
    return item;
  }
  async listNoCodeWorkflows(schoolId: string, filters?: Record<string, unknown>): Promise<NoCodeWorkflow[]> {
    return this.repo.listNoCodeWorkflows(schoolId, filters);
  }
  async createNoCodeWorkflow(schoolId: string, data: Partial<NoCodeWorkflow>): Promise<NoCodeWorkflow> {
    return this.repo.createNoCodeWorkflow(schoolId, data as any);
  }
  async updateNoCodeWorkflow(schoolId: string, id: string, data: Partial<NoCodeWorkflow>): Promise<NoCodeWorkflow> {
    const existing = await this.repo.getNoCodeWorkflow(schoolId, id);
    if (!existing) throw new EduOSNoCodeWorkflowError(id);
    return this.repo.updateNoCodeWorkflow(schoolId, id, data as any);
  }
  async deleteNoCodeWorkflow(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNoCodeWorkflow(schoolId, id);
    if (!existing) throw new EduOSNoCodeWorkflowError(id);
    return this.repo.deleteNoCodeWorkflow(schoolId, id);
  }
}

