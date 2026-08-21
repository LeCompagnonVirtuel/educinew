// Intelligence Platform Service - TextSummarization
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TextSummarization, TextSummarizationCreate } from '@educi/types';
import { IntSummarizationNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntSummarizationService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getTextSummarization(schoolId: string, id: string): Promise<TextSummarization> {
    const item = await this.repo.getTextSummarization(id, schoolId);
    if (!item) throw new IntSummarizationNotFoundError(id);
    return item;
  }
  async listSummarizations(schoolId: string, filters?: Record<string, unknown>): Promise<TextSummarization[]> {
    return this.repo.listSummarizations(schoolId, filters);
  }
  async createTextSummarization(schoolId: string, data: TextSummarizationCreate): Promise<TextSummarization> {
    return this.repo.createTextSummarization({ ...data, school_id: schoolId });
  }
  async updateTextSummarization(schoolId: string, id: string, data: Partial<TextSummarizationCreate>): Promise<TextSummarization> {
    const existing = await this.repo.getTextSummarization(id, schoolId);
    if (!existing) throw new IntSummarizationNotFoundError(id);
    return this.repo.updateTextSummarization(id, schoolId, data);
  }
  async deleteTextSummarization(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTextSummarization(id, schoolId);
    if (!existing) throw new IntSummarizationNotFoundError(id);
    return this.repo.deleteTextSummarization(id, schoolId);
  }
}
