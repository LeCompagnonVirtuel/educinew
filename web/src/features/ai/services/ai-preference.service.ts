import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiPreference, AiPreferenceQuery, AiPreferenceCreate, AiPreferenceUpdate } from '@educi/types';
import { AiPreferenceNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiPreferenceService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getPreference(schoolId: string, id: string): Promise<AiPreference> {
    const preference = await this.repo.findById(schoolId, id);
    if (!preference) throw new AiPreferenceNotFoundError(id);
    return preference;
  }

  async listPreferences(schoolId: string, query: AiPreferenceQuery): Promise<AiPreference[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createPreference(schoolId: string, data: AiPreferenceCreate): Promise<AiPreference> {
    return this.repo.create(schoolId, data);
  }

  async updatePreference(schoolId: string, id: string, data: AiPreferenceUpdate): Promise<AiPreference> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPreferenceNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deletePreference(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPreferenceNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
