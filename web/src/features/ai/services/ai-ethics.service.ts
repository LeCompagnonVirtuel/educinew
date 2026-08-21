import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiEthics, AiEthicsQuery, AiEthicsCreate, AiEthicsUpdate } from '@educi/types';
import { AiEthicsNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiEthicsService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getEthicsCheck(schoolId: string, id: string): Promise<AiEthics> {
    const check = await this.repo.findById(schoolId, id);
    if (!check) throw new AiEthicsNotFoundError(id);
    return check;
  }

  async listEthicsChecks(schoolId: string, query: AiEthicsQuery): Promise<AiEthics[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createEthicsCheck(schoolId: string, data: AiEthicsCreate): Promise<AiEthics> {
    return this.repo.create(schoolId, data);
  }

  async updateEthicsCheck(schoolId: string, id: string, data: AiEthicsUpdate): Promise<AiEthics> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiEthicsNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteEthicsCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiEthicsNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
