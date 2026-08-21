import type { SupabaseClient } from '@supabase/supabase-js';
import type { CognitiveProcess } from '@educi/types';
import { AEIPDigitalBrainCognitiveProcessError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AeipCognitiveProcessService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getProcess(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listProcesses(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createProcess(schoolId: string, data: Partial<CognitiveProcess>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateProcess(schoolId: string, id: string, data: Partial<CognitiveProcess>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteProcess(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}
