import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiMobile, AiMobileQuery, AiMobileCreate, AiMobileUpdate } from '@educi/types';
import { AiMobileNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiMobileService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getMobile(schoolId: string, id: string): Promise<AiMobile> {
    const mobile = await this.repo.findById(schoolId, id);
    if (!mobile) throw new AiMobileNotFoundError(id);
    return mobile;
  }

  async listMobile(schoolId: string, query: AiMobileQuery): Promise<AiMobile[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createMobile(schoolId: string, data: AiMobileCreate): Promise<AiMobile> {
    return this.repo.create(schoolId, data);
  }

  async updateMobile(schoolId: string, id: string, data: AiMobileUpdate): Promise<AiMobile> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiMobileNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}
