import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiDocumentProcessing, AiDocumentProcessingQuery, AiDocumentProcessingCreate, AiDocumentProcessingUpdate } from '@educi/types';
import { AiDocumentProcessingNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiDocumentProcessingService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getDocument(schoolId: string, id: string): Promise<AiDocumentProcessing> {
    const document = await this.repo.findById(schoolId, id);
    if (!document) throw new AiDocumentProcessingNotFoundError(id);
    return document;
  }

  async listDocuments(schoolId: string, query: AiDocumentProcessingQuery): Promise<AiDocumentProcessing[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createDocument(schoolId: string, data: AiDocumentProcessingCreate): Promise<AiDocumentProcessing> {
    return this.repo.create(schoolId, data);
  }

  async updateDocument(schoolId: string, id: string, data: AiDocumentProcessingUpdate): Promise<AiDocumentProcessing> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiDocumentProcessingNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteDocument(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiDocumentProcessingNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }

  async processDocument(schoolId: string, id: string): Promise<AiDocumentProcessing> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiDocumentProcessingNotFoundError(id);
    return this.repo.update(schoolId, id, { status: 'processing', processedAt: new Date().toISOString() });
  }

  async getDocumentResults(schoolId: string, id: string): Promise<AiDocumentResult[]> {
    const document = await this.repo.findById(schoolId, id);
    if (!document) throw new AiDocumentProcessingNotFoundError(id);
    return this.repo.findResultsByDocumentId(schoolId, id);
  }

  async getDocumentStatus(schoolId: string, id: string): Promise<AiDocumentStatus> {
    const document = await this.repo.findById(schoolId, id);
    if (!document) throw new AiDocumentProcessingNotFoundError(id);
    return { status: document.status, progress: document.progress };
  }
}
