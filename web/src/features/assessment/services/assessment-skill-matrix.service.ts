import type { SupabaseClient } from '@supabase/supabase-js';
import type { SkillMatrix, SkillMatrixCreate } from '@educi/types';
import { AssessmentSkillMatrixError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentSkillMatrixService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getSkillMatrix(schoolId: string, id: string): Promise<SkillMatrix> {
    const item = await this.repo.getSkillMatrix(id, schoolId);
    if (!item) throw new AssessmentSkillMatrixError(id);
    return item;
  }
  async listSkillMatrices(schoolId: string, filters?: Record<string, unknown>): Promise<SkillMatrix[]> {
    return this.repo.listSkillMatrices(schoolId, filters);
  }
  async createSkillMatrix(schoolId: string, data: SkillMatrixCreate): Promise<SkillMatrix> {
    return this.repo.createSkillMatrix({ ...data, school_id: schoolId } as any);
  }
  async updateSkillMatrix(schoolId: string, id: string, data: Partial<SkillMatrixCreate>): Promise<SkillMatrix> {
    const existing = await this.repo.getSkillMatrix(id, schoolId);
    if (!existing) throw new AssessmentSkillMatrixError(id);
    return this.repo.updateSkillMatrix(id, schoolId, data as any);
  }
  async deleteSkillMatrix(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSkillMatrix(id, schoolId);
    if (!existing) throw new AssessmentSkillMatrixError(id);
    return this.repo.deleteSkillMatrix(id, schoolId);
  }
}
