import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningPath, LearningPathCreate, LearningPathUpdate, LearningPathAnalytics, PathEnrollment, PathProgress, PathCompletion } from '@educi/types';
import { LxpPathNotFoundError, LxpPathCreateError, LxpPathUpdateError, LxpPathDeleteError, LxpPathEnrollError, LxpPathCompleteError, LxpPathProgressError, LxpPathPrerequisiteError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpLearningPathService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getLearningPath(schoolId: string, id: string): Promise<LearningPath> {
    const path = await this.repo.findLearningPathById(schoolId, id);
    if (!path) throw new LxpPathNotFoundError(id);
    return path;
  }

  async listLearningPaths(schoolId: string): Promise<readonly LearningPath[]> {
    return this.repo.findLearningPaths(schoolId);
  }

  async createLearningPath(data: LearningPathCreate): Promise<LearningPath> {
    const created = await this.repo.createLearningPath(data);
    if (!created) throw new LxpPathCreateError();
    return created;
  }

  async updateLearningPath(schoolId: string, id: string, data: LearningPathUpdate): Promise<LearningPath> {
    const existing = await this.repo.findLearningPathById(schoolId, id);
    if (!existing) throw new LxpPathNotFoundError(id);
    const updated = await this.repo.updateLearningPath(id, data);
    if (!updated) throw new LxpPathUpdateError();
    return updated;
  }

  async deleteLearningPath(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLearningPathById(schoolId, id);
    if (!existing) throw new LxpPathNotFoundError(id);
    const deleted = await this.repo.deleteLearningPath(id);
    if (!deleted) throw new LxpPathDeleteError();
  }

  async enrollInPath(learningPathId: string, userId: string): Promise<PathEnrollment> {
    const enrollment = await this.repo.enrollInLearningPath(learningPathId, userId);
    if (!enrollment) throw new LxpPathEnrollError();
    return enrollment;
  }

  async getPathProgress(learningPathId: string, userId: string): Promise<PathProgress> {
    const progress = await this.repo.getLearningPathProgress(learningPathId, userId);
    if (!progress) throw new LxpPathProgressError();
    return progress;
  }

  async getPathAnalytics(schoolId: string, id: string): Promise<LearningPathAnalytics> {
    const existing = await this.repo.findLearningPathById(schoolId, id);
    if (!existing) throw new LxpPathNotFoundError(id);
    const analytics = await this.repo.getLearningPathAnalytics(id);
    if (!analytics) throw new LxpPathProgressError();
    return analytics;
  }
}
