// Intelligence Platform Service - StudentOutlook
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { StudentOutlook, StudentOutlookCreate } from '@educi/types';
import { IntStudentOutlookNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntStudentOutlookService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getStudentOutlook(schoolId: string, id: string): Promise<StudentOutlook> {
    const item = await this.repo.getStudentOutlook(id, schoolId);
    if (!item) throw new IntStudentOutlookNotFoundError(id);
    return item;
  }
  async listStudentOutlooks(schoolId: string, filters?: Record<string, unknown>): Promise<StudentOutlook[]> {
    return this.repo.listStudentOutlooks(schoolId, filters);
  }
  async createStudentOutlook(schoolId: string, data: StudentOutlookCreate): Promise<StudentOutlook> {
    return this.repo.createStudentOutlook({ ...data, school_id: schoolId });
  }
  async updateStudentOutlook(schoolId: string, id: string, data: Partial<StudentOutlookCreate>): Promise<StudentOutlook> {
    const existing = await this.repo.getStudentOutlook(id, schoolId);
    if (!existing) throw new IntStudentOutlookNotFoundError(id);
    return this.repo.updateStudentOutlook(id, schoolId, data);
  }
  async deleteStudentOutlook(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStudentOutlook(id, schoolId);
    if (!existing) throw new IntStudentOutlookNotFoundError(id);
    return this.repo.deleteStudentOutlook(id, schoolId);
  }
}
