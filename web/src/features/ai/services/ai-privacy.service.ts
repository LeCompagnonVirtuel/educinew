import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiPrivacy, AiPrivacyQuery, AiPrivacyCreate, AiPrivacyUpdate } from '@educi/types';
import { AiPrivacyNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiPrivacyService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getPrivacy(schoolId: string, id: string): Promise<AiPrivacy> {
    const privacy = await this.repo.findById(schoolId, id);
    if (!privacy) throw new AiPrivacyNotFoundError(id);
    return privacy;
  }

  async listPrivacy(schoolId: string, query: AiPrivacyQuery): Promise<AiPrivacy[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createPrivacy(schoolId: string, data: AiPrivacyCreate): Promise<AiPrivacy> {
    return this.repo.create(schoolId, data);
  }

  async updatePrivacy(schoolId: string, id: string, data: AiPrivacyUpdate): Promise<AiPrivacy> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPrivacyNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deletePrivacy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiPrivacyNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
