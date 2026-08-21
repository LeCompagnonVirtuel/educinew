import type { SupabaseClient } from '@supabase/supabase-js';
import type { JobRunner } from '@educi/types';
import { EduOSJobRunnerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSJobRunnerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getJobRunner(schoolId: string, id: string): Promise<JobRunner> {
    const item = await this.repo.getJobRunner(schoolId, id);
    if (!item) throw new EduOSJobRunnerError(id);
    return item;
  }
  async listJobRunners(schoolId: string, filters?: Record<string, unknown>): Promise<JobRunner[]> {
    return this.repo.listJobRunners(schoolId, filters);
  }
  async createJobRunner(schoolId: string, data: Partial<JobRunner>): Promise<JobRunner> {
    return this.repo.createJobRunner(schoolId, data as any);
  }
  async updateJobRunner(schoolId: string, id: string, data: Partial<JobRunner>): Promise<JobRunner> {
    const existing = await this.repo.getJobRunner(schoolId, id);
    if (!existing) throw new EduOSJobRunnerError(id);
    return this.repo.updateJobRunner(schoolId, id, data as any);
  }
  async deleteJobRunner(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getJobRunner(schoolId, id);
    if (!existing) throw new EduOSJobRunnerError(id);
    return this.repo.deleteJobRunner(schoolId, id);
  }
}

