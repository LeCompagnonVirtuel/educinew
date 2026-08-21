import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchedulerRun } from '@educi/types';
import { EduCloudSchedulerRunError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSchedulerRun {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSchedulerRun(schoolId: string, id: string): Promise<SchedulerRun> {
    const item = await this.repo.getSchedulerRun(schoolId, id);
    if (!item) throw new EduCloudSchedulerRunError(id);
    return item;
  }
  async listSchedulerRuns(schoolId: string, filters?: Record<string, unknown>): Promise<SchedulerRun[]> {
    return this.repo.listSchedulerRun(schoolId, filters);
  }
  async createSchedulerRun(schoolId: string, data: Partial<SchedulerRun>): Promise<SchedulerRun> {
    return this.repo.createSchedulerRun(schoolId, data as any);
  }
  async updateSchedulerRun(schoolId: string, id: string, data: Partial<SchedulerRun>): Promise<SchedulerRun> {
    const existing = await this.repo.getSchedulerRun(schoolId, id);
    if (!existing) throw new EduCloudSchedulerRunError(id);
    return this.repo.updateSchedulerRun(schoolId, id, data as any);
  }
  async deleteSchedulerRun(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSchedulerRun(schoolId, id);
    if (!existing) throw new EduCloudSchedulerRunError(id);
    return this.repo.deleteSchedulerRun(schoolId, id);
  }
}
