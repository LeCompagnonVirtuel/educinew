import type { SupabaseClient } from '@supabase/supabase-js';
import type { KnowledgeGraphNode } from '@educi/types';
import { EduOSKnowledgeGraphNodeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSKnowledgeGraphNodeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getKnowledgeGraphNode(schoolId: string, id: string): Promise<KnowledgeGraphNode> {
    const item = await this.repo.getKnowledgeGraphNode(schoolId, id);
    if (!item) throw new EduOSKnowledgeGraphNodeError(id);
    return item;
  }
  async listKnowledgeGraphNodes(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeGraphNode[]> {
    return this.repo.listKnowledgeGraphNodes(schoolId, filters);
  }
  async createKnowledgeGraphNode(schoolId: string, data: Partial<KnowledgeGraphNode>): Promise<KnowledgeGraphNode> {
    return this.repo.createKnowledgeGraphNode(schoolId, data as any);
  }
  async updateKnowledgeGraphNode(schoolId: string, id: string, data: Partial<KnowledgeGraphNode>): Promise<KnowledgeGraphNode> {
    const existing = await this.repo.getKnowledgeGraphNode(schoolId, id);
    if (!existing) throw new EduOSKnowledgeGraphNodeError(id);
    return this.repo.updateKnowledgeGraphNode(schoolId, id, data as any);
  }
  async deleteKnowledgeGraphNode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getKnowledgeGraphNode(schoolId, id);
    if (!existing) throw new EduOSKnowledgeGraphNodeError(id);
    return this.repo.deleteKnowledgeGraphNode(schoolId, id);
  }
}

