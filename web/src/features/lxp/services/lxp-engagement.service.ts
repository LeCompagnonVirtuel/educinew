import type { SupabaseClient } from '@supabase/supabase-js';
import type { Engagement, EngagementCreate } from '@educi/types';
import { LxpEngagementNotFoundError, LxpEngagementUpdateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpEngagementService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getEngagement(schoolId: string, userId: string, courseId: string): Promise<Engagement> {
    const engagement = await this.repo.findEngagementById(schoolId, userId, courseId);
    if (!engagement) throw new LxpEngagementNotFoundError();
    return engagement;
  }

  async updateEngagement(userId: string, courseId: string, data: Partial<EngagementCreate>): Promise<Engagement> {
    const updated = await this.repo.updateEngagement(userId, courseId, data);
    if (!updated) throw new LxpEngagementUpdateError();
    return updated;
  }

  async getUserEngagements(schoolId: string, userId: string): Promise<readonly Engagement[]> {
    return this.repo.findUserEngagements(schoolId, userId);
  }

  async getCourseEngagementStats(schoolId: string, courseId: string): Promise<{ averageScore: number; totalUsers: number; distribution: readonly { level: string; count: number }[] }> {
    return this.repo.getCourseEngagementStats(schoolId, courseId);
  }

  async getEngagementLeaderboard(courseId: string): Promise<readonly { userId: string; score: number }[]> {
    return this.repo.getEngagementLeaderboard(courseId);
  }
}
