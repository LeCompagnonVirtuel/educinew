// Government & National Governance Service - AccreditationDocument
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationDocument, AccreditationDocumentCreate } from '@educi/types';
import { GovAccreditationDocumentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccreditationDocumentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccreditationDocument(schoolId: string, id: string): Promise<AccreditationDocument> {
    const item = await this.repo.findAccreditationDocumentById(schoolId, id);
    if (!item) throw new GovAccreditationDocumentNotFoundError(id);
    return item;
  }

  async listAccreditationDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationDocument[]> {
    return this.repo.findAllAccreditationDocuments(schoolId, filters);
  }

  async createAccreditationDocument(schoolId: string, data: AccreditationDocumentCreate): Promise<AccreditationDocument> {
    return this.repo.createAccreditationDocument(schoolId, data);
  }

  async updateAccreditationDocument(schoolId: string, id: string, data: Partial<AccreditationDocumentCreate>): Promise<AccreditationDocument> {
    const existing = await this.repo.findAccreditationDocumentById(schoolId, id);
    if (!existing) throw new GovAccreditationDocumentNotFoundError(id);
    return this.repo.updateAccreditationDocument(schoolId, id, data);
  }

  async deleteAccreditationDocument(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationDocumentById(schoolId, id);
    if (!existing) throw new GovAccreditationDocumentNotFoundError(id);
    return this.repo.deleteAccreditationDocument(schoolId, id);
  }

  async countAccreditationDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccreditationDocuments(schoolId, filters);
  }
}
