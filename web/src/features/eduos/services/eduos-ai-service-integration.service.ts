import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIServiceIntegration } from '@educi/types';
import { EduOSAIServiceIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAIServiceIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAIServiceIntegration(schoolId: string, id: string): Promise<AIServiceIntegration> {
    const item = await this.repo.getAIServiceIntegration(schoolId, id);
    if (!item) throw new EduOSAIServiceIntegrationError(id);
    return item;
  }
  async listAIServiceIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<AIServiceIntegration[]> {
    return this.repo.listAIServiceIntegrations(schoolId, filters);
  }
  async createAIServiceIntegration(schoolId: string, data: Partial<AIServiceIntegration>): Promise<AIServiceIntegration> {
    return this.repo.createAIServiceIntegration(schoolId, data as any);
  }
  async updateAIServiceIntegration(schoolId: string, id: string, data: Partial<AIServiceIntegration>): Promise<AIServiceIntegration> {
    const existing = await this.repo.getAIServiceIntegration(schoolId, id);
    if (!existing) throw new EduOSAIServiceIntegrationError(id);
    return this.repo.updateAIServiceIntegration(schoolId, id, data as any);
  }
  async deleteAIServiceIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAIServiceIntegration(schoolId, id);
    if (!existing) throw new EduOSAIServiceIntegrationError(id);
    return this.repo.deleteAIServiceIntegration(schoolId, id);
  }
}

