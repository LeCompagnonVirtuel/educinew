import type { SupabaseClient } from '@supabase/supabase-js';
import type { LearningPath } from '@educi/types';
import { AEIPDigitalBrainPathError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDigitalBrainPathService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getPath(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listPaths(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createPath(schoolId: string, data: Partial<LearningPath>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updatePath(schoolId: string, id: string, data: Partial<LearningPath>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deletePath(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}