// Government & National Governance Service - SchoolNetwork
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolNetwork, SchoolNetworkCreate } from '@educi/types';
import { GovSchoolNetworkNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovSchoolNetworkService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getSchoolNetwork(schoolId: string, id: string): Promise<SchoolNetwork> {
    const item = await this.repo.findSchoolNetworkById(schoolId, id);
    if (!item) throw new GovSchoolNetworkNotFoundError(id);
    return item;
  }

  async listSchoolNetworks(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolNetwork[]> {
    return this.repo.findAllSchoolNetworks(schoolId, filters);
  }

  async createSchoolNetwork(schoolId: string, data: SchoolNetworkCreate): Promise<SchoolNetwork> {
    return this.repo.createSchoolNetwork(schoolId, data);
  }

  async updateSchoolNetwork(schoolId: string, id: string, data: Partial<SchoolNetworkCreate>): Promise<SchoolNetwork> {
    const existing = await this.repo.findSchoolNetworkById(schoolId, id);
    if (!existing) throw new GovSchoolNetworkNotFoundError(id);
    return this.repo.updateSchoolNetwork(schoolId, id, data);
  }

  async deleteSchoolNetwork(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSchoolNetworkById(schoolId, id);
    if (!existing) throw new GovSchoolNetworkNotFoundError(id);
    return this.repo.deleteSchoolNetwork(schoolId, id);
  }

  async countSchoolNetworks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSchoolNetworks(schoolId, filters);
  }
}
