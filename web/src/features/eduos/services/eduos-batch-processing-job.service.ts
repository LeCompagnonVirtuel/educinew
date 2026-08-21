import type { SupabaseClient } from '@supabase/supabase-js';
import type { BatchProcessingJob } from '@educi/types';
import { EduOSBatchProcessingJobError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBatchProcessingJobService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBatchProcessingJob(schoolId: string, id: string): Promise<BatchProcessingJob> {
    const item = await this.repo.getBatchProcessingJob(schoolId, id);
    if (!item) throw new EduOSBatchProcessingJobError(id);
    return item;
  }
  async listBatchProcessingJobs(schoolId: string, filters?: Record<string, unknown>): Promise<BatchProcessingJob[]> {
    return this.repo.listBatchProcessingJobs(schoolId, filters);
  }
  async createBatchProcessingJob(schoolId: string, data: Partial<BatchProcessingJob>): Promise<BatchProcessingJob> {
    return this.repo.createBatchProcessingJob(schoolId, data as any);
  }
  async updateBatchProcessingJob(schoolId: string, id: string, data: Partial<BatchProcessingJob>): Promise<BatchProcessingJob> {
    const existing = await this.repo.getBatchProcessingJob(schoolId, id);
    if (!existing) throw new EduOSBatchProcessingJobError(id);
    return this.repo.updateBatchProcessingJob(schoolId, id, data as any);
  }
  async deleteBatchProcessingJob(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBatchProcessingJob(schoolId, id);
    if (!existing) throw new EduOSBatchProcessingJobError(id);
    return this.repo.deleteBatchProcessingJob(schoolId, id);
  }
}

