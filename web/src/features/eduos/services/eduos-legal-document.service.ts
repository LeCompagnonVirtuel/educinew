import type { SupabaseClient } from '@supabase/supabase-js';
import type { LegalDocument } from '@educi/types';
import { EduOSLegalDocumentError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSLegalDocumentService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getLegalDocument(schoolId: string, id: string): Promise<LegalDocument> {
    const item = await this.repo.getLegalDocument(schoolId, id);
    if (!item) throw new EduOSLegalDocumentError(id);
    return item;
  }
  async listLegalDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<LegalDocument[]> {
    return this.repo.listLegalDocuments(schoolId, filters);
  }
  async createLegalDocument(schoolId: string, data: Partial<LegalDocument>): Promise<LegalDocument> {
    return this.repo.createLegalDocument(schoolId, data as any);
  }
  async updateLegalDocument(schoolId: string, id: string, data: Partial<LegalDocument>): Promise<LegalDocument> {
    const existing = await this.repo.getLegalDocument(schoolId, id);
    if (!existing) throw new EduOSLegalDocumentError(id);
    return this.repo.updateLegalDocument(schoolId, id, data as any);
  }
  async deleteLegalDocument(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getLegalDocument(schoolId, id);
    if (!existing) throw new EduOSLegalDocumentError(id);
    return this.repo.deleteLegalDocument(schoolId, id);
  }
}

