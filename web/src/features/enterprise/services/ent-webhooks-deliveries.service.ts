// Enterprise Platform Service - WebhooksDeliveries
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntWebhookDeliveryService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getWebhooksDeliverie(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findWebhooksDeliverieById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listWebhooksDeliveries(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllWebhooksDeliveries(schoolId, filters);
  }
  async createWebhooksDeliverie(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createWebhooksDeliverie(schoolId, data);
  }
  async updateWebhooksDeliverie(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findWebhooksDeliverieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateWebhooksDeliverie(schoolId, id, data);
  }
  async deleteWebhooksDeliverie(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findWebhooksDeliverieById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteWebhooksDeliverie(schoolId, id);
  }
  async countWebhooksDeliveries(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countWebhooksDeliveries(schoolId, filters);
  }
}
