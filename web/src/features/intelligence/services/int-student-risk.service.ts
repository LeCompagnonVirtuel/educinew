// Intelligence Platform Service - StudentRiskAssessment
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { StudentRiskAssessment, StudentRiskAssessmentCreate } from '@educi/types';
import { IntStudentRiskNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntStudentRiskService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getStudentRisk(schoolId: string, id: string): Promise<StudentRiskAssessment> {
    const item = await this.repo.getStudentRisk(id, schoolId);
    if (!item) throw new IntStudentRiskNotFoundError(id);
    return item;
  }
  async listStudentRisks(schoolId: string, filters?: Record<string, unknown>): Promise<StudentRiskAssessment[]> {
    return this.repo.listStudentRisks(schoolId, filters);
  }
  async createStudentRisk(schoolId: string, data: StudentRiskAssessmentCreate): Promise<StudentRiskAssessment> {
    return this.repo.createStudentRisk({ ...data, school_id: schoolId });
  }
  async updateStudentRisk(schoolId: string, id: string, data: Partial<StudentRiskAssessmentCreate>): Promise<StudentRiskAssessment> {
    const existing = await this.repo.getStudentRisk(id, schoolId);
    if (!existing) throw new IntStudentRiskNotFoundError(id);
    return this.repo.updateStudentRisk(id, schoolId, data);
  }
  async deleteStudentRisk(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStudentRisk(id, schoolId);
    if (!existing) throw new IntStudentRiskNotFoundError(id);
    return this.repo.deleteStudentRisk(id, schoolId);
  }
}
