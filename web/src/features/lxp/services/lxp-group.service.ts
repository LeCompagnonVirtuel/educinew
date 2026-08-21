import type { SupabaseClient } from '@supabase/supabase-js';
import type { Group, GroupMember } from '@educi/types';
import { LxpGroupNotFoundError, LxpGroupCreateError, LxpGroupJoinError, LxpGroupLeaveError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpGroupService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getGroup(schoolId: string, id: string): Promise<Group> {
    const group = await this.repo.findGroupById(schoolId, id);
    if (!group) throw new LxpGroupNotFoundError(id);
    return group;
  }

  async listGroups(schoolId: string, courseId?: string): Promise<readonly Group[]> {
    return this.repo.findGroups(schoolId, courseId);
  }

  async createGroup(data: Omit<Group, 'id' | 'createdAt' | 'updatedAt' | 'memberCount'>): Promise<Group> {
    const created = await this.repo.createGroup(data);
    if (!created) throw new LxpGroupCreateError();
    return created;
  }

  async joinGroup(schoolId: string, id: string, userId: string): Promise<GroupMember> {
    const existing = await this.repo.findGroupById(schoolId, id);
    if (!existing) throw new LxpGroupNotFoundError(id);
    const joined = await this.repo.joinGroup(id, userId);
    if (!joined) throw new LxpGroupJoinError();
    return joined;
  }

  async leaveGroup(schoolId: string, id: string, userId: string): Promise<void> {
    const existing = await this.repo.findGroupById(schoolId, id);
    if (!existing) throw new LxpGroupNotFoundError(id);
    const left = await this.repo.leaveGroup(id, userId);
    if (!left) throw new LxpGroupLeaveError();
  }
}
