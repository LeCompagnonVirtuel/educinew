import type { SupabaseClient } from '@supabase/supabase-js';
import type { MicrosoftTeamsIntegration } from '@educi/types';
import { EduOSMicrosoftTeamsIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMicrosoftTeamsIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMicrosoftTeamsIntegration(schoolId: string, id: string): Promise<MicrosoftTeamsIntegration> {
    const item = await this.repo.getMicrosoftTeamsIntegration(schoolId, id);
    if (!item) throw new EduOSMicrosoftTeamsIntegrationError(id);
    return item;
  }
  async listMicrosoftTeamsIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<MicrosoftTeamsIntegration[]> {
    return this.repo.listMicrosoftTeamsIntegrations(schoolId, filters);
  }
  async createMicrosoftTeamsIntegration(schoolId: string, data: Partial<MicrosoftTeamsIntegration>): Promise<MicrosoftTeamsIntegration> {
    return this.repo.createMicrosoftTeamsIntegration(schoolId, data as any);
  }
  async updateMicrosoftTeamsIntegration(schoolId: string, id: string, data: Partial<MicrosoftTeamsIntegration>): Promise<MicrosoftTeamsIntegration> {
    const existing = await this.repo.getMicrosoftTeamsIntegration(schoolId, id);
    if (!existing) throw new EduOSMicrosoftTeamsIntegrationError(id);
    return this.repo.updateMicrosoftTeamsIntegration(schoolId, id, data as any);
  }
  async deleteMicrosoftTeamsIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMicrosoftTeamsIntegration(schoolId, id);
    if (!existing) throw new EduOSMicrosoftTeamsIntegrationError(id);
    return this.repo.deleteMicrosoftTeamsIntegration(schoolId, id);
  }
}

