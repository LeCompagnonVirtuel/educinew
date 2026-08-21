import type { SupabaseClient } from '@supabase/supabase-js';
import type { AdaptivePath, PersonalizedPath } from '@educi/types';
import { LxpPathNotFoundError, LxpAdaptivePathError, LxpPersonalizedPathError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpAdaptivePathService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getAdaptivePath(schoolId: string, learningPathId: string): Promise<AdaptivePath> {
    const path = await this.repo.findAdaptivePathByLearningPathId(schoolId, learningPathId);
    if (!path) throw new LxpPathNotFoundError(learningPathId);
    return path;
  }

  async createAdaptivePath(learningPathId: string, data: Omit<AdaptivePath, 'id' | 'createdAt' | 'updatedAt'>): Promise<AdaptivePath> {
    const created = await this.repo.createAdaptivePath(learningPathId, data);
    if (!created) throw new LxpAdaptivePathError();
    return created;
  }

  async generatePersonalizedPath(learningPathId: string, userId: string): Promise<PersonalizedPath> {
    const path = await this.repo.generatePersonalizedPath(learningPathId, userId);
    if (!path) throw new LxpPersonalizedPathError();
    return path;
  }

  async getPersonalizedPath(learningPathId: string, userId: string): Promise<PersonalizedPath> {
    const path = await this.repo.findPersonalizedPath(learningPathId, userId);
    if (!path) throw new LxpPersonalizedPathError();
    return path;
  }

  async updatePersonalizedPath(learningPathId: string, userId: string, progress: number): Promise<PersonalizedPath> {
    const path = await this.repo.updatePersonalizedPath(learningPathId, userId, progress);
    if (!path) throw new LxpPersonalizedPathError();
    return path;
  }
}
