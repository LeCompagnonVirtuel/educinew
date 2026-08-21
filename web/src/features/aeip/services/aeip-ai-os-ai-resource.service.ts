import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIResource } from '@educi/types';
import { AEIPOSResourceError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPOSResourceService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getResource(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listResources(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createResource(schoolId: string, data: Partial<AIResource>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateResource(schoolId: string, id: string, data: Partial<AIResource>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteResource(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}