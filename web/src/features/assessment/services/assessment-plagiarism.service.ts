import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlagiarismDetection, PlagiarismDetectionCreate } from '@educi/types';
import { AssessmentPlagiarismDetectionError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentPlagiarismService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getPlagiarism(schoolId: string, id: string): Promise<PlagiarismDetection> {
    const item = await this.repo.getPlagiarism(id, schoolId);
    if (!item) throw new AssessmentPlagiarismDetectionError(id);
    return item;
  }
  async listPlagiarisms(schoolId: string, filters?: Record<string, unknown>): Promise<PlagiarismDetection[]> {
    return this.repo.listPlagiarisms(schoolId, filters);
  }
  async createPlagiarism(schoolId: string, data: PlagiarismDetectionCreate): Promise<PlagiarismDetection> {
    return this.repo.createPlagiarism({ ...data, school_id: schoolId } as any);
  }
  async updatePlagiarism(schoolId: string, id: string, data: Partial<PlagiarismDetectionCreate>): Promise<PlagiarismDetection> {
    const existing = await this.repo.getPlagiarism(id, schoolId);
    if (!existing) throw new AssessmentPlagiarismDetectionError(id);
    return this.repo.updatePlagiarism(id, schoolId, data as any);
  }
  async deletePlagiarism(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPlagiarism(id, schoolId);
    if (!existing) throw new AssessmentPlagiarismDetectionError(id);
    return this.repo.deletePlagiarism(id, schoolId);
  }
}
