import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiAuthorization, AiAuthorizationQuery, AiAuthorizationCreate, AiAuthorizationUpdate } from '@educi/types';
import { AiAuthorizationNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiAuthorizationService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getAuthorization(schoolId: string, id: string): Promise<AiAuthorization> {
    const authorization = await this.repo.findById(schoolId, id);
    if (!authorization) throw new AiAuthorizationNotFoundError(id);
    return authorization;
  }

  async listAuthorizations(schoolId: string, query: AiAuthorizationQuery): Promise<AiAuthorization[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createAuthorization(schoolId: string, data: AiAuthorizationCreate): Promise<AiAuthorization> {
    return this.repo.create(schoolId, data);
  }

  async updateAuthorization(schoolId: string, id: string, data: AiAuthorizationUpdate): Promise<AiAuthorization> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAuthorizationNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteAuthorization(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiAuthorizationNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
