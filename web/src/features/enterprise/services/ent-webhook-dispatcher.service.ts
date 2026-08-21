// Enterprise Platform Service - WebhookDispatcher
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { WebhookDispatcher, WebhookDispatcherCreate } from '@educi/types';
import { EntWebhookDispatcherNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntWebhookDispatcherService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getWebhookDispatcher(schoolId: string, id: string): Promise<WebhookDispatcher> {
    const item = await this.repo.findWebhookDispatcherById(schoolId, id);
    if (!item) throw new EntWebhookDispatcherNotFoundError(id);
    return item;
  }
  async listWebhookDispatchers(schoolId: string, filters?: Record<string, unknown>): Promise<WebhookDispatcher[]> {
    return this.repo.findAllWebhookDispatchers(schoolId, filters);
  }
  async createWebhookDispatcher(schoolId: string, data: WebhookDispatcherCreate): Promise<WebhookDispatcher> {
    return this.repo.createWebhookDispatcher(schoolId, data);
  }
  async updateWebhookDispatcher(schoolId: string, id: string, data: Partial<WebhookDispatcherCreate>): Promise<WebhookDispatcher> {
    const existing = await this.repo.findWebhookDispatcherById(schoolId, id);
    if (!existing) throw new EntWebhookDispatcherNotFoundError(id);
    return this.repo.updateWebhookDispatcher(schoolId, id, data);
  }
  async deleteWebhookDispatcher(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWebhookDispatcherById(schoolId, id);
    if (!existing) throw new EntWebhookDispatcherNotFoundError(id);
    return this.repo.deleteWebhookDispatcher(schoolId, id);
  }
  async countWebhookDispatchers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWebhookDispatchers(schoolId, filters);
  }
}
