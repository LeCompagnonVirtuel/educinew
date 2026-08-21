// Enterprise Platform Service - PlatformWebhook
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformWebhook, PlatformWebhookCreate } from '@educi/types';
import { EntPlatformWebhookNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformWebhookServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformWebhookService(schoolId: string, id: string): Promise<PlatformWebhook> {
    const item = await this.repo.findPlatformWebhookServiceById(schoolId, id);
    if (!item) throw new EntPlatformWebhookNotFoundError(id);
    return item;
  }
  async listPlatformWebhookServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformWebhook[]> {
    return this.repo.findAllPlatformWebhookServices(schoolId, filters);
  }
  async createPlatformWebhookService(schoolId: string, data: PlatformWebhookCreate): Promise<PlatformWebhook> {
    return this.repo.createPlatformWebhookService(schoolId, data);
  }
  async updatePlatformWebhookService(schoolId: string, id: string, data: Partial<PlatformWebhookCreate>): Promise<PlatformWebhook> {
    const existing = await this.repo.findPlatformWebhookServiceById(schoolId, id);
    if (!existing) throw new EntPlatformWebhookNotFoundError(id);
    return this.repo.updatePlatformWebhookService(schoolId, id, data);
  }
  async deletePlatformWebhookService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformWebhookServiceById(schoolId, id);
    if (!existing) throw new EntPlatformWebhookNotFoundError(id);
    return this.repo.deletePlatformWebhookService(schoolId, id);
  }
  async countPlatformWebhookServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformWebhookServices(schoolId, filters);
  }
}
