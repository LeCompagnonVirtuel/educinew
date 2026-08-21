import type { SupabaseClient } from '@supabase/supabase-js';
import type { FinanceBudget } from '@educi/types';
import { AEIPAutonomousFinanceBudgetError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousFinanceBudgetService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getBudget(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listBudgets(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createBudget(schoolId: string, data: Partial<FinanceBudget>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateBudget(schoolId: string, id: string, data: Partial<FinanceBudget>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteBudget(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}