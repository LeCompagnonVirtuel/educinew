// Government & National Governance Service - Grant
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Grant, GrantCreate } from '@educi/types';
import { GovGrantNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovGrantService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getGrant(schoolId: string, id: string): Promise<Grant> {
    const item = await this.repo.findGrantById(schoolId, id);
    if (!item) throw new GovGrantNotFoundError(id);
    return item;
  }

  async listGrants(schoolId: string, filters?: Record<string, unknown>): Promise<Grant[]> {
    return this.repo.findAllGrants(schoolId, filters);
  }

  async createGrant(schoolId: string, data: GrantCreate): Promise<Grant> {
    return this.repo.createGrant(schoolId, data);
  }

  async updateGrant(schoolId: string, id: string, data: Partial<GrantCreate>): Promise<Grant> {
    const existing = await this.repo.findGrantById(schoolId, id);
    if (!existing) throw new GovGrantNotFoundError(id);
    return this.repo.updateGrant(schoolId, id, data);
  }

  async deleteGrant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGrantById(schoolId, id);
    if (!existing) throw new GovGrantNotFoundError(id);
    return this.repo.deleteGrant(schoolId, id);
  }

  async countGrants(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGrants(schoolId, filters);
  }
}
