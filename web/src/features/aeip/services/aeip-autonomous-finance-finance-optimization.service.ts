import type { SupabaseClient } from '@supabase/supabase-js';
import type { FinanceOptimization } from '@educi/types';
import { AEIPAutonomousFinanceOptimizationError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousFinanceOptimizationService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getOptimization(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listOptimizations(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createOptimization(schoolId: string, data: Partial<FinanceOptimization>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateOptimization(schoolId: string, id: string, data: Partial<FinanceOptimization>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteOptimization(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}