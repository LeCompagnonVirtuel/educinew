import type { SupabaseClient } from '@supabase/supabase-js';
import type { ETLPipeline } from '@educi/types';
import { EduOSETLPipelineError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSETLPipelineService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getETLPipeline(schoolId: string, id: string): Promise<ETLPipeline> {
    const item = await this.repo.getETLPipeline(schoolId, id);
    if (!item) throw new EduOSETLPipelineError(id);
    return item;
  }
  async listETLPipelines(schoolId: string, filters?: Record<string, unknown>): Promise<ETLPipeline[]> {
    return this.repo.listETLPipelines(schoolId, filters);
  }
  async createETLPipeline(schoolId: string, data: Partial<ETLPipeline>): Promise<ETLPipeline> {
    return this.repo.createETLPipeline(schoolId, data as any);
  }
  async updateETLPipeline(schoolId: string, id: string, data: Partial<ETLPipeline>): Promise<ETLPipeline> {
    const existing = await this.repo.getETLPipeline(schoolId, id);
    if (!existing) throw new EduOSETLPipelineError(id);
    return this.repo.updateETLPipeline(schoolId, id, data as any);
  }
  async deleteETLPipeline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getETLPipeline(schoolId, id);
    if (!existing) throw new EduOSETLPipelineError(id);
    return this.repo.deleteETLPipeline(schoolId, id);
  }
}

