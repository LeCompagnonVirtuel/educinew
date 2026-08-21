// Enterprise Platform Service - Notifications
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNotificationService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNotification(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNotificationById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNotifications(schoolId, filters);
  }
  async createNotification(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNotification(schoolId, data);
  }
  async updateNotification(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNotificationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNotification(schoolId, id, data);
  }
  async deleteNotification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNotificationById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNotification(schoolId, id);
  }
  async countNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNotifications(schoolId, filters);
  }
}
