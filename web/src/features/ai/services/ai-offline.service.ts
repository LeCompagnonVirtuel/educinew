import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiOffline, AiOfflineQuery, AiOfflineCreate, AiOfflineUpdate } from '@educi/types';
import { AiOfflineNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiOfflineService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getOffline(schoolId: string, id: string): Promise<AiOffline> {
    const offline = await this.repo.findById(schoolId, id);
    if (!offline) throw new AiOfflineNotFoundError(id);
    return offline;
  }

  async listOffline(schoolId: string, query: AiOfflineQuery): Promise<AiOffline[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createOffline(schoolId: string, data: AiOfflineCreate): Promise<AiOffline> {
    return this.repo.create(schoolId, data);
  }
}
