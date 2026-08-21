import type { SupabaseClient } from '@supabase/supabase-js';
import type { Microsoft365Integration } from '@educi/types';
import { EduOSMicrosoft365IntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMicrosoft365IntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMicrosoft365Integration(schoolId: string, id: string): Promise<Microsoft365Integration> {
    const item = await this.repo.getMicrosoft365Integration(schoolId, id);
    if (!item) throw new EduOSMicrosoft365IntegrationError(id);
    return item;
  }
  async listMicrosoft365Integrations(schoolId: string, filters?: Record<string, unknown>): Promise<Microsoft365Integration[]> {
    return this.repo.listMicrosoft365Integrations(schoolId, filters);
  }
  async createMicrosoft365Integration(schoolId: string, data: Partial<Microsoft365Integration>): Promise<Microsoft365Integration> {
    return this.repo.createMicrosoft365Integration(schoolId, data as any);
  }
  async updateMicrosoft365Integration(schoolId: string, id: string, data: Partial<Microsoft365Integration>): Promise<Microsoft365Integration> {
    const existing = await this.repo.getMicrosoft365Integration(schoolId, id);
    if (!existing) throw new EduOSMicrosoft365IntegrationError(id);
    return this.repo.updateMicrosoft365Integration(schoolId, id, data as any);
  }
  async deleteMicrosoft365Integration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMicrosoft365Integration(schoolId, id);
    if (!existing) throw new EduOSMicrosoft365IntegrationError(id);
    return this.repo.deleteMicrosoft365Integration(schoolId, id);
  }
}

