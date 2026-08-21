import type { SupabaseClient } from '@supabase/supabase-js';
import type { DataMesh } from '@educi/types';
import { EduOSDataMeshError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDataMeshService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDataMesh(schoolId: string, id: string): Promise<DataMesh> {
    const item = await this.repo.getDataMesh(schoolId, id);
    if (!item) throw new EduOSDataMeshError(id);
    return item;
  }
  async listDataMeshs(schoolId: string, filters?: Record<string, unknown>): Promise<DataMesh[]> {
    return this.repo.listDataMeshs(schoolId, filters);
  }
  async createDataMesh(schoolId: string, data: Partial<DataMesh>): Promise<DataMesh> {
    return this.repo.createDataMesh(schoolId, data as any);
  }
  async updateDataMesh(schoolId: string, id: string, data: Partial<DataMesh>): Promise<DataMesh> {
    const existing = await this.repo.getDataMesh(schoolId, id);
    if (!existing) throw new EduOSDataMeshError(id);
    return this.repo.updateDataMesh(schoolId, id, data as any);
  }
  async deleteDataMesh(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDataMesh(schoolId, id);
    if (!existing) throw new EduOSDataMeshError(id);
    return this.repo.deleteDataMesh(schoolId, id);
  }
}

