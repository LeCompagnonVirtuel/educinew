import type { SupabaseClient } from '@supabase/supabase-js';
import type { Level, LevelCreate } from '@educi/types';
import { LxpLevelNotFoundError, LxpLevelUpdateError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpLevelService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getLevel(schoolId: string, id: string): Promise<Level> {
    const level = await this.repo.findLevelById(schoolId, id);
    if (!level) throw new LxpLevelNotFoundError(id);
    return level;
  }

  async listLevels(schoolId: string): Promise<readonly Level[]> {
    return this.repo.findLevels(schoolId);
  }

  async createLevel(data: LevelCreate): Promise<Level> {
    const created = await this.repo.createLevel(data);
    if (!created) throw new LxpLevelNotFoundError();
    return created;
  }

  async updateLevel(schoolId: string, id: string, data: Partial<Level>): Promise<Level> {
    const existing = await this.repo.findLevelById(schoolId, id);
    if (!existing) throw new LxpLevelNotFoundError(id);
    const updated = await this.repo.updateLevel(id, data);
    if (!updated) throw new LxpLevelUpdateError();
    return updated;
  }

  async deleteLevel(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLevelById(schoolId, id);
    if (!existing) throw new LxpLevelNotFoundError(id);
    await this.repo.deleteLevel(id);
  }
}
