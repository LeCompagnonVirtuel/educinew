import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfraMonitor } from '@educi/types';
import { AEIPAutonomousInfraMonitorError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousInfraMonitorService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getMonitor(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listMonitors(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createMonitor(schoolId: string, data: Partial<InfraMonitor>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateMonitor(schoolId: string, id: string, data: Partial<InfraMonitor>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteMonitor(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}