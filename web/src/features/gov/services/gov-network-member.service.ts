// Government & National Governance Service - NetworkMember
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkMember, NetworkMemberCreate } from '@educi/types';
import { GovNetworkMemberNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovNetworkMemberService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getNetworkMember(schoolId: string, id: string): Promise<NetworkMember> {
    const item = await this.repo.findNetworkMemberById(schoolId, id);
    if (!item) throw new GovNetworkMemberNotFoundError(id);
    return item;
  }

  async listNetworkMembers(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkMember[]> {
    return this.repo.findAllNetworkMembers(schoolId, filters);
  }

  async createNetworkMember(schoolId: string, data: NetworkMemberCreate): Promise<NetworkMember> {
    return this.repo.createNetworkMember(schoolId, data);
  }

  async updateNetworkMember(schoolId: string, id: string, data: Partial<NetworkMemberCreate>): Promise<NetworkMember> {
    const existing = await this.repo.findNetworkMemberById(schoolId, id);
    if (!existing) throw new GovNetworkMemberNotFoundError(id);
    return this.repo.updateNetworkMember(schoolId, id, data);
  }

  async deleteNetworkMember(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkMemberById(schoolId, id);
    if (!existing) throw new GovNetworkMemberNotFoundError(id);
    return this.repo.deleteNetworkMember(schoolId, id);
  }

  async countNetworkMembers(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countNetworkMembers(schoolId, filters);
  }
}
