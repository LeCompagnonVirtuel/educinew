import type { SupabaseClient } from '@supabase/supabase-js';
import type { MeshTraffic } from '@educi/types';
import { EduCloudMeshTrafficError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudMeshTraffic {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getMeshTraffic(schoolId: string, id: string): Promise<MeshTraffic> {
    const item = await this.repo.getMeshTraffic(schoolId, id);
    if (!item) throw new EduCloudMeshTrafficError(id);
    return item;
  }
  async listMeshTraffics(schoolId: string, filters?: Record<string, unknown>): Promise<MeshTraffic[]> {
    return this.repo.listMeshTraffic(schoolId, filters);
  }
  async createMeshTraffic(schoolId: string, data: Partial<MeshTraffic>): Promise<MeshTraffic> {
    return this.repo.createMeshTraffic(schoolId, data as any);
  }
  async updateMeshTraffic(schoolId: string, id: string, data: Partial<MeshTraffic>): Promise<MeshTraffic> {
    const existing = await this.repo.getMeshTraffic(schoolId, id);
    if (!existing) throw new EduCloudMeshTrafficError(id);
    return this.repo.updateMeshTraffic(schoolId, id, data as any);
  }
  async deleteMeshTraffic(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMeshTraffic(schoolId, id);
    if (!existing) throw new EduCloudMeshTrafficError(id);
    return this.repo.deleteMeshTraffic(schoolId, id);
  }
}
