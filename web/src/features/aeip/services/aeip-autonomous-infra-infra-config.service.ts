import type { SupabaseClient } from '@supabase/supabase-js';
import type { InfraConfig } from '@educi/types';
import { AEIPAutonomousInfraConfigError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousInfraConfigService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getConfig(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listConfigs(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createConfig(schoolId: string, data: Partial<InfraConfig>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateConfig(schoolId: string, id: string, data: Partial<InfraConfig>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteConfig(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}