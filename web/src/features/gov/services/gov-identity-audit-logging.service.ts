// Government & National Governance Service - IdentityAuditLogging
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityAuditLogging, IdentityAuditLoggingCreate } from '@educi/types';
import { GovIdentityAuditLoggingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityAuditLoggingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getIdentityAuditLogging(schoolId: string, id: string): Promise<IdentityAuditLogging> {
    const item = await this.repo.findIdentityAuditLoggingById(schoolId, id);
    if (!item) throw new GovIdentityAuditLoggingNotFoundError(id);
    return item;
  }

  async listIdentityAuditLoggings(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityAuditLogging[]> {
    return this.repo.findAllIdentityAuditLoggings(schoolId, filters);
  }

  async createIdentityAuditLogging(schoolId: string, data: IdentityAuditLoggingCreate): Promise<IdentityAuditLogging> {
    return this.repo.createIdentityAuditLogging(schoolId, data);
  }

  async updateIdentityAuditLogging(schoolId: string, id: string, data: Partial<IdentityAuditLoggingCreate>): Promise<IdentityAuditLogging> {
    const existing = await this.repo.findIdentityAuditLoggingById(schoolId, id);
    if (!existing) throw new GovIdentityAuditLoggingNotFoundError(id);
    return this.repo.updateIdentityAuditLogging(schoolId, id, data);
  }

  async deleteIdentityAuditLogging(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityAuditLoggingById(schoolId, id);
    if (!existing) throw new GovIdentityAuditLoggingNotFoundError(id);
    return this.repo.deleteIdentityAuditLogging(schoolId, id);
  }

  async countIdentityAuditLoggings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIdentityAuditLoggings(schoolId, filters);
  }
}
