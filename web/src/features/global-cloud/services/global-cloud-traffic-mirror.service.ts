import type { SupabaseClient } from '@supabase/supabase-js';
import type { TrafficMirror } from '@educi/types';
import { EduCloudTrafficMirrorError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudTrafficMirror {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getTrafficMirror(schoolId: string, id: string): Promise<TrafficMirror> {
    const item = await this.repo.getTrafficMirror(schoolId, id);
    if (!item) throw new EduCloudTrafficMirrorError(id);
    return item;
  }
  async listTrafficMirrors(schoolId: string, filters?: Record<string, unknown>): Promise<TrafficMirror[]> {
    return this.repo.listTrafficMirror(schoolId, filters);
  }
  async createTrafficMirror(schoolId: string, data: Partial<TrafficMirror>): Promise<TrafficMirror> {
    return this.repo.createTrafficMirror(schoolId, data as any);
  }
  async updateTrafficMirror(schoolId: string, id: string, data: Partial<TrafficMirror>): Promise<TrafficMirror> {
    const existing = await this.repo.getTrafficMirror(schoolId, id);
    if (!existing) throw new EduCloudTrafficMirrorError(id);
    return this.repo.updateTrafficMirror(schoolId, id, data as any);
  }
  async deleteTrafficMirror(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTrafficMirror(schoolId, id);
    if (!existing) throw new EduCloudTrafficMirrorError(id);
    return this.repo.deleteTrafficMirror(schoolId, id);
  }
}
