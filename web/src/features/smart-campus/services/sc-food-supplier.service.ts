import type { SupabaseClient } from '@supabase/supabase-js';
import type { FoodSupplier, FoodSupplierCreate } from '@educi/types';
import { ScSupplierNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScFoodSupplierService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getSupplier(schoolId: string, id: string): Promise<FoodSupplier> {
    const supplier = await this.repo.findFoodSupplierById(schoolId, id);
    if (!supplier) throw new ScSupplierNotFoundError(id);
    return supplier;
  }

  async listSuppliers(schoolId: string, filters?: Record<string, unknown>): Promise<FoodSupplier[]> {
    return this.repo.findAllFoodSuppliers(schoolId, filters);
  }

  async createSupplier(schoolId: string, data: FoodSupplierCreate): Promise<FoodSupplier> {
    return this.repo.createFoodSupplier(schoolId, data);
  }

  async updateSupplier(schoolId: string, id: string, data: Partial<FoodSupplierCreate>): Promise<FoodSupplier> {
    const existing = await this.repo.findFoodSupplierById(schoolId, id);
    if (!existing) throw new ScSupplierNotFoundError(id);
    return this.repo.updateFoodSupplier(schoolId, id, data);
  }

  async deleteSupplier(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findFoodSupplierById(schoolId, id);
    if (!existing) throw new ScSupplierNotFoundError(id);
    return this.repo.deleteFoodSupplier(schoolId, id);
  }

  async countSuppliers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countFoodSuppliers(schoolId, filters);
  }
}
