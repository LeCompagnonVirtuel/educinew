import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudScheduler } from '@educi/types';
import { EduCloudCloudSchedulerError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudCloudScheduler {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getCloudScheduler(schoolId: string, id: string): Promise<CloudScheduler> {
    const item = await this.repo.getCloudScheduler(schoolId, id);
    if (!item) throw new EduCloudCloudSchedulerError(id);
    return item;
  }
  async listCloudSchedulers(schoolId: string, filters?: Record<string, unknown>): Promise<CloudScheduler[]> {
    return this.repo.listCloudScheduler(schoolId, filters);
  }
  async createCloudScheduler(schoolId: string, data: Partial<CloudScheduler>): Promise<CloudScheduler> {
    return this.repo.createCloudScheduler(schoolId, data as any);
  }
  async updateCloudScheduler(schoolId: string, id: string, data: Partial<CloudScheduler>): Promise<CloudScheduler> {
    const existing = await this.repo.getCloudScheduler(schoolId, id);
    if (!existing) throw new EduCloudCloudSchedulerError(id);
    return this.repo.updateCloudScheduler(schoolId, id, data as any);
  }
  async deleteCloudScheduler(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudScheduler(schoolId, id);
    if (!existing) throw new EduCloudCloudSchedulerError(id);
    return this.repo.deleteCloudScheduler(schoolId, id);
  }
}
