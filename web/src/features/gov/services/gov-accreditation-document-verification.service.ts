// Government & National Governance Service - AccreditationDocumentVerification
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { AccreditationDocumentVerification, AccreditationDocumentVerificationCreate } from '@educi/types';
import { GovAccreditationDocumentVerificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovAccreditationDocumentVerificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getAccreditationDocumentVerification(schoolId: string, id: string): Promise<AccreditationDocumentVerification> {
    const item = await this.repo.findAccreditationDocumentVerificationById(schoolId, id);
    if (!item) throw new GovAccreditationDocumentVerificationNotFoundError(id);
    return item;
  }

  async listAccreditationDocumentVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<AccreditationDocumentVerification[]> {
    return this.repo.findAllAccreditationDocumentVerifications(schoolId, filters);
  }

  async createAccreditationDocumentVerification(schoolId: string, data: AccreditationDocumentVerificationCreate): Promise<AccreditationDocumentVerification> {
    return this.repo.createAccreditationDocumentVerification(schoolId, data);
  }

  async updateAccreditationDocumentVerification(schoolId: string, id: string, data: Partial<AccreditationDocumentVerificationCreate>): Promise<AccreditationDocumentVerification> {
    const existing = await this.repo.findAccreditationDocumentVerificationById(schoolId, id);
    if (!existing) throw new GovAccreditationDocumentVerificationNotFoundError(id);
    return this.repo.updateAccreditationDocumentVerification(schoolId, id, data);
  }

  async deleteAccreditationDocumentVerification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAccreditationDocumentVerificationById(schoolId, id);
    if (!existing) throw new GovAccreditationDocumentVerificationNotFoundError(id);
    return this.repo.deleteAccreditationDocumentVerification(schoolId, id);
  }

  async countAccreditationDocumentVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAccreditationDocumentVerifications(schoolId, filters);
  }
}
