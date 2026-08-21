import type { SupabaseClient } from '@supabase/supabase-js';
import type { Skill } from '@educi/types';
import { LxpSkillNotFoundError, LxpSkillCreateError, LxpSkillAssessError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpSkillService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getSkill(schoolId: string, id: string): Promise<Skill> {
    const skill = await this.repo.findSkillById(schoolId, id);
    if (!skill) throw new LxpSkillNotFoundError(id);
    return skill;
  }

  async listSkills(schoolId: string): Promise<readonly Skill[]> {
    return this.repo.findSkills(schoolId);
  }

  async createSkill(data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt' | 'endorsementsCount' | 'verifiedCount'>): Promise<Skill> {
    const created = await this.repo.createSkill(data);
    if (!created) throw new LxpSkillCreateError();
    return created;
  }

  async assessSkill(schoolId: string, id: string, userId: string, level: string): Promise<boolean> {
    const existing = await this.repo.findSkillById(schoolId, id);
    if (!existing) throw new LxpSkillNotFoundError(id);
    const result = await this.repo.assessUserSkill(id, userId, level);
    if (!result) throw new LxpSkillAssessError();
    return result;
  }

  async deleteSkill(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSkillById(schoolId, id);
    if (!existing) throw new LxpSkillNotFoundError(id);
    await this.repo.deleteSkill(id);
  }
}
