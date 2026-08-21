import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchedulerJob } from '@educi/types';
import { EduCloudSchedulerJobError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudSchedulerJob {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getSchedulerJob(schoolId: string, id: string): Promise<SchedulerJob> {
    const item = await this.repo.getSchedulerJob(schoolId, id);
    if (!item) throw new EduCloudSchedulerJobError(id);
    return item;
  }
  async listSchedulerJobs(schoolId: string, filters?: Record<string, unknown>): Promise<SchedulerJob[]> {
    return this.repo.listSchedulerJob(schoolId, filters);
  }
  async createSchedulerJob(schoolId: string, data: Partial<SchedulerJob>): Promise<SchedulerJob> {
    return this.repo.createSchedulerJob(schoolId, data as any);
  }
  async updateSchedulerJob(schoolId: string, id: string, data: Partial<SchedulerJob>): Promise<SchedulerJob> {
    const existing = await this.repo.getSchedulerJob(schoolId, id);
    if (!existing) throw new EduCloudSchedulerJobError(id);
    return this.repo.updateSchedulerJob(schoolId, id, data as any);
  }
  async deleteSchedulerJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSchedulerJob(schoolId, id);
    if (!existing) throw new EduCloudSchedulerJobError(id);
    return this.repo.deleteSchedulerJob(schoolId, id);
  }
}
