import type { SupabaseClient } from '@supabase/supabase-js';
import type { Rubric, RubricCriterion } from '@educi/types';
import { LxpRubricNotFoundError, LxpRubricCreateError, LxpRubricUpdateError, LxpRubricCriterionError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpRubricService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getRubric(schoolId: string, id: string): Promise<Rubric> {
    const rubric = await this.repo.findRubricById(schoolId, id);
    if (!rubric) throw new LxpRubricNotFoundError(id);
    return rubric;
  }

  async listRubrics(courseId: string): Promise<readonly Rubric[]> {
    return this.repo.findRubrics(courseId);
  }

  async createRubric(data: Omit<Rubric, 'id' | 'createdAt' | 'updatedAt' | 'isPublished' | 'createdBy'>): Promise<Rubric> {
    const created = await this.repo.createRubric(data);
    if (!created) throw new LxpRubricCreateError();
    return created;
  }

  async updateRubric(schoolId: string, id: string, data: Partial<Rubric>): Promise<Rubric> {
    const existing = await this.repo.findRubricById(schoolId, id);
    if (!existing) throw new LxpRubricNotFoundError(id);
    const updated = await this.repo.updateRubric(id, data);
    if (!updated) throw new LxpRubricUpdateError();
    return updated;
  }

  async deleteRubric(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findRubricById(schoolId, id);
    if (!existing) throw new LxpRubricNotFoundError(id);
    await this.repo.deleteRubric(id);
  }
}
