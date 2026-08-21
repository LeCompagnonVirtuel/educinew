import type { SupabaseClient } from '@supabase/supabase-js';
import type { Community, CommunityMember } from '@educi/types';
import { LxpCommunityNotFoundError, LxpCommunityCreateError, LxpCommunityJoinError, LxpCommunityLeaveError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpCommunityService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getCommunity(schoolId: string, id: string): Promise<Community> {
    const community = await this.repo.findCommunityById(schoolId, id);
    if (!community) throw new LxpCommunityNotFoundError(id);
    return community;
  }

  async listCommunities(schoolId: string): Promise<readonly Community[]> {
    return this.repo.findCommunities(schoolId);
  }

  async createCommunity(data: Omit<Community, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'postCount' | 'lastActivityAt'>): Promise<Community> {
    const created = await this.repo.createCommunity(data);
    if (!created) throw new LxpCommunityCreateError();
    return created;
  }

  async joinCommunity(schoolId: string, id: string, userId: string): Promise<CommunityMember> {
    const existing = await this.repo.findCommunityById(schoolId, id);
    if (!existing) throw new LxpCommunityNotFoundError(id);
    const joined = await this.repo.joinCommunity(id, userId);
    if (!joined) throw new LxpCommunityJoinError();
    return joined;
  }

  async leaveCommunity(schoolId: string, id: string, userId: string): Promise<void> {
    const existing = await this.repo.findCommunityById(schoolId, id);
    if (!existing) throw new LxpCommunityNotFoundError(id);
    const left = await this.repo.leaveCommunity(id, userId);
    if (!left) throw new LxpCommunityLeaveError();
  }
}
