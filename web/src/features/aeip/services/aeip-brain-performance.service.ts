import type { SupabaseClient } from '@supabase/supabase-js';
import type { BrainPerformance } from '@educi/types';
import { AEIPDigitalBrainPerformanceError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AeipBrainPerformanceService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getPerformance(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listPerformances(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createPerformance(schoolId: string, data: Partial<BrainPerformance>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updatePerformance(schoolId: string, id: string, data: Partial<BrainPerformance>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deletePerformance(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}
