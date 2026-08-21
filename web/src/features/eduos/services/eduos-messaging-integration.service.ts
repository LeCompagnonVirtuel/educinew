import type { SupabaseClient } from '@supabase/supabase-js';
import type { MessagingIntegration } from '@educi/types';
import { EduOSMessagingIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMessagingIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMessagingIntegration(schoolId: string, id: string): Promise<MessagingIntegration> {
    const item = await this.repo.getMessagingIntegration(schoolId, id);
    if (!item) throw new EduOSMessagingIntegrationError(id);
    return item;
  }
  async listMessagingIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<MessagingIntegration[]> {
    return this.repo.listMessagingIntegrations(schoolId, filters);
  }
  async createMessagingIntegration(schoolId: string, data: Partial<MessagingIntegration>): Promise<MessagingIntegration> {
    return this.repo.createMessagingIntegration(schoolId, data as any);
  }
  async updateMessagingIntegration(schoolId: string, id: string, data: Partial<MessagingIntegration>): Promise<MessagingIntegration> {
    const existing = await this.repo.getMessagingIntegration(schoolId, id);
    if (!existing) throw new EduOSMessagingIntegrationError(id);
    return this.repo.updateMessagingIntegration(schoolId, id, data as any);
  }
  async deleteMessagingIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMessagingIntegration(schoolId, id);
    if (!existing) throw new EduOSMessagingIntegrationError(id);
    return this.repo.deleteMessagingIntegration(schoolId, id);
  }
}

