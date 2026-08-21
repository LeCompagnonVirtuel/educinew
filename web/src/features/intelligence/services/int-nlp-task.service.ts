// Intelligence Platform Service - NLPTask
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NLPTask, NLPTaskCreate } from '@educi/types';
import { IntNLPTaskNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntNLPTaskService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getNLPTask(schoolId: string, id: string): Promise<NLPTask> {
    const item = await this.repo.getNLPTask(id, schoolId);
    if (!item) throw new IntNLPTaskNotFoundError(id);
    return item;
  }
  async listNLPTasks(schoolId: string, filters?: Record<string, unknown>): Promise<NLPTask[]> {
    return this.repo.listNLPTasks(schoolId, filters);
  }
  async createNLPTask(schoolId: string, data: NLPTaskCreate): Promise<NLPTask> {
    return this.repo.createNLPTask({ ...data, school_id: schoolId });
  }
  async updateNLPTask(schoolId: string, id: string, data: Partial<NLPTaskCreate>): Promise<NLPTask> {
    const existing = await this.repo.getNLPTask(id, schoolId);
    if (!existing) throw new IntNLPTaskNotFoundError(id);
    return this.repo.updateNLPTask(id, schoolId, data);
  }
  async deleteNLPTask(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNLPTask(id, schoolId);
    if (!existing) throw new IntNLPTaskNotFoundError(id);
    return this.repo.deleteNLPTask(id, schoolId);
  }
}
