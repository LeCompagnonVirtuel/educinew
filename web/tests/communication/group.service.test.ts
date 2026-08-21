import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGroupService } from '../../src/features/communication/services/group.service';

const mockRepository = {
  getGroups: vi.fn(),
  getGroup: vi.fn(),
  createGroup: vi.fn(),
  updateGroup: vi.fn(),
  deleteGroup: vi.fn(),
  createGroupInvite: vi.fn(),
  getGroupInvites: vi.fn(),
  getGroupStats: vi.fn(),
  bulkArchiveConversations: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('GroupService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create GroupService with all methods', () => {
    const service = createGroupService(mockRepository as any);
    expect(typeof service.getGroups).toBe('function');
    expect(typeof service.getGroup).toBe('function');
    expect(typeof service.createGroup).toBe('function');
    expect(typeof service.updateGroup).toBe('function');
    expect(typeof service.deleteGroup).toBe('function');
    expect(typeof service.addGroupMember).toBe('function');
    expect(typeof service.removeGroupMember).toBe('function');
    expect(typeof service.updateGroupMemberRole).toBe('function');
    expect(typeof service.inviteToGroup).toBe('function');
    expect(typeof service.getGroupInvites).toBe('function');
    expect(typeof service.getGroupStats).toBe('function');
    expect(typeof service.bulkArchiveConversations).toBe('function');
  });

  it('should fetch groups', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroups.mockResolvedValue([{ id: 'g1' }]);
    const result = await service.getGroups('school1', 'user1');
    expect(result).toEqual([{ id: 'g1' }]);
  });

  it('should throw if schoolId missing for getGroups', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.getGroups('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getGroups', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.getGroups('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a group', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', members: [] });
    const result = await service.getGroup('g1', 'user1');
    expect(result).toEqual({ id: 'g1', members: [] });
  });

  it('should throw if group not found', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue(null);
    await expect(service.getGroup('g1', 'user1')).rejects.toThrow();
  });

  it('should create a group', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.createGroup.mockResolvedValue({ id: 'g1', name: 'Test Group' });
    const result = await service.createGroup('school1', 'user1', { name: 'Test Group' });
    expect(result.name).toBe('Test Group');
  });

  it('should throw if name missing for createGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.createGroup('school1', 'user1', {})).rejects.toThrow('group name is required');
  });

  it('should throw if name exceeds 255 characters', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.createGroup('school1', 'user1', { name: 'x'.repeat(256) })).rejects.toThrow('group name too long');
  });

  it('should update a group', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1' });
    mockRepository.updateGroup.mockResolvedValue({ id: 'g1', name: 'updated' });
    const result = await service.updateGroup('g1', 'user1', { name: 'updated' });
    expect(result.name).toBe('updated');
  });

  it('should throw if data missing for updateGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.updateGroup('g1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should throw if group not found for update', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue(null);
    await expect(service.updateGroup('g1', 'user1', { name: 'x' })).rejects.toThrow();
  });

  it('should delete a group', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1' });
    await service.deleteGroup('g1', 'user1');
    expect(mockRepository.deleteGroup).toHaveBeenCalledWith('g1');
  });

  it('should throw if group not found for delete', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue(null);
    await expect(service.deleteGroup('g1', 'user1')).rejects.toThrow();
  });

  it('should add a group member', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1', members: [] });
    mockRepository.updateGroup.mockResolvedValue({ id: 'g1', members: [{ userId: 'user2', role: 'member' }] });
    const result = await service.addGroupMember('g1', 'user1', 'user2');
    expect(result.members).toHaveLength(1);
  });

  it('should throw if memberId missing for addGroupMember', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.addGroupMember('g1', 'user1', '')).rejects.toThrow('memberId is required');
  });

  it('should throw if invalid role for addGroupMember', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.addGroupMember('g1', 'user1', 'user2', 'invalid')).rejects.toThrow();
  });

  it('should remove a group member', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1', members: [{ userId: 'user2' }] });
    mockRepository.updateGroup.mockResolvedValue({ id: 'g1', members: [] });
    const result = await service.removeGroupMember('g1', 'user1', 'user2');
    expect(result.members).toHaveLength(0);
  });

  it('should throw if member not found for removeGroupMember', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', members: [] });
    await expect(service.removeGroupMember('g1', 'user1', 'user2')).rejects.toThrow();
  });

  it('should update group member role', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1', members: [{ userId: 'user2', role: 'member' }] });
    mockRepository.updateGroup.mockResolvedValue({ id: 'g1', members: [{ userId: 'user2', role: 'admin' }] });
    const result = await service.updateGroupMemberRole('g1', 'user1', 'user2', 'admin');
    expect(result.members[0].role).toBe('admin');
  });

  it('should throw if role missing for updateGroupMemberRole', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.updateGroupMemberRole('g1', 'user1', 'user2', '')).rejects.toThrow('role is required');
  });

  it('should throw if invalid role for updateGroupMemberRole', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.updateGroupMemberRole('g1', 'user1', 'user2', 'superadmin')).rejects.toThrow();
  });

  it('should invite to group', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1' });
    mockRepository.createGroupInvite.mockResolvedValue({ id: 'inv1', email: 'test@test.com' });
    const result = await service.inviteToGroup('g1', 'user1', 'test@test.com');
    expect(result.email).toBe('test@test.com');
  });

  it('should throw if inviteeEmail missing for inviteToGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.inviteToGroup('g1', 'user1', '')).rejects.toThrow('inviteeEmail is required');
  });

  it('should throw if invalid role for inviteToGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.inviteToGroup('g1', 'user1', 'test@test.com', 'bad')).rejects.toThrow();
  });

  it('should get group invites', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1' });
    mockRepository.getGroupInvites.mockResolvedValue([{ id: 'inv1' }]);
    const result = await service.getGroupInvites('g1', 'user1');
    expect(result).toEqual([{ id: 'inv1' }]);
  });

  it('should get group stats', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroupStats.mockResolvedValue({ members: 10 });
    const result = await service.getGroupStats('g1');
    expect(result).toEqual({ members: 10 });
  });

  it('should bulk archive conversations', async () => {
    const service = createGroupService(mockRepository as any);
    await service.bulkArchiveConversations(['c1', 'c2']);
    expect(mockRepository.bulkArchiveConversations).toHaveBeenCalledWith(['c1', 'c2']);
  });

  it('should throw if conversationIds empty for bulkArchive', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.bulkArchiveConversations([])).rejects.toThrow('conversationIds are required');
  });

  it('should handle getGroups with filters', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroups.mockResolvedValue([]);
    await service.getGroups('school1', 'user1', { limit: 5 });
    expect(mockRepository.getGroups).toHaveBeenCalledWith('school1', 'user1', { limit: 5 });
  });

  it('should handle getGroup error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockRejectedValue(new Error('fail'));
    await expect(service.getGroup('g1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle createGroup error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.createGroup.mockRejectedValue(new Error('fail'));
    await expect(service.createGroup('school1', 'user1', { name: 'g' })).rejects.toThrow('fail');
  });

  it('should handle addGroupMember error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockRejectedValue(new Error('fail'));
    await expect(service.addGroupMember('g1', 'user1', 'user2')).rejects.toThrow('fail');
  });

  it('should handle removeGroupMember error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockRejectedValue(new Error('fail'));
    await expect(service.removeGroupMember('g1', 'user1', 'user2')).rejects.toThrow('fail');
  });

  it('should handle updateGroupMemberRole error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockRejectedValue(new Error('fail'));
    await expect(service.updateGroupMemberRole('g1', 'user1', 'user2', 'admin')).rejects.toThrow('fail');
  });

  it('should handle inviteToGroup error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockRejectedValue(new Error('fail'));
    await expect(service.inviteToGroup('g1', 'user1', 'test@test.com')).rejects.toThrow('fail');
  });

  it('should handle getGroupInvites error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockRejectedValue(new Error('fail'));
    await expect(service.getGroupInvites('g1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle getGroupStats error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroupStats.mockRejectedValue(new Error('fail'));
    await expect(service.getGroupStats('g1')).rejects.toThrow('fail');
  });

  it('should handle bulkArchiveConversations error', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.bulkArchiveConversations.mockRejectedValue(new Error('fail'));
    await expect(service.bulkArchiveConversations(['c1'])).rejects.toThrow('fail');
  });

  it('should add member with custom role', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1', members: [] });
    mockRepository.updateGroup.mockResolvedValue({ id: 'g1', members: [{ userId: 'user2', role: 'moderator' }] });
    const result = await service.addGroupMember('g1', 'user1', 'user2', 'moderator');
    expect(result.members[0].role).toBe('moderator');
  });

  it('should throw if groupId missing for addGroupMember', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.addGroupMember('', 'user1', 'user2')).rejects.toThrow('groupId is required');
  });

  it('should throw if userId missing for addGroupMember', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.addGroupMember('g1', '', 'user2')).rejects.toThrow('userId is required');
  });

  it('should throw if groupId missing for removeGroupMember', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.removeGroupMember('', 'user1', 'user2')).rejects.toThrow('groupId is required');
  });

  it('should throw if groupId missing for updateGroupMemberRole', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.updateGroupMemberRole('', 'user1', 'user2', 'admin')).rejects.toThrow('groupId is required');
  });

  it('should throw if groupId missing for inviteToGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.inviteToGroup('', 'user1', 'test@test.com')).rejects.toThrow('groupId is required');
  });

  it('should throw if groupId missing for getGroupInvites', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.getGroupInvites('', 'user1')).rejects.toThrow('groupId is required');
  });

  it('should throw if groupId missing for getGroupStats', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.getGroupStats('')).rejects.toThrow('groupId is required');
  });

  it('should throw if groupId missing for getGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.getGroup('', 'user1')).rejects.toThrow('groupId is required');
  });

  it('should throw if userId missing for getGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.getGroup('g1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if groupId missing for deleteGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.deleteGroup('', 'user1')).rejects.toThrow('groupId is required');
  });

  it('should throw if groupId missing for updateGroup', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.updateGroup('', 'user1', { name: 'x' })).rejects.toThrow('groupId is required');
  });

  it('should invite with default role', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1' });
    mockRepository.createGroupInvite.mockResolvedValue({ id: 'inv1' });
    await service.inviteToGroup('g1', 'user1', 'test@test.com');
    expect(mockRepository.createGroupInvite).toHaveBeenCalledWith(expect.objectContaining({ role: 'member' }));
  });

  it('should throw if userId missing for getGroupInvites', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.getGroupInvites('g1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if userId missing for removeGroupMember', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.removeGroupMember('g1', '', 'user2')).rejects.toThrow('userId is required');
  });

  it('should throw if memberId missing for removeGroupMember', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.removeGroupMember('g1', 'user1', '')).rejects.toThrow('memberId is required');
  });

  it('should throw if memberId missing for updateGroupMemberRole', async () => {
    const service = createGroupService(mockRepository as any);
    await expect(service.updateGroupMemberRole('g1', 'user1', '', 'admin')).rejects.toThrow('memberId is required');
  });

  it('should log event on createGroup', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.createGroup.mockResolvedValue({ id: 'g1' });
    await service.createGroup('school1', 'user1', { name: 'g' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'group.created', expect.any(Object));
  });

  it('should log event on updateGroup', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1' });
    mockRepository.updateGroup.mockResolvedValue({ id: 'g1' });
    await service.updateGroup('g1', 'user1', { name: 'x' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'group.updated', expect.any(Object));
  });

  it('should log event on deleteGroup', async () => {
    const service = createGroupService(mockRepository as any);
    mockRepository.getGroup.mockResolvedValue({ id: 'g1', schoolId: 'school1' });
    await service.deleteGroup('g1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'group.deleted', expect.any(Object));
  });
});
