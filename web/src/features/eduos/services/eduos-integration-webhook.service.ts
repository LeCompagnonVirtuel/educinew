import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntegrationWebhook } from '@educi/types';
import { EduOSIntegrationWebhookError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSIntegrationWebhookService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getIntegrationWebhook(schoolId: string, id: string): Promise<IntegrationWebhook> {
    const item = await this.repo.getIntegrationWebhook(schoolId, id);
    if (!item) throw new EduOSIntegrationWebhookError(id);
    return item;
  }
  async listIntegrationWebhooks(schoolId: string, filters?: Record<string, unknown>): Promise<IntegrationWebhook[]> {
    return this.repo.listIntegrationWebhooks(schoolId, filters);
  }
  async createIntegrationWebhook(schoolId: string, data: Partial<IntegrationWebhook>): Promise<IntegrationWebhook> {
    return this.repo.createIntegrationWebhook(schoolId, data as any);
  }
  async updateIntegrationWebhook(schoolId: string, id: string, data: Partial<IntegrationWebhook>): Promise<IntegrationWebhook> {
    const existing = await this.repo.getIntegrationWebhook(schoolId, id);
    if (!existing) throw new EduOSIntegrationWebhookError(id);
    return this.repo.updateIntegrationWebhook(schoolId, id, data as any);
  }
  async deleteIntegrationWebhook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIntegrationWebhook(schoolId, id);
    if (!existing) throw new EduOSIntegrationWebhookError(id);
    return this.repo.deleteIntegrationWebhook(schoolId, id);
  }
}

