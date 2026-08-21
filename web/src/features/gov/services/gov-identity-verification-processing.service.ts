// Government & National Governance Service - IdentityVerificationProcessing
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityVerificationProcessing, IdentityVerificationProcessingCreate } from '@educi/types';
import { GovIdentityVerificationProcessingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityVerificationProcessingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getIdentityVerificationProcessing(schoolId: string, id: string): Promise<IdentityVerificationProcessing> {
    const item = await this.repo.findIdentityVerificationProcessingById(schoolId, id);
    if (!item) throw new GovIdentityVerificationProcessingNotFoundError(id);
    return item;
  }

  async listIdentityVerificationProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerificationProcessing[]> {
    return this.repo.findAllIdentityVerificationProcessings(schoolId, filters);
  }

  async createIdentityVerificationProcessing(schoolId: string, data: IdentityVerificationProcessingCreate): Promise<IdentityVerificationProcessing> {
    return this.repo.createIdentityVerificationProcessing(schoolId, data);
  }

  async updateIdentityVerificationProcessing(schoolId: string, id: string, data: Partial<IdentityVerificationProcessingCreate>): Promise<IdentityVerificationProcessing> {
    const existing = await this.repo.findIdentityVerificationProcessingById(schoolId, id);
    if (!existing) throw new GovIdentityVerificationProcessingNotFoundError(id);
    return this.repo.updateIdentityVerificationProcessing(schoolId, id, data);
  }

  async deleteIdentityVerificationProcessing(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityVerificationProcessingById(schoolId, id);
    if (!existing) throw new GovIdentityVerificationProcessingNotFoundError(id);
    return this.repo.deleteIdentityVerificationProcessing(schoolId, id);
  }

  async countIdentityVerificationProcessings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIdentityVerificationProcessings(schoolId, filters);
  }
}
