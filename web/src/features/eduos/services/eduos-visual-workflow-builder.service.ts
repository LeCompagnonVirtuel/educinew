import type { SupabaseClient } from '@supabase/supabase-js';
import type { VisualWorkflowBuilder } from '@educi/types';
import { EduOSVisualWorkflowBuilderError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSVisualWorkflowBuilderService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getVisualWorkflowBuilder(schoolId: string, id: string): Promise<VisualWorkflowBuilder> {
    const item = await this.repo.getVisualWorkflowBuilder(schoolId, id);
    if (!item) throw new EduOSVisualWorkflowBuilderError(id);
    return item;
  }
  async listVisualWorkflowBuilders(schoolId: string, filters?: Record<string, unknown>): Promise<VisualWorkflowBuilder[]> {
    return this.repo.listVisualWorkflowBuilders(schoolId, filters);
  }
  async createVisualWorkflowBuilder(schoolId: string, data: Partial<VisualWorkflowBuilder>): Promise<VisualWorkflowBuilder> {
    return this.repo.createVisualWorkflowBuilder(schoolId, data as any);
  }
  async updateVisualWorkflowBuilder(schoolId: string, id: string, data: Partial<VisualWorkflowBuilder>): Promise<VisualWorkflowBuilder> {
    const existing = await this.repo.getVisualWorkflowBuilder(schoolId, id);
    if (!existing) throw new EduOSVisualWorkflowBuilderError(id);
    return this.repo.updateVisualWorkflowBuilder(schoolId, id, data as any);
  }
  async deleteVisualWorkflowBuilder(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVisualWorkflowBuilder(schoolId, id);
    if (!existing) throw new EduOSVisualWorkflowBuilderError(id);
    return this.repo.deleteVisualWorkflowBuilder(schoolId, id);
  }
}

