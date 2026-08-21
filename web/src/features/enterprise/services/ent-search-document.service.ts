// Enterprise Platform Service - SearchDocument
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SearchDocument, SearchDocumentCreate } from '@educi/types';
import { EntSearchDocumentNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntSearchDocumentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getSearchDocument(schoolId: string, id: string): Promise<SearchDocument> {
    const item = await this.repo.findSearchDocumentById(schoolId, id);
    if (!item) throw new EntSearchDocumentNotFoundError(id);
    return item;
  }
  async listSearchDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<SearchDocument[]> {
    return this.repo.findAllSearchDocuments(schoolId, filters);
  }
  async createSearchDocument(schoolId: string, data: SearchDocumentCreate): Promise<SearchDocument> {
    return this.repo.createSearchDocument(schoolId, data);
  }
  async updateSearchDocument(schoolId: string, id: string, data: Partial<SearchDocumentCreate>): Promise<SearchDocument> {
    const existing = await this.repo.findSearchDocumentById(schoolId, id);
    if (!existing) throw new EntSearchDocumentNotFoundError(id);
    return this.repo.updateSearchDocument(schoolId, id, data);
  }
  async deleteSearchDocument(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSearchDocumentById(schoolId, id);
    if (!existing) throw new EntSearchDocumentNotFoundError(id);
    return this.repo.deleteSearchDocument(schoolId, id);
  }
  async countSearchDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSearchDocuments(schoolId, filters);
  }
}
