import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudZone } from '@educi/types';
import { EduCloudCloudZoneError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudZone {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudZone(schoolId: string, id: string): Promise<CloudZone> {
    const item = await this.repo.getCloudZone(schoolId, id);
    if (!item) throw new EduCloudCloudZoneError(id);
    return item;
  }
  async listCloudZones(schoolId: string, filters?: Record<string, unknown>): Promise<CloudZone[]> {
    return this.repo.listCloudZone(schoolId, filters);
  }
  async createCloudZone(schoolId: string, data: Partial<CloudZone>): Promise<CloudZone> {
    return this.repo.createCloudZone(schoolId, data as any);
  }
  async updateCloudZone(schoolId: string, id: string, data: Partial<CloudZone>): Promise<CloudZone> {
    const existing = await this.repo.getCloudZone(schoolId, id);
    if (!existing) throw new EduCloudCloudZoneError(id);
    return this.repo.updateCloudZone(schoolId, id, data as any);
  }
  async deleteCloudZone(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudZone(schoolId, id);
    if (!existing) throw new EduCloudCloudZoneError(id);
    return this.repo.deleteCloudZone(schoolId, id);
  }
}
