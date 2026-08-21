import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiSecurity, AiSecurityQuery, AiSecurityCreate, AiSecurityUpdate } from '@educi/types';
import { AiSecurityNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiSecurityService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getSecurity(schoolId: string, id: string): Promise<AiSecurity> {
    const security = await this.repo.findById(schoolId, id);
    if (!security) throw new AiSecurityNotFoundError(id);
    return security;
  }

  async listSecurity(schoolId: string, query: AiSecurityQuery): Promise<AiSecurity[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createSecurity(schoolId: string, data: AiSecurityCreate): Promise<AiSecurity> {
    return this.repo.create(schoolId, data);
  }

  async updateSecurity(schoolId: string, id: string, data: AiSecurityUpdate): Promise<AiSecurity> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiSecurityNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteSecurity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiSecurityNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
