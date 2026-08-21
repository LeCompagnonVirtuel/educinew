import type { SupabaseMessageRepository } from '../repositories';
import {
  createGroupSchema,
  updateGroupSchema,
  groupMemberSchema,
  messageFiltersSchema,
} from '../validators/schemas';
import { logger } from '@educi/logger';

interface GroupServiceDeps {
  repository: SupabaseMessageRepository;
  schoolId: string;
}

export class GroupService {
  constructor(private readonly deps: GroupServiceDeps) {}

  async findGroup(id: string) {
    const group = await this.deps.repository.findGroup(id);
    if (!group) throw new Error('Group not found');
    return group;
  }

  async findAllGroups(filters?: Record<string, unknown>) {
    const parsed = filters ? messageFiltersSchema.parse(filters) : undefined;
    return this.deps.repository.findAllGroups(this.deps.schoolId, parsed as any);
  }

  async createGroup(data: Record<string, unknown>, createdBy: string) {
    const parsed = createGroupSchema.parse(data);
    const group = await this.deps.repository.createGroup(parsed as any, this.deps.schoolId, createdBy);
    logger.info('Group created', { groupId: group.id }, 'messages');
    return group;
  }

  async updateGroup(id: string, data: Record<string, unknown>) {
    const existing = await this.deps.repository.findGroup(id);
    if (!existing) throw new Error('Group not found');
    const parsed = updateGroupSchema.parse(data);
    const updated = await this.deps.repository.updateGroup(id, parsed as any);
    logger.info('Group updated', { groupId: id }, 'messages');
    return updated;
  }

  async deleteGroup(id: string) {
    const existing = await this.deps.repository.findGroup(id);
    if (!existing) throw new Error('Group not found');
    await this.deps.repository.deleteGroup(id);
    logger.info('Group deleted', { groupId: id }, 'messages');
  }

  async archiveGroup(id: string) {
    const existing = await this.deps.repository.findGroup(id);
    if (!existing) throw new Error('Group not found');
    return this.deps.repository.archiveGroup(id);
  }

  async findGroupMembers(groupId: string) {
    const group = await this.deps.repository.findGroup(groupId);
    if (!group) throw new Error('Group not found');
    return this.deps.repository.findGroupMembers(groupId);
  }

  async addGroupMember(groupId: string, userId: string, role?: string) {
    const group = await this.deps.repository.findGroup(groupId);
    if (!group) throw new Error('Group not found');
    return this.deps.repository.addGroupMember(groupId, userId, role);
  }

  async removeGroupMember(groupId: string, userId: string) {
    const group = await this.deps.repository.findGroup(groupId);
    if (!group) throw new Error('Group not found');
    await this.deps.repository.removeGroupMember(groupId, userId);
    logger.info('Member removed from group', { groupId, userId }, 'messages');
  }
}
