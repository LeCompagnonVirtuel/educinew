import type { SupabaseClient } from '@supabase/supabase-js';
import type { MeshService } from '@educi/types';
import { EduCloudMeshServiceError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMeshService {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMeshService(schoolId: string, id: string): Promise<MeshService> {
    const item = await this.repo.getMeshService(schoolId, id);
    if (!item) throw new EduCloudMeshServiceError(id);
    return item;
  }
  async listMeshServices(schoolId: string, filters?: Record<string, unknown>): Promise<MeshService[]> {
    return this.repo.listMeshService(schoolId, filters);
  }
  async createMeshService(schoolId: string, data: Partial<MeshService>): Promise<MeshService> {
    return this.repo.createMeshService(schoolId, data as any);
  }
  async updateMeshService(schoolId: string, id: string, data: Partial<MeshService>): Promise<MeshService> {
    const existing = await this.repo.getMeshService(schoolId, id);
    if (!existing) throw new EduCloudMeshServiceError(id);
    return this.repo.updateMeshService(schoolId, id, data as any);
  }
  async deleteMeshService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMeshService(schoolId, id);
    if (!existing) throw new EduCloudMeshServiceError(id);
    return this.repo.deleteMeshService(schoolId, id);
  }
}
