import type { SupabaseClient } from '@supabase/supabase-js';
import type { CompetencyTest, CompetencyTestCreate } from '@educi/types';
import { AssessmentCompetencyTestError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentCompetencyTestService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getCompetencyTest(schoolId: string, id: string): Promise<CompetencyTest> {
    const item = await this.repo.getCompetencyTest(id, schoolId);
    if (!item) throw new AssessmentCompetencyTestError(id);
    return item;
  }
  async listCompetencyTests(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyTest[]> {
    return this.repo.listCompetencyTests(schoolId, filters);
  }
  async createCompetencyTest(schoolId: string, data: CompetencyTestCreate): Promise<CompetencyTest> {
    return this.repo.createCompetencyTest({ ...data, school_id: schoolId } as any);
  }
  async updateCompetencyTest(schoolId: string, id: string, data: Partial<CompetencyTestCreate>): Promise<CompetencyTest> {
    const existing = await this.repo.getCompetencyTest(id, schoolId);
    if (!existing) throw new AssessmentCompetencyTestError(id);
    return this.repo.updateCompetencyTest(id, schoolId, data as any);
  }
  async deleteCompetencyTest(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCompetencyTest(id, schoolId);
    if (!existing) throw new AssessmentCompetencyTestError(id);
    return this.repo.deleteCompetencyTest(id, schoolId);
  }
}
