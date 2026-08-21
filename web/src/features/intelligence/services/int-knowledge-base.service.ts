// Intelligence Platform Service - KnowledgeBaseArticle
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { KnowledgeBaseArticle, KnowledgeBaseArticleCreate } from '@educi/types';
import { IntKnowledgeBaseNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntKnowledgeBaseService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getKnowledgeBaseArticle(schoolId: string, id: string): Promise<KnowledgeBaseArticle> {
    const item = await this.repo.getKnowledgeBaseArticle(id, schoolId);
    if (!item) throw new IntKnowledgeBaseNotFoundError(id);
    return item;
  }
  async listKnowledgeBaseArticles(schoolId: string, filters?: Record<string, unknown>): Promise<KnowledgeBaseArticle[]> {
    return this.repo.listKnowledgeBaseArticles(schoolId, filters);
  }
  async createKnowledgeBaseArticle(schoolId: string, data: KnowledgeBaseArticleCreate): Promise<KnowledgeBaseArticle> {
    return this.repo.createKnowledgeBaseArticle({ ...data, school_id: schoolId });
  }
  async updateKnowledgeBaseArticle(schoolId: string, id: string, data: Partial<KnowledgeBaseArticleCreate>): Promise<KnowledgeBaseArticle> {
    const existing = await this.repo.getKnowledgeBaseArticle(id, schoolId);
    if (!existing) throw new IntKnowledgeBaseNotFoundError(id);
    return this.repo.updateKnowledgeBaseArticle(id, schoolId, data);
  }
  async deleteKnowledgeBaseArticle(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getKnowledgeBaseArticle(id, schoolId);
    if (!existing) throw new IntKnowledgeBaseNotFoundError(id);
    return this.repo.deleteKnowledgeBaseArticle(id, schoolId);
  }
}
