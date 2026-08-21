// Enterprise Platform Service - NotificationsPreferences
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntNotificationPreferenceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getNotificationsPreference(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findNotificationsPreferenceById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listNotificationsPreferences(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllNotificationsPreferences(schoolId, filters);
  }
  async createNotificationsPreference(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createNotificationsPreference(schoolId, data);
  }
  async updateNotificationsPreference(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findNotificationsPreferenceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateNotificationsPreference(schoolId, id, data);
  }
  async deleteNotificationsPreference(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNotificationsPreferenceById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteNotificationsPreference(schoolId, id);
  }
  async countNotificationsPreferences(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNotificationsPreferences(schoolId, filters);
  }
}
