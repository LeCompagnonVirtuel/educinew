import type { SupabaseClient } from '@supabase/supabase-js';
import type { VideoConferenceIntegration } from '@educi/types';
import { EduOSVideoConferenceIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSVideoConferenceIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getVideoConferenceIntegration(schoolId: string, id: string): Promise<VideoConferenceIntegration> {
    const item = await this.repo.getVideoConferenceIntegration(schoolId, id);
    if (!item) throw new EduOSVideoConferenceIntegrationError(id);
    return item;
  }
  async listVideoConferenceIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<VideoConferenceIntegration[]> {
    return this.repo.listVideoConferenceIntegrations(schoolId, filters);
  }
  async createVideoConferenceIntegration(schoolId: string, data: Partial<VideoConferenceIntegration>): Promise<VideoConferenceIntegration> {
    return this.repo.createVideoConferenceIntegration(schoolId, data as any);
  }
  async updateVideoConferenceIntegration(schoolId: string, id: string, data: Partial<VideoConferenceIntegration>): Promise<VideoConferenceIntegration> {
    const existing = await this.repo.getVideoConferenceIntegration(schoolId, id);
    if (!existing) throw new EduOSVideoConferenceIntegrationError(id);
    return this.repo.updateVideoConferenceIntegration(schoolId, id, data as any);
  }
  async deleteVideoConferenceIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVideoConferenceIntegration(schoolId, id);
    if (!existing) throw new EduOSVideoConferenceIntegrationError(id);
    return this.repo.deleteVideoConferenceIntegration(schoolId, id);
  }
}

