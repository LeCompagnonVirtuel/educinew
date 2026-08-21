import type { SupabaseClient } from '@supabase/supabase-js';
import type { CompetencyPath, CompetencyMapping } from '@educi/types';
import { LxpPathNotFoundError, LxpCompetencyPathError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpCompetencyPathService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getCompetencyPath(schoolId: string, learningPathId: string): Promise<CompetencyPath> {
    const path = await this.repo.findCompetencyPathByLearningPathId(schoolId, learningPathId);
    if (!path) throw new LxpPathNotFoundError(learningPathId);
    return path;
  }

  async createCompetencyPath(learningPathId: string, competencies: readonly CompetencyMapping[]): Promise<CompetencyPath> {
    const created = await this.repo.createCompetencyPath(learningPathId, competencies);
    if (!created) throw new LxpCompetencyPathError();
    return created;
  }

  async updateCompetencyPath(learningPathId: string, competencies: readonly CompetencyMapping[]): Promise<CompetencyPath> {
    const updated = await this.repo.updateCompetencyPath(learningPathId, competencies);
    if (!updated) throw new LxpCompetencyPathError();
    return updated;
  }

  async getCompetencyProgress(learningPathId: string, userId: string): Promise<readonly CompetencyMapping[]> {
    const progress = await this.repo.getCompetencyPathProgress(learningPathId, userId);
    if (!progress) throw new LxpCompetencyPathError();
    return progress;
  }

  async assessCompetency(learningPathId: string, userId: string, competencyId: string, score: number): Promise<boolean> {
    const result = await this.repo.assessCompetency(learningPathId, userId, competencyId, score);
    if (!result) throw new LxpCompetencyPathError();
    return result;
  }
}
