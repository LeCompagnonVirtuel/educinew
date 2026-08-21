import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiDataRetention, AiDataRetentionQuery, AiDataRetentionCreate, AiDataRetentionUpdate } from '@educi/types';
import { AiDataRetentionNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiDataRetentionService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getDataRetention(schoolId: string, id: string): Promise<AiDataRetention> {
    const dataRetention = await this.repo.findById(schoolId, id);
    if (!dataRetention) throw new AiDataRetentionNotFoundError(id);
    return dataRetention;
  }

  async listDataRetention(schoolId: string, query: AiDataRetentionQuery): Promise<AiDataRetention[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createDataRetention(schoolId: string, data: AiDataRetentionCreate): Promise<AiDataRetention> {
    return this.repo.create(schoolId, data);
  }

  async updateDataRetention(schoolId: string, id: string, data: AiDataRetentionUpdate): Promise<AiDataRetention> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiDataRetentionNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}
