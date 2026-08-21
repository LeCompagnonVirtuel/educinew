import type { SupabaseClient } from '@supabase/supabase-js';
import type { OperationSchedule } from '@educi/types';
import { AEIPAutonomousOpsScheduleError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousOpsScheduleService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getSchedule(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listSchedules(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createSchedule(schoolId: string, data: Partial<OperationSchedule>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateSchedule(schoolId: string, id: string, data: Partial<OperationSchedule>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteSchedule(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}