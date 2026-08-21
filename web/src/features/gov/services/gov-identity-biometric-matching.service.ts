// Government & National Governance Service - IdentityBiometricMatching
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IdentityBiometricMatching, IdentityBiometricMatchingCreate } from '@educi/types';
import { GovIdentityBiometricMatchingNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovIdentityBiometricMatchingService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getIdentityBiometricMatching(schoolId: string, id: string): Promise<IdentityBiometricMatching> {
    const item = await this.repo.findIdentityBiometricMatchingById(schoolId, id);
    if (!item) throw new GovIdentityBiometricMatchingNotFoundError(id);
    return item;
  }

  async listIdentityBiometricMatchings(schoolId: string, filters?: Record<string, unknown>): Promise<IdentityBiometricMatching[]> {
    return this.repo.findAllIdentityBiometricMatchings(schoolId, filters);
  }

  async createIdentityBiometricMatching(schoolId: string, data: IdentityBiometricMatchingCreate): Promise<IdentityBiometricMatching> {
    return this.repo.createIdentityBiometricMatching(schoolId, data);
  }

  async updateIdentityBiometricMatching(schoolId: string, id: string, data: Partial<IdentityBiometricMatchingCreate>): Promise<IdentityBiometricMatching> {
    const existing = await this.repo.findIdentityBiometricMatchingById(schoolId, id);
    if (!existing) throw new GovIdentityBiometricMatchingNotFoundError(id);
    return this.repo.updateIdentityBiometricMatching(schoolId, id, data);
  }

  async deleteIdentityBiometricMatching(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIdentityBiometricMatchingById(schoolId, id);
    if (!existing) throw new GovIdentityBiometricMatchingNotFoundError(id);
    return this.repo.deleteIdentityBiometricMatching(schoolId, id);
  }

  async countIdentityBiometricMatchings(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIdentityBiometricMatchings(schoolId, filters);
  }
}
