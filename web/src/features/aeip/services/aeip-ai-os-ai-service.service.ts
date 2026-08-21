import type { SupabaseClient } from '@supabase/supabase-js';
import type { AIService } from '@educi/types';
import { AEIPOSServiceError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPOSAIService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getService(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listServices(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createService(schoolId: string, data: Partial<AIService>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateService(schoolId: string, id: string, data: Partial<AIService>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteService(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}