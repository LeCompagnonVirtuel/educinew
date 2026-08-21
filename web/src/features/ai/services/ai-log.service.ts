import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiLog, AiLogQuery, AiLogCreate, AiLogUpdate } from '@educi/types';
import { AiLogNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiLogService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getLog(schoolId: string, id: string): Promise<AiLog> {
    const log = await this.repo.findById(schoolId, id);
    if (!log) throw new AiLogNotFoundError(id);
    return log;
  }

  async listLogs(schoolId: string, query: AiLogQuery): Promise<AiLog[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createLog(schoolId: string, data: AiLogCreate): Promise<AiLog> {
    return this.repo.create(schoolId, data);
  }

  async updateLog(schoolId: string, id: string, data: AiLogUpdate): Promise<AiLog> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiLogNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}
