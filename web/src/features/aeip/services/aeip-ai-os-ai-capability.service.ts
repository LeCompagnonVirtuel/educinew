import type { SupabaseClient } from '@supabase/supabase-js';
import type { AICapability } from '@educi/types';
import { AEIPOSCapabilityError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPOSCapabilityService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getCapability(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listCapabilities(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createCapability(schoolId: string, data: Partial<AICapability>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateCapability(schoolId: string, id: string, data: Partial<AICapability>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteCapability(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}