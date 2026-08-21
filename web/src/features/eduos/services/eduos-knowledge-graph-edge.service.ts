import type { SupabaseClient } from '@supabase/supabase-js';
import type { KnowledgeGraphEdge } from '@educi/types';
import { EduOSKnowledgeGraphEdgeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSKnowledgeGraphEdgeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getKnowledgeGraphEdge(schoolId: string, id: string): Promise<KnowledgeGraphEdge> {
    const item = await this.repo.getKnowledgeGraphEdge(schoolId, id);
    if (!item) throw new EduOSKnowledgeGraphEdgeError(id);
    return item;
  }
  async listKnowledgeGraphEdges(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeGraphEdge[]> {
    return this.repo.listKnowledgeGraphEdges(schoolId, filters);
  }
  async createKnowledgeGraphEdge(schoolId: string, data: Partial<KnowledgeGraphEdge>): Promise<KnowledgeGraphEdge> {
    return this.repo.createKnowledgeGraphEdge(schoolId, data as any);
  }
  async updateKnowledgeGraphEdge(schoolId: string, id: string, data: Partial<KnowledgeGraphEdge>): Promise<KnowledgeGraphEdge> {
    const existing = await this.repo.getKnowledgeGraphEdge(schoolId, id);
    if (!existing) throw new EduOSKnowledgeGraphEdgeError(id);
    return this.repo.updateKnowledgeGraphEdge(schoolId, id, data as any);
  }
  async deleteKnowledgeGraphEdge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getKnowledgeGraphEdge(schoolId, id);
    if (!existing) throw new EduOSKnowledgeGraphEdgeError(id);
    return this.repo.deleteKnowledgeGraphEdge(schoolId, id);
  }
}

