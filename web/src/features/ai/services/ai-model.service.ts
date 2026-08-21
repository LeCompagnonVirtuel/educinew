import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiModel, AiModelQuery, AiModelCreate, AiModelUpdate } from '@educi/types';
import { AiModelNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiModelService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getModel(schoolId: string, id: string): Promise<AiModel> {
    const model = await this.repo.findById(schoolId, id);
    if (!model) throw new AiModelNotFoundError(id);
    return model;
  }

  async listModels(schoolId: string, query: AiModelQuery): Promise<AiModel[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createModel(schoolId: string, data: AiModelCreate): Promise<AiModel> {
    return this.repo.create(schoolId, data);
  }

  async updateModel(schoolId: string, id: string, data: AiModelUpdate): Promise<AiModel> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiModelNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteModel(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiModelNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
