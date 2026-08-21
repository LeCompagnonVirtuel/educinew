import type { SupabaseClient } from '@supabase/supabase-js';
import type { GenerationProject } from '@educi/types';
import { AEIPGenerativeStudioProjectError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPGenerativeStudioProjectService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getProject(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listProjects(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createProject(schoolId: string, data: Partial<GenerationProject>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateProject(schoolId: string, id: string, data: Partial<GenerationProject>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteProject(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}