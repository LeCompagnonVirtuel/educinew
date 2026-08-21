import type { SupabaseClient } from '@supabase/supabase-js';
import type { OperationAlert } from '@educi/types';
import { AEIPAutonomousOpsAlertError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousOpsAlertService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getAlert(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listAlerts(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createAlert(schoolId: string, data: Partial<OperationAlert>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateAlert(schoolId: string, id: string, data: Partial<OperationAlert>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteAlert(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}