// Government & National Governance Service - SharedResource
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SharedResource, SharedResourceCreate } from '@educi/types';
import { GovSharedResourceNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSharedResourceService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSharedResource(schoolId: string, id: string): Promise<SharedResource> {
    const item = await this.repo.findSharedResourceById(schoolId, id);
    if (!item) throw new GovSharedResourceNotFoundError(id);
    return item;
  }

  async listSharedResources(schoolId: string, filters?: Record<string, unknown>): Promise<SharedResource[]> {
    return this.repo.findAllSharedResources(schoolId, filters);
  }

  async createSharedResource(schoolId: string, data: SharedResourceCreate): Promise<SharedResource> {
    return this.repo.createSharedResource(schoolId, data);
  }

  async updateSharedResource(schoolId: string, id: string, data: Partial<SharedResourceCreate>): Promise<SharedResource> {
    const existing = await this.repo.findSharedResourceById(schoolId, id);
    if (!existing) throw new GovSharedResourceNotFoundError(id);
    return this.repo.updateSharedResource(schoolId, id, data);
  }

  async deleteSharedResource(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSharedResourceById(schoolId, id);
    if (!existing) throw new GovSharedResourceNotFoundError(id);
    return this.repo.deleteSharedResource(schoolId, id);
  }

  async countSharedResources(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSharedResources(schoolId, filters);
  }
}
