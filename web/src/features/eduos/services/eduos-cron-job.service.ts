import type { SupabaseClient } from '@supabase/supabase-js';
import type { CronJob } from '@educi/types';
import { EduOSCronJobError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCronJobService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCronJob(schoolId: string, id: string): Promise<CronJob> {
    const item = await this.repo.getCronJob(schoolId, id);
    if (!item) throw new EduOSCronJobError(id);
    return item;
  }
  async listCronJobs(schoolId: string, filters?: Record<string, unknown>): Promise<CronJob[]> {
    return this.repo.listCronJobs(schoolId, filters);
  }
  async createCronJob(schoolId: string, data: Partial<CronJob>): Promise<CronJob> {
    return this.repo.createCronJob(schoolId, data as any);
  }
  async updateCronJob(schoolId: string, id: string, data: Partial<CronJob>): Promise<CronJob> {
    const existing = await this.repo.getCronJob(schoolId, id);
    if (!existing) throw new EduOSCronJobError(id);
    return this.repo.updateCronJob(schoolId, id, data as any);
  }
  async deleteCronJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCronJob(schoolId, id);
    if (!existing) throw new EduOSCronJobError(id);
    return this.repo.deleteCronJob(schoolId, id);
  }
}

