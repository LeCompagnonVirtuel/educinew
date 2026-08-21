import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiIntegration, AiIntegrationQuery, AiIntegrationCreate, AiIntegrationUpdate } from '@educi/types';
import { AiIntegrationNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiIntegrationService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getIntegration(schoolId: string, id: string): Promise<AiIntegration> {
    const integration = await this.repo.findById(schoolId, id);
    if (!integration) throw new AiIntegrationNotFoundError(id);
    return integration;
  }

  async listIntegrations(schoolId: string, query: AiIntegrationQuery): Promise<AiIntegration[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createIntegration(schoolId: string, data: AiIntegrationCreate): Promise<AiIntegration> {
    return this.repo.create(schoolId, data);
  }

  async updateIntegration(schoolId: string, id: string, data: AiIntegrationUpdate): Promise<AiIntegration> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiIntegrationNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiIntegrationNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
