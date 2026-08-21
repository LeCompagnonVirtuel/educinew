import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIProcess } from '@educi/types';
import { AEIPOSProcessError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPOSProcessService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getProcess(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listProcesses(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createProcess(schoolId: string, data: Partial<AIProcess>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateProcess(schoolId: string, id: string, data: Partial<AIProcess>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteProcess(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}