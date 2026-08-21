import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiPrediction, AiPredictionQuery, AiPredictionCreate, AiPredictionUpdate } from '@educi/types';
import { AiPredictionNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiPredictionService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getPrediction(schoolId: string, id: string): Promise<AiPrediction> {
    const prediction = await this.repo.findById(schoolId, id);
    if (!prediction) throw new AiPredictionNotFoundError(id);
    return prediction;
  }

  async listPredictions(schoolId: string, query: AiPredictionQuery): Promise<AiPrediction[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createPrediction(schoolId: string, data: AiPredictionCreate): Promise<AiPrediction> {
    return this.repo.create(schoolId, data);
  }

  async updatePrediction(schoolId: string, id: string, data: AiPredictionUpdate): Promise<AiPrediction> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPredictionNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deletePrediction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPredictionNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async getPredictionAccuracy(schoolId: string, id: string): Promise<AiPredictionAccuracy> {
    const prediction = await this.repo.findById(schoolId, id);
    if (!prediction) throw new AiPredictionNotFoundError(id);
    return this.repo.findPredictionAccuracy(schoolId, id);
  }
}
