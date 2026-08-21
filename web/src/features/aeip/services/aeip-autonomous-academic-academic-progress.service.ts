import type { SupabaseClient } from '@supabase/supabase-js';
import type { AcademicProgress } from '@educi/types';
import { AEIPAutonomousAcademicProgressError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousAcademicProgressService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getProgress(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listProgress(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createProgress(schoolId: string, data: Partial<AcademicProgress>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateProgress(schoolId: string, id: string, data: Partial<AcademicProgress>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteProgress(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}