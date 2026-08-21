import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiApiKey, AiApiKeyQuery, AiApiKeyCreate, AiApiKeyUpdate } from '@educi/types';
import { AiApiKeyNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiApiKeyService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getApiKey(schoolId: string, id: string): Promise<AiApiKey> {
    const apiKey = await this.repo.findById(schoolId, id);
    if (!apiKey) throw new AiApiKeyNotFoundError(id);
    return apiKey;
  }

  async listApiKeys(schoolId: string, query: AiApiKeyQuery): Promise<AiApiKey[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createApiKey(schoolId: string, data: AiApiKeyCreate): Promise<AiApiKey> {
    return this.repo.create(schoolId, data);
  }

  async updateApiKey(schoolId: string, id: string, data: AiApiKeyUpdate): Promise<AiApiKey> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiApiKeyNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteApiKey(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiApiKeyNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
