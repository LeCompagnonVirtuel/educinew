import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiVisionProcessing, AiVisionProcessingQuery, AiVisionProcessingCreate, AiVisionProcessingUpdate } from '@educi/types';
import { AiVisionProcessingNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiVisionProcessingService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getVisionProcessing(schoolId: string, id: string): Promise<AiVisionProcessing> {
    const processing = await this.repo.findById(schoolId, id);
    if (!processing) throw new AiVisionProcessingNotFoundError(id);
    return processing;
  }

  async listVisionProcessings(schoolId: string, query: AiVisionProcessingQuery): Promise<AiVisionProcessing[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createVisionProcessing(schoolId: string, data: AiVisionProcessingCreate): Promise<AiVisionProcessing> {
    return this.repo.create(schoolId, data);
  }

  async updateVisionProcessing(schoolId: string, id: string, data: AiVisionProcessingUpdate): Promise<AiVisionProcessing> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiVisionProcessingNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteVisionProcessing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiVisionProcessingNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async processVision(schoolId: string, id: string): Promise<AiVisionProcessing> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiVisionProcessingNotFoundError(id);
    return this.repo.update(schoolId, id, { status: 'processing', processedAt: new Date().toISOString() });
  }

  async getVisionResults(schoolId: string, id: string): Promise<AiVisionResult[]> {
    const processing = await this.repo.findById(schoolId, id);
    if (!processing) throw new AiVisionProcessingNotFoundError(id);
    return this.repo.findResultsByProcessingId(schoolId, id);
  }

  async getVisionAnalysis(schoolId: string, id: string): Promise<AiVisionAnalysis> {
    const processing = await this.repo.findById(schoolId, id);
    if (!processing) throw new AiVisionProcessingNotFoundError(id);
    return this.repo.findAnalysisById(schoolId, id);
  }
}
