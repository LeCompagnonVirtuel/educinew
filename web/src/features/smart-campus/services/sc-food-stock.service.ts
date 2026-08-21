import type { SupabaseClient } from '@supabase/supabase-js';
import type { FoodStock, FoodStockCreate } from '@educi/types';
import { ScFoodStockNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScFoodStockService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getFoodStock(schoolId: string, id: string): Promise<FoodStock> {
    const stock = await this.repo.findFoodStockById(schoolId, id);
    if (!stock) throw new ScFoodStockNotFoundError(id);
    return stock;
  }

  async listFoodStocks(schoolId: string, filters?: Record<string, unknown>): Promise<FoodStock[]> {
    return this.repo.findAllFoodStocks(schoolId, filters);
  }

  async createFoodStock(schoolId: string, data: FoodStockCreate): Promise<FoodStock> {
    return this.repo.createFoodStock(schoolId, data);
  }

  async updateFoodStock(schoolId: string, id: string, data: Partial<FoodStockCreate>): Promise<FoodStock> {
    const existing = await this.repo.findFoodStockById(schoolId, id);
    if (!existing) throw new ScFoodStockNotFoundError(id);
    return this.repo.updateFoodStock(schoolId, id, data);
  }

  async deleteFoodStock(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFoodStockById(schoolId, id);
    if (!existing) throw new ScFoodStockNotFoundError(id);
    return this.repo.deleteFoodStock(schoolId, id);
  }

  async countFoodStocks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFoodStocks(schoolId, filters);
  }
}
