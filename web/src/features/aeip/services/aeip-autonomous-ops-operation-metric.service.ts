import type { SupabaseClient } from '@supabase/supabase-js';
import type { OperationMetric } from '@educi/types';
import { AEIPAutonomousOpsMetricError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousOpsMetricService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getMetric(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listMetrics(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createMetric(schoolId: string, data: Partial<OperationMetric>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateMetric(schoolId: string, id: string, data: Partial<OperationMetric>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteMetric(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}