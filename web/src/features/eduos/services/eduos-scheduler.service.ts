import type { SupabaseClient } from '@supabase/supabase-js';
import type { Scheduler } from '@educi/types';
import { EduOSSchedulerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSchedulerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getScheduler(schoolId: string, id: string): Promise<Scheduler> {
    const item = await this.repo.getScheduler(schoolId, id);
    if (!item) throw new EduOSSchedulerError(id);
    return item;
  }
  async listSchedulers(schoolId: string, filters?: Record<string, unknown>): Promise<Scheduler[]> {
    return this.repo.listSchedulers(schoolId, filters);
  }
  async createScheduler(schoolId: string, data: Partial<Scheduler>): Promise<Scheduler> {
    return this.repo.createScheduler(schoolId, data as any);
  }
  async updateScheduler(schoolId: string, id: string, data: Partial<Scheduler>): Promise<Scheduler> {
    const existing = await this.repo.getScheduler(schoolId, id);
    if (!existing) throw new EduOSSchedulerError(id);
    return this.repo.updateScheduler(schoolId, id, data as any);
  }
  async deleteScheduler(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getScheduler(schoolId, id);
    if (!existing) throw new EduOSSchedulerError(id);
    return this.repo.deleteScheduler(schoolId, id);
  }
}

