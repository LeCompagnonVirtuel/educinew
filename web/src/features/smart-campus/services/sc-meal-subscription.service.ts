import type { SupabaseClient } from '@supabase/supabase-js';
import type { MealSubscription, MealSubscriptionCreate } from '@educi/types';
import { ScSubscriptionNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMealSubscriptionService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getSubscription(schoolId: string, id: string): Promise<MealSubscription> {
    const subscription = await this.repo.findMealSubscriptionById(schoolId, id);
    if (!subscription) throw new ScSubscriptionNotFoundError(id);
    return subscription;
  }

  async listSubscriptions(schoolId: string, filters?: Record<string, unknown>): Promise<MealSubscription[]> {
    return this.repo.findAllMealSubscriptions(schoolId, filters);
  }

  async createSubscription(schoolId: string, data: MealSubscriptionCreate): Promise<MealSubscription> {
    return this.repo.createMealSubscription(schoolId, data);
  }

  async updateSubscription(schoolId: string, id: string, data: Partial<MealSubscriptionCreate>): Promise<MealSubscription> {
    const existing = await this.repo.findMealSubscriptionById(schoolId, id);
    if (!existing) throw new ScSubscriptionNotFoundError(id);
    return this.repo.updateMealSubscription(schoolId, id, data);
  }

  async deleteSubscription(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMealSubscriptionById(schoolId, id);
    if (!existing) throw new ScSubscriptionNotFoundError(id);
    return this.repo.deleteMealSubscription(schoolId, id);
  }

  async countSubscriptions(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMealSubscriptions(schoolId, filters);
  }
}
