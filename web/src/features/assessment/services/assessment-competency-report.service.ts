import type { SupabaseClient } from '@supabase/supabase-js';
import type { CompetencyReport, CompetencyReportCreate } from '@educi/types';
import { AssessmentCompetencyReportError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentCompetencyReportService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getCompetencyReport(schoolId: string, id: string): Promise<CompetencyReport> {
    const item = await this.repo.getCompetencyReport(id, schoolId);
    if (!item) throw new AssessmentCompetencyReportError(id);
    return item;
  }
  async listCompetencyReports(schoolId: string, filters?: Record<string, unknown>): Promise<CompetencyReport[]> {
    return this.repo.listCompetencyReports(schoolId, filters);
  }
  async createCompetencyReport(schoolId: string, data: CompetencyReportCreate): Promise<CompetencyReport> {
    return this.repo.createCompetencyReport({ ...data, school_id: schoolId } as any);
  }
  async updateCompetencyReport(schoolId: string, id: string, data: Partial<CompetencyReportCreate>): Promise<CompetencyReport> {
    const existing = await this.repo.getCompetencyReport(id, schoolId);
    if (!existing) throw new AssessmentCompetencyReportError(id);
    return this.repo.updateCompetencyReport(id, schoolId, data as any);
  }
  async deleteCompetencyReport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCompetencyReport(id, schoolId);
    if (!existing) throw new AssessmentCompetencyReportError(id);
    return this.repo.deleteCompetencyReport(id, schoolId);
  }
}
