import type { SupabaseClient } from '@supabase/supabase-js';
import type { CopilotFeedback } from '@educi/types';
import { AEIPCopilotFeedbackError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPCopilotFeedbackService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getFeedback(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listFeedbacks(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createFeedback(schoolId: string, data: Partial<CopilotFeedback>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateFeedback(schoolId: string, id: string, data: Partial<CopilotFeedback>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteFeedback(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}