import type { SupabaseClient } from '@supabase/supabase-js';
import type { ReasoningEngine } from '@educi/types';
import { EduOSReasoningEngineError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSReasoningEngineService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getReasoningEngine(schoolId: string, id: string): Promise<ReasoningEngine> {
    const item = await this.repo.getReasoningEngine(schoolId, id);
    if (!item) throw new EduOSReasoningEngineError(id);
    return item;
  }
  async listReasoningEngines(schoolId: string, filters?: Record<string, unknown>): Promise<ReasoningEngine[]> {
    return this.repo.listReasoningEngines(schoolId, filters);
  }
  async createReasoningEngine(schoolId: string, data: Partial<ReasoningEngine>): Promise<ReasoningEngine> {
    return this.repo.createReasoningEngine(schoolId, data as any);
  }
  async updateReasoningEngine(schoolId: string, id: string, data: Partial<ReasoningEngine>): Promise<ReasoningEngine> {
    const existing = await this.repo.getReasoningEngine(schoolId, id);
    if (!existing) throw new EduOSReasoningEngineError(id);
    return this.repo.updateReasoningEngine(schoolId, id, data as any);
  }
  async deleteReasoningEngine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getReasoningEngine(schoolId, id);
    if (!existing) throw new EduOSReasoningEngineError(id);
    return this.repo.deleteReasoningEngine(schoolId, id);
  }
}

