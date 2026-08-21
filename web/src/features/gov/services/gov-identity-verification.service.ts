// Government & National Governance Service - IdentityVerification
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityVerification, IdentityVerificationCreate } from '@educi/types';
import { GovIdentityVerificationNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityVerificationService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getIdentityVerification(schoolId: string, id: string): Promise<IdentityVerification> {
    const item = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!item) throw new GovIdentityVerificationNotFoundError(id);
    return item;
  }

  async listIdentityVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityVerification[]> {
    return this.repo.findAllIdentityVerifications(schoolId, filters);
  }

  async createIdentityVerification(schoolId: string, data: IdentityVerificationCreate): Promise<IdentityVerification> {
    return this.repo.createIdentityVerification(schoolId, data);
  }

  async updateIdentityVerification(schoolId: string, id: string, data: Partial<IdentityVerificationCreate>): Promise<IdentityVerification> {
    const existing = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!existing) throw new GovIdentityVerificationNotFoundError(id);
    return this.repo.updateIdentityVerification(schoolId, id, data);
  }

  async deleteIdentityVerification(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityVerificationById(schoolId, id);
    if (!existing) throw new GovIdentityVerificationNotFoundError(id);
    return this.repo.deleteIdentityVerification(schoolId, id);
  }

  async countIdentityVerifications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIdentityVerifications(schoolId, filters);
  }
}
