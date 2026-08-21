import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProductSubscription } from '@educi/types';
import { EduOSProductSubscriptionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSProductSubscriptionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getProductSubscription(schoolId: string, id: string): Promise<ProductSubscription> {
    const item = await this.repo.getProductSubscription(schoolId, id);
    if (!item) throw new EduOSProductSubscriptionError(id);
    return item;
  }
  async listProductSubscriptions(schoolId: string, filters?: Record<string, unknown>): Promise<ProductSubscription[]> {
    return this.repo.listProductSubscriptions(schoolId, filters);
  }
  async createProductSubscription(schoolId: string, data: Partial<ProductSubscription>): Promise<ProductSubscription> {
    return this.repo.createProductSubscription(schoolId, data as any);
  }
  async updateProductSubscription(schoolId: string, id: string, data: Partial<ProductSubscription>): Promise<ProductSubscription> {
    const existing = await this.repo.getProductSubscription(schoolId, id);
    if (!existing) throw new EduOSProductSubscriptionError(id);
    return this.repo.updateProductSubscription(schoolId, id, data as any);
  }
  async deleteProductSubscription(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProductSubscription(schoolId, id);
    if (!existing) throw new EduOSProductSubscriptionError(id);
    return this.repo.deleteProductSubscription(schoolId, id);
  }
}

