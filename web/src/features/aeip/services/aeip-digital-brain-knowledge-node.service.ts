import type { SupabaseClient } from '@supabase/supabase-js';
import type { KnowledgeNode } from '@educi/types';
import { AEIPDigitalBrainNodeError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPDigitalBrainNodeService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getNode(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listNodes(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createNode(schoolId: string, data: Partial<KnowledgeNode>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateNode(schoolId: string, id: string, data: Partial<KnowledgeNode>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteNode(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}