import type { SupabaseClient } from '@supabase/supabase-js';
import type { KnowledgeEdge } from '@educi/types';
import { AEIPDigitalBrainEdgeError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDigitalBrainEdgeService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getEdge(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listEdges(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createEdge(schoolId: string, data: Partial<KnowledgeEdge>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateEdge(schoolId: string, id: string, data: Partial<KnowledgeEdge>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteEdge(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}