import type { SupabaseClient } from '@supabase/supabase-js';
import type { GenerationVersion } from '@educi/types';
import { AEIPGenerativeStudioVersionError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGenerativeStudioVersionService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getVersion(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listVersions(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createVersion(schoolId: string, data: Partial<GenerationVersion>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateVersion(schoolId: string, id: string, data: Partial<GenerationVersion>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteVersion(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}