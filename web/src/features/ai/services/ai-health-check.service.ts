import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiHealthCheck, AiHealthCheckQuery, AiHealthCheckCreate, AiHealthCheckUpdate } from '@educi/types';
import { AiHealthCheckNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiHealthCheckService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getHealthCheck(schoolId: string, id: string): Promise<AiHealthCheck> {
    const healthCheck = await this.repo.findById(schoolId, id);
    if (!healthCheck) throw new AiHealthCheckNotFoundError(id);
    return healthCheck;
  }

  async listHealthChecks(schoolId: string, query: AiHealthCheckQuery): Promise<AiHealthCheck[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createHealthCheck(schoolId: string, data: AiHealthCheckCreate): Promise<AiHealthCheck> {
    return this.repo.create(schoolId, data);
  }

  async updateHealthCheck(schoolId: string, id: string, data: AiHealthCheckUpdate): Promise<AiHealthCheck> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiHealthCheckNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }
}
