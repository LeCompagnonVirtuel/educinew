import type { SupabaseClient } from '@supabase/supabase-js';
import type { FinanceAnomaly } from '@educi/types';
import { AEIPAutonomousFinanceAnomalyError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousFinanceAnomalyService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getAnomaly(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listAnomalies(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createAnomaly(schoolId: string, data: Partial<FinanceAnomaly>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateAnomaly(schoolId: string, id: string, data: Partial<FinanceAnomaly>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteAnomaly(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}