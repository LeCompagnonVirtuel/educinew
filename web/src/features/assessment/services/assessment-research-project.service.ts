import type { SupabaseClient } from '@supabase/supabase-js';
import type { ResearchProject, ResearchProjectCreate } from '@educi/types';
import { AssessmentResearchProjectError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentResearchProjectService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getResearchProject(schoolId: string, id: string): Promise<ResearchProject> {
    const item = await this.repo.getResearchProject(id, schoolId);
    if (!item) throw new AssessmentResearchProjectError(id);
    return item;
  }
  async listResearchProjects(schoolId: string, filters?: Record<string, unknown>): Promise<ResearchProject[]> {
    return this.repo.listResearchProjects(schoolId, filters);
  }
  async createResearchProject(schoolId: string, data: ResearchProjectCreate): Promise<ResearchProject> {
    return this.repo.createResearchProject({ ...data, school_id: schoolId } as any);
  }
  async updateResearchProject(schoolId: string, id: string, data: Partial<ResearchProjectCreate>): Promise<ResearchProject> {
    const existing = await this.repo.getResearchProject(id, schoolId);
    if (!existing) throw new AssessmentResearchProjectError(id);
    return this.repo.updateResearchProject(id, schoolId, data as any);
  }
  async deleteResearchProject(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getResearchProject(id, schoolId);
    if (!existing) throw new AssessmentResearchProjectError(id);
    return this.repo.deleteResearchProject(id, schoolId);
  }
}
