import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicAssessment } from '@educi/types';
import { AEIPAutonomousAcademicAssessmentError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousAcademicAssessmentService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getAssessment(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listAssessments(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createAssessment(schoolId: string, data: Partial<AcademicAssessment>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateAssessment(schoolId: string, id: string, data: Partial<AcademicAssessment>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteAssessment(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}