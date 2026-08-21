import type { SupabaseClient } from '@supabase/supabase-js';
import type { LMSIntegration } from '@educi/types';
import { EduOSLMSIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSLMSIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getLMSIntegration(schoolId: string, id: string): Promise<LMSIntegration> {
    const item = await this.repo.getLMSIntegration(schoolId, id);
    if (!item) throw new EduOSLMSIntegrationError(id);
    return item;
  }
  async listLMSIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<LMSIntegration[]> {
    return this.repo.listLMSIntegrations(schoolId, filters);
  }
  async createLMSIntegration(schoolId: string, data: Partial<LMSIntegration>): Promise<LMSIntegration> {
    return this.repo.createLMSIntegration(schoolId, data as any);
  }
  async updateLMSIntegration(schoolId: string, id: string, data: Partial<LMSIntegration>): Promise<LMSIntegration> {
    const existing = await this.repo.getLMSIntegration(schoolId, id);
    if (!existing) throw new EduOSLMSIntegrationError(id);
    return this.repo.updateLMSIntegration(schoolId, id, data as any);
  }
  async deleteLMSIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLMSIntegration(schoolId, id);
    if (!existing) throw new EduOSLMSIntegrationError(id);
    return this.repo.deleteLMSIntegration(schoolId, id);
  }
}

