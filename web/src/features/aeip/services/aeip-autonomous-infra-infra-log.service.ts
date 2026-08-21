import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfraLog } from '@educi/types';
import { AEIPAutonomousInfraLogError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousInfraLogService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getLog(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listLogs(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createLog(schoolId: string, data: Partial<InfraLog>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateLog(schoolId: string, id: string, data: Partial<InfraLog>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteLog(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}