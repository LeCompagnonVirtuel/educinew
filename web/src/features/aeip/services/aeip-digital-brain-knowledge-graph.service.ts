import type { SupabaseClient } from '@supabase/supabase-js';
import type { KnowledgeGraph } from '@educi/types';
import { AEIPDigitalBrainGraphError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDigitalBrainGraphService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getGraph(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listGraphs(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createGraph(schoolId: string, data: Partial<KnowledgeGraph>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateGraph(schoolId: string, id: string, data: Partial<KnowledgeGraph>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteGraph(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}