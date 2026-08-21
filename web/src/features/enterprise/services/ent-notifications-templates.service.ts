// Enterprise Platform Service - NotificationsTemplates
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNotificationTemplateService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNotificationsTemplate(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNotificationsTemplateById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNotificationsTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNotificationsTemplates(schoolId, filters);
  }
  async createNotificationsTemplate(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNotificationsTemplate(schoolId, data);
  }
  async updateNotificationsTemplate(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNotificationsTemplateById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNotificationsTemplate(schoolId, id, data);
  }
  async deleteNotificationsTemplate(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNotificationsTemplateById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNotificationsTemplate(schoolId, id);
  }
  async countNotificationsTemplates(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNotificationsTemplates(schoolId, filters);
  }
}
