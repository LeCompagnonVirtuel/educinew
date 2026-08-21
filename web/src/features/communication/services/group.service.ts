import type { CommunicationRepositoryExtended, Group } from '@/features/communication/types';
import {
  CommGroupNotFoundError,
  CommGroupAccessDeniedError,
  CommGroupAlreadyExistsError,
  CommGroupFullError,
  CommGroupMemberNotFoundError,
  GroupRoleError,
  GroupInviteError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createGroupService(repository: CommunicationRepositoryExtended) {
  return {
    async getGroups(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching groups', { schoolId, userId }, 'GroupService');

        const groups = await repository.getGroups(schoolId, userId, filters);

        logger.info('Groups fetched', { schoolId, count: groups.length }, 'GroupService');

        return groups;
      } catch (error) {
        logger.error('Failed to fetch groups', { schoolId }, 'GroupService');
        throw error;
      }
    },

    async getGroup(groupId: string, userId: string) {
      try {
        if (!groupId) throw new Error('groupId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching group', { groupId, userId }, 'GroupService');

        const group = await repository.getGroup(groupId);
        if (!group) throw new CommGroupNotFoundError(groupId);

        return group;
      } catch (error) {
        logger.error('Failed to fetch group', { groupId }, 'GroupService');
        throw error;
      }
    },

    async createGroup(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.name) throw new Error('group name is required');
        if (data.name.length > 255) throw new Error('group name too long');

        logger.info('Creating group', { schoolId, userId, name: data.name }, 'GroupService');

        const group = await repository.createGroup({
          ...data,
          schoolId,
          createdBy: userId,
          members: [{ userId, role: 'admin', joinedAt: new Date().toISOString() }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'group.created', { groupId: group.id, userId });

        logger.info('Group created', { groupId: group.id }, 'GroupService');

        return group;
      } catch (error) {
        logger.error('Failed to create group', { schoolId }, 'GroupService');
        throw error;
      }
    },

    async updateGroup(groupId: string, userId: string, data: any) {
      try {
        if (!groupId) throw new Error('groupId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating group', { groupId, userId }, 'GroupService');

        const existing = await repository.getGroup(groupId);
        if (!existing) throw new CommGroupNotFoundError(groupId);

        const updated = await repository.updateGroup(groupId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'group.updated', { groupId, userId });

        logger.info('Group updated', { groupId }, 'GroupService');

        return updated;
      } catch (error) {
        logger.error('Failed to update group', { groupId }, 'GroupService');
        throw error;
      }
    },

    async deleteGroup(groupId: string, userId: string) {
      try {
        if (!groupId) throw new Error('groupId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting group', { groupId, userId }, 'GroupService');

        const existing = await repository.getGroup(groupId);
        if (!existing) throw new CommGroupNotFoundError(groupId);

        await repository.deleteGroup(groupId);

        await repository.logCommunicationEvent(existing.schoolId, 'group.deleted', { groupId, userId });

        logger.info('Group deleted', { groupId }, 'GroupService');
      } catch (error) {
        logger.error('Failed to delete group', { groupId }, 'GroupService');
        throw error;
      }
    },

    async addGroupMember(groupId: string, userId: string, memberId: string, role?: string) {
      try {
        if (!groupId) throw new Error('groupId is required');
        if (!userId) throw new Error('userId is required');
        if (!memberId) throw new Error('memberId is required');
        if (role && !['admin', 'moderator', 'member'].includes(role)) throw new GroupRoleError(role);

        logger.info('Adding group member', { groupId, userId, memberId, role }, 'GroupService');

        const group = await repository.getGroup(groupId);
        if (!group) throw new CommGroupNotFoundError(groupId);

        const member = {
          userId: memberId,
          role: role || 'member',
          joinedAt: new Date().toISOString(),
        };

        const updated = await repository.updateGroup(groupId, {
          members: [...(group.members || []), member],
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(group.schoolId, 'group.member_added', { groupId, userId, memberId });

        logger.info('Group member added', { groupId, memberId }, 'GroupService');

        return updated;
      } catch (error) {
        logger.error('Failed to add group member', { groupId }, 'GroupService');
        throw error;
      }
    },

    async removeGroupMember(groupId: string, userId: string, memberId: string) {
      try {
        if (!groupId) throw new Error('groupId is required');
        if (!userId) throw new Error('userId is required');
        if (!memberId) throw new Error('memberId is required');

        logger.info('Removing group member', { groupId, userId, memberId }, 'GroupService');

        const group = await repository.getGroup(groupId);
        if (!group) throw new CommGroupNotFoundError(groupId);

        const memberExists = (group.members || []).some((m: any) => m.userId === memberId);
        if (!memberExists) throw new CommGroupMemberNotFoundError(memberId);

        const updated = await repository.updateGroup(groupId, {
          members: (group.members || []).filter((m: any) => m.userId !== memberId),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(group.schoolId, 'group.member_removed', { groupId, userId, memberId });

        logger.info('Group member removed', { groupId, memberId }, 'GroupService');

        return updated;
      } catch (error) {
        logger.error('Failed to remove group member', { groupId }, 'GroupService');
        throw error;
      }
    },

    async updateGroupMemberRole(groupId: string, userId: string, memberId: string, role: string) {
      try {
        if (!groupId) throw new Error('groupId is required');
        if (!userId) throw new Error('userId is required');
        if (!memberId) throw new Error('memberId is required');
        if (!role) throw new Error('role is required');
        if (!['admin', 'moderator', 'member'].includes(role)) throw new GroupRoleError(role);

        logger.info('Updating group member role', { groupId, userId, memberId, role }, 'GroupService');

        const group = await repository.getGroup(groupId);
        if (!group) throw new CommGroupNotFoundError(groupId);

        const memberExists = (group.members || []).some((m: any) => m.userId === memberId);
        if (!memberExists) throw new CommGroupMemberNotFoundError(memberId);

        const updated = await repository.updateGroup(groupId, {
          members: (group.members || []).map((m: any) =>
            m.userId === memberId ? { ...m, role, updatedAt: new Date().toISOString() } : m
          ),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(group.schoolId, 'group.member_role_updated', { groupId, userId, memberId, role });

        logger.info('Group member role updated', { groupId, memberId, role }, 'GroupService');

        return updated;
      } catch (error) {
        logger.error('Failed to update group member role', { groupId }, 'GroupService');
        throw error;
      }
    },

    async inviteToGroup(groupId: string, userId: string, inviteeEmail: string, role?: string) {
      try {
        if (!groupId) throw new Error('groupId is required');
        if (!userId) throw new Error('userId is required');
        if (!inviteeEmail) throw new Error('inviteeEmail is required');
        if (role && !['admin', 'moderator', 'member'].includes(role)) throw new GroupRoleError(role);

        logger.info('Inviting to group', { groupId, userId, inviteeEmail }, 'GroupService');

        const group = await repository.getGroup(groupId);
        if (!group) throw new CommGroupNotFoundError(groupId);

        const invite = await repository.createGroupInvite({
          groupId,
          invitedBy: userId,
          email: inviteeEmail,
          role: role || 'member',
          status: 'pending',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(group.schoolId, 'group.invite_sent', { groupId, userId, inviteeEmail });

        logger.info('Group invite sent', { groupId, inviteId: invite.id }, 'GroupService');

        return invite;
      } catch (error) {
        logger.error('Failed to invite to group', { groupId }, 'GroupService');
        throw error;
      }
    },

    async getGroupInvites(groupId: string, userId: string) {
      try {
        if (!groupId) throw new Error('groupId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching group invites', { groupId, userId }, 'GroupService');

        const group = await repository.getGroup(groupId);
        if (!group) throw new CommGroupNotFoundError(groupId);

        const invites = await repository.getGroupInvites(groupId);

        logger.info('Group invites fetched', { groupId, count: invites.length }, 'GroupService');

        return invites;
      } catch (error) {
        logger.error('Failed to fetch group invites', { groupId }, 'GroupService');
        throw error;
      }
    },

    async getGroupStats(groupId: string) {
      try {
        if (!groupId) throw new Error('groupId is required');

        logger.info('Fetching group stats', { groupId }, 'GroupService');

        const stats = await repository.getGroupStats(groupId);

        logger.info('Group stats fetched', { groupId }, 'GroupService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch group stats', { groupId }, 'GroupService');
        throw error;
      }
    },

    async bulkArchiveConversations(conversationIds: string[]) {
      try {
        if (!conversationIds || conversationIds.length === 0) throw new Error('conversationIds are required');

        logger.info('Bulk archiving conversations', { count: conversationIds.length }, 'GroupService');

        await repository.bulkArchiveConversations(conversationIds);

        logger.info('Conversations archived in bulk', { count: conversationIds.length }, 'GroupService');
      } catch (error) {
        logger.error('Failed to bulk archive conversations', {}, 'GroupService');
        throw error;
      }
    },
  };
}
