// Enterprise Platform Service - WebhooksLogs
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntWebhookLogService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getWebhooksLog(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findWebhooksLogById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listWebhooksLogs(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllWebhooksLogs(schoolId, filters);
  }
  async createWebhooksLog(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createWebhooksLog(schoolId, data);
  }
  async updateWebhooksLog(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findWebhooksLogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateWebhooksLog(schoolId, id, data);
  }
  async deleteWebhooksLog(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWebhooksLogById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteWebhooksLog(schoolId, id);
  }
  async countWebhooksLogs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWebhooksLogs(schoolId, filters);
  }
}
