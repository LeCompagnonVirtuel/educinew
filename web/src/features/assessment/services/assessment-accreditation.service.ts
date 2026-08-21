import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolAccreditation, SchoolAccreditationCreate } from '@educi/types';
import { AssessmentSchoolAccreditationError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentAccreditationService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getAccreditation(schoolId: string, id: string): Promise<SchoolAccreditation> {
    const item = await this.repo.getAccreditation(id, schoolId);
    if (!item) throw new AssessmentSchoolAccreditationError(id);
    return item;
  }
  async listAccreditations(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolAccreditation[]> {
    return this.repo.listAccreditations(schoolId, filters);
  }
  async createAccreditation(schoolId: string, data: SchoolAccreditationCreate): Promise<SchoolAccreditation> {
    return this.repo.createAccreditation({ ...data, school_id: schoolId } as any);
  }
  async updateAccreditation(schoolId: string, id: string, data: Partial<SchoolAccreditationCreate>): Promise<SchoolAccreditation> {
    const existing = await this.repo.getAccreditation(id, schoolId);
    if (!existing) throw new AssessmentSchoolAccreditationError(id);
    return this.repo.updateAccreditation(id, schoolId, data as any);
  }
  async deleteAccreditation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAccreditation(id, schoolId);
    if (!existing) throw new AssessmentSchoolAccreditationError(id);
    return this.repo.deleteAccreditation(id, schoolId);
  }
}
