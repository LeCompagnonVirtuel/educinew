import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicIntegrity, AcademicIntegrityCreate } from '@educi/types';
import { AssessmentAcademicIntegrityError } from '@educi/errors';
import { createAssessmentRepository, AssessmentRepository } from '../repositories/assessment.repository';

export class AssessmentIntegrityService {
  private repo: AssessmentRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAssessmentRepository(supabase);
  }
  async getIntegrity(schoolId: string, id: string): Promise<AcademicIntegrity> {
    const item = await this.repo.getIntegrity(id, schoolId);
    if (!item) throw new AssessmentAcademicIntegrityError(id);
    return item;
  }
  async listIntegrities(schoolId: string, filters?: Record<string, unknown>): Promise<AcademicIntegrity[]> {
    return this.repo.listIntegrities(schoolId, filters);
  }
  async createIntegrity(schoolId: string, data: AcademicIntegrityCreate): Promise<AcademicIntegrity> {
    return this.repo.createIntegrity({ ...data, school_id: schoolId } as any);
  }
  async updateIntegrity(schoolId: string, id: string, data: Partial<AcademicIntegrityCreate>): Promise<AcademicIntegrity> {
    const existing = await this.repo.getIntegrity(id, schoolId);
    if (!existing) throw new AssessmentAcademicIntegrityError(id);
    return this.repo.updateIntegrity(id, schoolId, data as any);
  }
  async deleteIntegrity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getIntegrity(id, schoolId);
    if (!existing) throw new AssessmentAcademicIntegrityError(id);
    return this.repo.deleteIntegrity(id, schoolId);
  }
}
