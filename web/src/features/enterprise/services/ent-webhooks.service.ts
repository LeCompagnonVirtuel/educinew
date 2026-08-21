// Enterprise Platform Service - Webhooks
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntWebhookService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getWebhook(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findWebhookById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listWebhooks(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllWebhooks(schoolId, filters);
  }
  async createWebhook(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createWebhook(schoolId, data);
  }
  async updateWebhook(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findWebhookById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateWebhook(schoolId, id, data);
  }
  async deleteWebhook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWebhookById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteWebhook(schoolId, id);
  }
  async countWebhooks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWebhooks(schoolId, filters);
  }
}
