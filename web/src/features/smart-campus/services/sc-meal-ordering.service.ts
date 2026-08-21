import type { SupabaseClient } from '@supabase/supabase-js';
import type { MealOrder, MealOrderCreate } from '@educi/types';
import { ScMealOrderNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMealOrderingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async createOrder(schoolId: string, data: MealOrderCreate): Promise<MealOrder> {
    return this.repo.createMealOrder(schoolId, data);
  }

  async getOrder(schoolId: string, id: string): Promise<MealOrder> {
    const order = await this.repo.findMealOrderById(schoolId, id);
    if (!order) throw new ScMealOrderNotFoundError(id);
    return order;
  }

  async getOrdersByDate(schoolId: string, date: string): Promise<MealOrder[]> {
    return this.repo.findMealOrdersByDate(schoolId, date);
  }

  async getOrdersByStudent(schoolId: string, studentId: string): Promise<MealOrder[]> {
    return this.repo.findMealOrdersByStudent(schoolId, studentId);
  }

  async cancelOrder(schoolId: string, id: string): Promise<MealOrder> {
    const existing = await this.repo.findMealOrderById(schoolId, id);
    if (!existing) throw new ScMealOrderNotFoundError(id);
    return this.repo.cancelMealOrder(schoolId, id);
  }

  async fulfillOrder(schoolId: string, id: string): Promise<MealOrder> {
    const existing = await this.repo.findMealOrderById(schoolId, id);
    if (!existing) throw new ScMealOrderNotFoundError(id);
    return this.repo.fulfillMealOrder(schoolId, id);
  }

  async getPendingOrders(schoolId: string): Promise<MealOrder[]> {
    return this.repo.findPendingMealOrders(schoolId);
  }

  async getDailyOrderCount(schoolId: string, date: string): Promise<number> {
    return this.repo.getMealDailyOrderCount(schoolId, date);
  }
}
