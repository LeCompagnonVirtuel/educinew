import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationNotification } from '@educi/types';
import { EduOSAutomationNotificationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAutomationNotificationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAutomationNotification(schoolId: string, id: string): Promise<AutomationNotification> {
    const item = await this.repo.getAutomationNotification(schoolId, id);
    if (!item) throw new EduOSAutomationNotificationError(id);
    return item;
  }
  async listAutomationNotifications(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationNotification[]> {
    return this.repo.listAutomationNotifications(schoolId, filters);
  }
  async createAutomationNotification(schoolId: string, data: Partial<AutomationNotification>): Promise<AutomationNotification> {
    return this.repo.createAutomationNotification(schoolId, data as any);
  }
  async updateAutomationNotification(schoolId: string, id: string, data: Partial<AutomationNotification>): Promise<AutomationNotification> {
    const existing = await this.repo.getAutomationNotification(schoolId, id);
    if (!existing) throw new EduOSAutomationNotificationError(id);
    return this.repo.updateAutomationNotification(schoolId, id, data as any);
  }
  async deleteAutomationNotification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomationNotification(schoolId, id);
    if (!existing) throw new EduOSAutomationNotificationError(id);
    return this.repo.deleteAutomationNotification(schoolId, id);
  }
}

