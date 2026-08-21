import type { SupabaseClient } from '@supabase/supabase-js';
import type { MobileMoneyIntegration } from '@educi/types';
import { EduOSMobileMoneyIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSMobileMoneyIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getMobileMoneyIntegration(schoolId: string, id: string): Promise<MobileMoneyIntegration> {
    const item = await this.repo.getMobileMoneyIntegration(schoolId, id);
    if (!item) throw new EduOSMobileMoneyIntegrationError(id);
    return item;
  }
  async listMobileMoneyIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<MobileMoneyIntegration[]> {
    return this.repo.listMobileMoneyIntegrations(schoolId, filters);
  }
  async createMobileMoneyIntegration(schoolId: string, data: Partial<MobileMoneyIntegration>): Promise<MobileMoneyIntegration> {
    return this.repo.createMobileMoneyIntegration(schoolId, data as any);
  }
  async updateMobileMoneyIntegration(schoolId: string, id: string, data: Partial<MobileMoneyIntegration>): Promise<MobileMoneyIntegration> {
    const existing = await this.repo.getMobileMoneyIntegration(schoolId, id);
    if (!existing) throw new EduOSMobileMoneyIntegrationError(id);
    return this.repo.updateMobileMoneyIntegration(schoolId, id, data as any);
  }
  async deleteMobileMoneyIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMobileMoneyIntegration(schoolId, id);
    if (!existing) throw new EduOSMobileMoneyIntegrationError(id);
    return this.repo.deleteMobileMoneyIntegration(schoolId, id);
  }
}

