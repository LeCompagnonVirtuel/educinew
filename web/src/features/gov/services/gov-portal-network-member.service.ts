import type { SupabaseClient } from '@supabase/supabase-js';
import type { NetworkMember, NetworkMemberCreate } from '@educi/types';
import { GovNetworkMemberNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovPortalNetworkMemberService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<NetworkMember> {
    const item = await this.repo.findNetworkMemberById(schoolId, id);
    if (!item) throw new GovNetworkMemberNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<NetworkMember[]> {
    return this.repo.findAllNetworkMembers(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<NetworkMemberCreate>): Promise<NetworkMember> {
    return this.repo.createNetworkMember(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<NetworkMemberCreate>): Promise<NetworkMember> {
    const existing = await this.repo.findNetworkMemberById(schoolId, id);
    if (!existing) throw new GovNetworkMemberNotFoundError(id);
    return this.repo.updateNetworkMember(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findNetworkMemberById(schoolId, id);
    if (!existing) throw new GovNetworkMemberNotFoundError(id);
    return this.repo.deleteNetworkMember(schoolId, id);
  }
}
