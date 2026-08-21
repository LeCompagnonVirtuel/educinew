// Enterprise Platform Service - NotificationChannels
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNotificationChannelService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNotificationChannel(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNotificationChannelById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNotificationChannels(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNotificationChannels(schoolId, filters);
  }
  async createNotificationChannel(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNotificationChannel(schoolId, data);
  }
  async updateNotificationChannel(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNotificationChannelById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNotificationChannel(schoolId, id, data);
  }
  async deleteNotificationChannel(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNotificationChannelById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNotificationChannel(schoolId, id);
  }
  async countNotificationChannels(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNotificationChannels(schoolId, filters);
  }
}
