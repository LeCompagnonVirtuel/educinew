import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIServiceLog } from '@educi/types';
import { AEIPOSServiceLogError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPOSServiceLogService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getServiceLog(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listServiceLogs(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createServiceLog(schoolId: string, data: Partial<AIServiceLog>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateServiceLog(schoolId: string, id: string, data: Partial<AIServiceLog>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteServiceLog(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}