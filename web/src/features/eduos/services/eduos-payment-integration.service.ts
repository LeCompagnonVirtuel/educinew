import type { SupabaseClient } from '@supabase/supabase-js';
import type { PaymentIntegration } from '@educi/types';
import { EduOSPaymentIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSPaymentIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getPaymentIntegration(schoolId: string, id: string): Promise<PaymentIntegration> {
    const item = await this.repo.getPaymentIntegration(schoolId, id);
    if (!item) throw new EduOSPaymentIntegrationError(id);
    return item;
  }
  async listPaymentIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<PaymentIntegration[]> {
    return this.repo.listPaymentIntegrations(schoolId, filters);
  }
  async createPaymentIntegration(schoolId: string, data: Partial<PaymentIntegration>): Promise<PaymentIntegration> {
    return this.repo.createPaymentIntegration(schoolId, data as any);
  }
  async updatePaymentIntegration(schoolId: string, id: string, data: Partial<PaymentIntegration>): Promise<PaymentIntegration> {
    const existing = await this.repo.getPaymentIntegration(schoolId, id);
    if (!existing) throw new EduOSPaymentIntegrationError(id);
    return this.repo.updatePaymentIntegration(schoolId, id, data as any);
  }
  async deletePaymentIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPaymentIntegration(schoolId, id);
    if (!existing) throw new EduOSPaymentIntegrationError(id);
    return this.repo.deletePaymentIntegration(schoolId, id);
  }
}

