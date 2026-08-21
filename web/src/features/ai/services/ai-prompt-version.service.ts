import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiPromptVersion, AiPromptVersionQuery, AiPromptVersionCreate, AiPromptVersionUpdate } from '@educi/types';
import { AiPromptVersionNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiPromptVersionService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getVersion(schoolId: string, id: string): Promise<AiPromptVersion> {
    const version = await this.repo.findById(schoolId, id);
    if (!version) throw new AiPromptVersionNotFoundError(id);
    return version;
  }

  async listVersions(schoolId: string, query: AiPromptVersionQuery): Promise<AiPromptVersion[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createVersion(schoolId: string, data: AiPromptVersionCreate): Promise<AiPromptVersion> {
    return this.repo.create(schoolId, data);
  }

  async updateVersion(schoolId: string, id: string, data: AiPromptVersionUpdate): Promise<AiPromptVersion> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPromptVersionNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteVersion(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPromptVersionNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
