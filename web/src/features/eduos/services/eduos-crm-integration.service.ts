import type { SupabaseClient } from '@supabase/supabase-js';
import type { CRMIntegration } from '@educi/types';
import { EduOSCRMIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCRMIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCRMIntegration(schoolId: string, id: string): Promise<CRMIntegration> {
    const item = await this.repo.getCRMIntegration(schoolId, id);
    if (!item) throw new EduOSCRMIntegrationError(id);
    return item;
  }
  async listCRMIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<CRMIntegration[]> {
    return this.repo.listCRMIntegrations(schoolId, filters);
  }
  async createCRMIntegration(schoolId: string, data: Partial<CRMIntegration>): Promise<CRMIntegration> {
    return this.repo.createCRMIntegration(schoolId, data as any);
  }
  async updateCRMIntegration(schoolId: string, id: string, data: Partial<CRMIntegration>): Promise<CRMIntegration> {
    const existing = await this.repo.getCRMIntegration(schoolId, id);
    if (!existing) throw new EduOSCRMIntegrationError(id);
    return this.repo.updateCRMIntegration(schoolId, id, data as any);
  }
  async deleteCRMIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCRMIntegration(schoolId, id);
    if (!existing) throw new EduOSCRMIntegrationError(id);
    return this.repo.deleteCRMIntegration(schoolId, id);
  }
}

