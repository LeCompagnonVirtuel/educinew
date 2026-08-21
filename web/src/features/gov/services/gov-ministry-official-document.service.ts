import type { SupabaseClient } from '@supabase/supabase-js';
import type { OfficialDocument, OfficialDocumentCreate } from '@educi/types';
import { GovOfficialDocumentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryOfficialDocumentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<OfficialDocument> {
    const item = await this.repo.findOfficialDocumentById(schoolId, id);
    if (!item) throw new GovOfficialDocumentNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<OfficialDocument[]> {
    return this.repo.findAllOfficialDocuments(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<OfficialDocumentCreate>): Promise<OfficialDocument> {
    return this.repo.createOfficialDocument(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<OfficialDocumentCreate>): Promise<OfficialDocument> {
    const existing = await this.repo.findOfficialDocumentById(schoolId, id);
    if (!existing) throw new GovOfficialDocumentNotFoundError(id);
    return this.repo.updateOfficialDocument(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findOfficialDocumentById(schoolId, id);
    if (!existing) throw new GovOfficialDocumentNotFoundError(id);
    return this.repo.deleteOfficialDocument(schoolId, id);
  }
}
