// Government & National Governance Service - NetworkMemberManagement
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkMemberManagement, NetworkMemberManagementCreate } from '@educi/types';
import { GovNetworkMemberManagementNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNetworkMemberManagementService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNetworkMemberManagement(schoolId: string, id: string): Promise<NetworkMemberManagement> {
    const item = await this.repo.findNetworkMemberManagementById(schoolId, id);
    if (!item) throw new GovNetworkMemberManagementNotFoundError(id);
    return item;
  }

  async listNetworkMemberManagements(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkMemberManagement[]> {
    return this.repo.findAllNetworkMemberManagements(schoolId, filters);
  }

  async createNetworkMemberManagement(schoolId: string, data: NetworkMemberManagementCreate): Promise<NetworkMemberManagement> {
    return this.repo.createNetworkMemberManagement(schoolId, data);
  }

  async updateNetworkMemberManagement(schoolId: string, id: string, data: Partial<NetworkMemberManagementCreate>): Promise<NetworkMemberManagement> {
    const existing = await this.repo.findNetworkMemberManagementById(schoolId, id);
    if (!existing) throw new GovNetworkMemberManagementNotFoundError(id);
    return this.repo.updateNetworkMemberManagement(schoolId, id, data);
  }

  async deleteNetworkMemberManagement(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkMemberManagementById(schoolId, id);
    if (!existing) throw new GovNetworkMemberManagementNotFoundError(id);
    return this.repo.deleteNetworkMemberManagement(schoolId, id);
  }

  async countNetworkMemberManagements(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworkMemberManagements(schoolId, filters);
  }
}
