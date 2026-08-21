import type { SupabaseClient } from '@supabase/supabase-js';
import type { MealOrder, MealOrderCreate } from '@educi/types';
import { ScOrderNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMealOrderService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getOrder(schoolId: string, id: string): Promise<MealOrder> {
    const order = await this.repo.findMealOrderById(schoolId, id);
    if (!order) throw new ScOrderNotFoundError(id);
    return order;
  }

  async listOrders(schoolId: string, filters?: Record<string, unknown>): Promise<MealOrder[]> {
    return this.repo.findAllMealOrders(schoolId, filters);
  }

  async createOrder(schoolId: string, data: MealOrderCreate): Promise<MealOrder> {
    return this.repo.createMealOrder(schoolId, data);
  }

  async updateOrder(schoolId: string, id: string, data: Partial<MealOrderCreate>): Promise<MealOrder> {
    const existing = await this.repo.findMealOrderById(schoolId, id);
    if (!existing) throw new ScOrderNotFoundError(id);
    return this.repo.updateMealOrder(schoolId, id, data);
  }

  async deleteOrder(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMealOrderById(schoolId, id);
    if (!existing) throw new ScOrderNotFoundError(id);
    return this.repo.deleteMealOrder(schoolId, id);
  }

  async countOrders(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMealOrders(schoolId, filters);
  }
}
