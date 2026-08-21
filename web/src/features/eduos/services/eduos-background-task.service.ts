import type { SupabaseClient } from '@supabase/supabase-js';
import type { BackgroundTask } from '@educi/types';
import { EduOSBackgroundTaskError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSBackgroundTaskService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getBackgroundTask(schoolId: string, id: string): Promise<BackgroundTask> {
    const item = await this.repo.getBackgroundTask(schoolId, id);
    if (!item) throw new EduOSBackgroundTaskError(id);
    return item;
  }
  async listBackgroundTasks(schoolId: string, filters?: Record<string, unknown>): Promise<BackgroundTask[]> {
    return this.repo.listBackgroundTasks(schoolId, filters);
  }
  async createBackgroundTask(schoolId: string, data: Partial<BackgroundTask>): Promise<BackgroundTask> {
    return this.repo.createBackgroundTask(schoolId, data as any);
  }
  async updateBackgroundTask(schoolId: string, id: string, data: Partial<BackgroundTask>): Promise<BackgroundTask> {
    const existing = await this.repo.getBackgroundTask(schoolId, id);
    if (!existing) throw new EduOSBackgroundTaskError(id);
    return this.repo.updateBackgroundTask(schoolId, id, data as any);
  }
  async deleteBackgroundTask(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getBackgroundTask(schoolId, id);
    if (!existing) throw new EduOSBackgroundTaskError(id);
    return this.repo.deleteBackgroundTask(schoolId, id);
  }
}

