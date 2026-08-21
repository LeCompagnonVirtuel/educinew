import type { SupabaseClient } from '@supabase/supabase-js';
import type { Progress, ProgressCreate, Completion } from '@educi/types';
import { LxpProgressNotFoundError, LxpProgressUpdateError, LxpCompletionNotFoundError, LxpCompletionRecordError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpProgressService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getProgress(schoolId: string, userId: string, courseId: string): Promise<Progress> {
    const progress = await this.repo.findProgressById(schoolId, userId, courseId);
    if (!progress) throw new LxpProgressNotFoundError();
    return progress;
  }

  async updateProgress(userId: string, courseId: string, data: Partial<ProgressCreate>): Promise<Progress> {
    const updated = await this.repo.updateProgress(userId, courseId, data);
    if (!updated) throw new LxpProgressUpdateError();
    return updated;
  }

  async recordCompletion(userId: string, courseId: string, data: Omit<Completion, 'id' | 'createdAt' | 'completedAt'>): Promise<Completion> {
    const completed = await this.repo.recordCompletion(userId, courseId, data);
    if (!completed) throw new LxpCompletionRecordError();
    return completed;
  }

  async getCompletion(schoolId: string, userId: string, courseId: string): Promise<Completion> {
    const completion = await this.repo.findCompletionById(schoolId, userId, courseId);
    if (!completion) throw new LxpCompletionNotFoundError();
    return completion;
  }

  async getUserCourseProgress(schoolId: string, userId: string): Promise<readonly Progress[]> {
    return this.repo.findUserCourseProgress(schoolId, userId);
  }

  async getCourseCompletionStats(schoolId: string, courseId: string): Promise<{ total: number; completed: number; inProgress: number }> {
    return this.repo.getCourseCompletionStats(schoolId, courseId);
  }
}
