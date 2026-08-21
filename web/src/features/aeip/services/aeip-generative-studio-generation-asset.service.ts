import type { SupabaseClient } from '@supabase/supabase-js';
import type { GenerationAsset } from '@educi/types';
import { AEIPGenerativeStudioAssetError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGenerativeStudioAssetService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getAsset(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listAssets(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createAsset(schoolId: string, data: Partial<GenerationAsset>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateAsset(schoolId: string, id: string, data: Partial<GenerationAsset>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteAsset(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}