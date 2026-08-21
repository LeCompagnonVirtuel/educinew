import type { SupabaseClient } from '@supabase/supabase-js';
import type { MealPayment, MealPaymentCreate } from '@educi/types';
import { ScPaymentNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMealPaymentService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getPayment(schoolId: string, id: string): Promise<MealPayment> {
    const payment = await this.repo.findMealPaymentById(schoolId, id);
    if (!payment) throw new ScPaymentNotFoundError(id);
    return payment;
  }

  async listPayments(schoolId: string, filters?: Record<string, unknown>): Promise<MealPayment[]> {
    return this.repo.findAllMealPayments(schoolId, filters);
  }

  async createPayment(schoolId: string, data: MealPaymentCreate): Promise<MealPayment> {
    return this.repo.createMealPayment(schoolId, data);
  }

  async updatePayment(schoolId: string, id: string, data: Partial<MealPaymentCreate>): Promise<MealPayment> {
    const existing = await this.repo.findMealPaymentById(schoolId, id);
    if (!existing) throw new ScPaymentNotFoundError(id);
    return this.repo.updateMealPayment(schoolId, id, data);
  }

  async deletePayment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMealPaymentById(schoolId, id);
    if (!existing) throw new ScPaymentNotFoundError(id);
    return this.repo.deleteMealPayment(schoolId, id);
  }

  async countPayments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMealPayments(schoolId, filters);
  }
}
