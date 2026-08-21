import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiVoiceProcessing, AiVoiceProcessingQuery, AiVoiceProcessingCreate, AiVoiceProcessingUpdate } from '@educi/types';
import { AiVoiceProcessingNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiVoiceProcessingService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getVoiceProcessing(schoolId: string, id: string): Promise<AiVoiceProcessing> {
    const processing = await this.repo.findById(schoolId, id);
    if (!processing) throw new AiVoiceProcessingNotFoundError(id);
    return processing;
  }

  async listVoiceProcessings(schoolId: string, query: AiVoiceProcessingQuery): Promise<AiVoiceProcessing[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createVoiceProcessing(schoolId: string, data: AiVoiceProcessingCreate): Promise<AiVoiceProcessing> {
    return this.repo.create(schoolId, data);
  }

  async updateVoiceProcessing(schoolId: string, id: string, data: AiVoiceProcessingUpdate): Promise<AiVoiceProcessing> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiVoiceProcessingNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteVoiceProcessing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiVoiceProcessingNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async processVoice(schoolId: string, id: string): Promise<AiVoiceProcessing> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiVoiceProcessingNotFoundError(id);
    return this.repo.update(schoolId, id, { status: 'processing', processedAt: new Date().toISOString() });
  }

  async getVoiceTranscription(schoolId: string, id: string): Promise<AiVoiceTranscription> {
    const processing = await this.repo.findById(schoolId, id);
    if (!processing) throw new AiVoiceProcessingNotFoundError(id);
    return this.repo.findTranscriptionById(schoolId, id);
  }

  async getVoiceAnalysis(schoolId: string, id: string): Promise<AiVoiceAnalysis> {
    const processing = await this.repo.findById(schoolId, id);
    if (!processing) throw new AiVoiceProcessingNotFoundError(id);
    return this.repo.findAnalysisById(schoolId, id);
  }
}
