// Government & National Governance Service - WebhookHandler
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { WebhookHandler, WebhookHandlerCreate } from '@educi/types';
import { GovWebhookHandlerNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovWebhookHandlerService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getWebhookHandler(schoolId: string, id: string): Promise<WebhookHandler> {
    const item = await this.repo.findWebhookHandlerById(schoolId, id);
    if (!item) throw new GovWebhookHandlerNotFoundError(id);
    return item;
  }

  async listWebhookHandlers(schoolId: string, filters?: Record<string, unknown>): Promise<WebhookHandler[]> {
    return this.repo.findAllWebhookHandlers(schoolId, filters);
  }

  async createWebhookHandler(schoolId: string, data: WebhookHandlerCreate): Promise<WebhookHandler> {
    return this.repo.createWebhookHandler(schoolId, data);
  }

  async updateWebhookHandler(schoolId: string, id: string, data: Partial<WebhookHandlerCreate>): Promise<WebhookHandler> {
    const existing = await this.repo.findWebhookHandlerById(schoolId, id);
    if (!existing) throw new GovWebhookHandlerNotFoundError(id);
    return this.repo.updateWebhookHandler(schoolId, id, data);
  }

  async deleteWebhookHandler(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWebhookHandlerById(schoolId, id);
    if (!existing) throw new GovWebhookHandlerNotFoundError(id);
    return this.repo.deleteWebhookHandler(schoolId, id);
  }

  async countWebhookHandlers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWebhookHandlers(schoolId, filters);
  }
}
