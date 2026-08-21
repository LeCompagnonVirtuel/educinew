import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createWorkspaceService } from '../../src/features/documents/services/workspace.service';

const mockRepository = {
  getWorkspaces: vi.fn(),
  getWorkspace: vi.fn(),
  createWorkspace: vi.fn(),
  updateWorkspace: vi.fn(),
  deleteWorkspace: vi.fn(),
  getWorkspaceMembers: vi.fn(),
  addWorkspaceMember: vi.fn(),
  removeWorkspaceMember: vi.fn(),
};

describe('WorkspaceService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create WorkspaceService with all methods', () => {
    const service = createWorkspaceService(mockRepository as any);
    expect(typeof service.getWorkspaces).toBe('function');
    expect(typeof service.getWorkspace).toBe('function');
    expect(typeof service.createWorkspace).toBe('function');
    expect(typeof service.updateWorkspace).toBe('function');
    expect(typeof service.deleteWorkspace).toBe('function');
    expect(typeof service.getWorkspaceMembers).toBe('function');
    expect(typeof service.addWorkspaceMember).toBe('function');
    expect(typeof service.removeWorkspaceMember).toBe('function');
  });

  it('should fetch workspaces', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspaces.mockResolvedValue([{ id: 'ws1' }]);
    const result = await service.getWorkspaces('school1', 'user1');
    expect(result).toEqual([{ id: 'ws1' }]);
  });

  it('should throw if schoolId missing for getWorkspaces', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.getWorkspaces('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getWorkspaces', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.getWorkspaces('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single workspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue({ id: 'ws1', name: 'Workspace 1' });
    const result = await service.getWorkspace('ws1', 'user1');
    expect(result).toEqual({ id: 'ws1', name: 'Workspace 1' });
  });

  it('should throw if workspace not found', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue(null);
    await expect(service.getWorkspace('ws1', 'user1')).rejects.toThrow();
  });

  it('should throw if workspaceId missing for getWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.getWorkspace('', 'user1')).rejects.toThrow('workspaceId is required');
  });

  it('should throw if userId missing for getWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.getWorkspace('ws1', '')).rejects.toThrow('userId is required');
  });

  it('should create a workspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.createWorkspace.mockResolvedValue({ id: 'ws1', name: 'New WS' });
    const result = await service.createWorkspace('school1', 'user1', { name: 'New WS' });
    expect(result).toEqual({ id: 'ws1', name: 'New WS' });
  });

  it('should throw if schoolId missing for createWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.createWorkspace('', 'user1', { name: 'WS' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for createWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.createWorkspace('school1', '', { name: 'WS' })).rejects.toThrow('userId is required');
  });

  it('should throw if workspace name missing for createWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.createWorkspace('school1', 'user1', {})).rejects.toThrow('workspace name is required');
  });

  it('should update a workspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue({ id: 'ws1' });
    mockRepository.updateWorkspace.mockResolvedValue({ id: 'ws1', name: 'Updated' });
    const result = await service.updateWorkspace('ws1', 'user1', { name: 'Updated' });
    expect(result).toEqual({ id: 'ws1', name: 'Updated' });
  });

  it('should throw if workspaceId missing for updateWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.updateWorkspace('', 'user1', { name: 'WS' })).rejects.toThrow('workspaceId is required');
  });

  it('should throw if userId missing for updateWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.updateWorkspace('ws1', '', { name: 'WS' })).rejects.toThrow('userId is required');
  });

  it('should throw if data missing for updateWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.updateWorkspace('ws1', 'user1', null as any)).rejects.toThrow('update data is required');
  });

  it('should throw if workspace not found for updateWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue(null);
    await expect(service.updateWorkspace('ws1', 'user1', { name: 'WS' })).rejects.toThrow();
  });

  it('should delete a workspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue({ id: 'ws1' });
    mockRepository.deleteWorkspace.mockResolvedValue(undefined);
    await service.deleteWorkspace('ws1', 'user1');
    expect(mockRepository.deleteWorkspace).toHaveBeenCalledWith('ws1');
  });

  it('should throw if workspaceId missing for deleteWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.deleteWorkspace('', 'user1')).rejects.toThrow('workspaceId is required');
  });

  it('should throw if userId missing for deleteWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.deleteWorkspace('ws1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if workspace not found for deleteWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue(null);
    await expect(service.deleteWorkspace('ws1', 'user1')).rejects.toThrow();
  });

  it('should fetch workspace members', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspaceMembers.mockResolvedValue([{ userId: 'u1' }]);
    const result = await service.getWorkspaceMembers('ws1', 'user1');
    expect(result).toEqual([{ userId: 'u1' }]);
  });

  it('should throw if workspaceId missing for getWorkspaceMembers', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.getWorkspaceMembers('', 'user1')).rejects.toThrow('workspaceId is required');
  });

  it('should throw if userId missing for getWorkspaceMembers', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.getWorkspaceMembers('ws1', '')).rejects.toThrow('userId is required');
  });

  it('should add a workspace member', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue({ id: 'ws1' });
    mockRepository.addWorkspaceMember.mockResolvedValue({ userId: 'u2', role: 'member' });
    const result = await service.addWorkspaceMember('ws1', 'user1', 'u2');
    expect(result).toEqual({ userId: 'u2', role: 'member' });
  });

  it('should add a workspace member with role', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue({ id: 'ws1' });
    mockRepository.addWorkspaceMember.mockResolvedValue({ userId: 'u2', role: 'admin' });
    const result = await service.addWorkspaceMember('ws1', 'user1', 'u2', 'admin');
    expect(result).toEqual({ userId: 'u2', role: 'admin' });
  });

  it('should throw if workspaceId missing for addWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.addWorkspaceMember('', 'user1', 'u2')).rejects.toThrow('workspaceId is required');
  });

  it('should throw if userId missing for addWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.addWorkspaceMember('ws1', '', 'u2')).rejects.toThrow('userId is required');
  });

  it('should throw if memberId missing for addWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.addWorkspaceMember('ws1', 'user1', '')).rejects.toThrow('memberId is required');
  });

  it('should throw if workspace not found for addWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue(null);
    await expect(service.addWorkspaceMember('ws1', 'user1', 'u2')).rejects.toThrow();
  });

  it('should remove a workspace member', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue({ id: 'ws1' });
    mockRepository.removeWorkspaceMember.mockResolvedValue(undefined);
    await service.removeWorkspaceMember('ws1', 'user1', 'u2');
    expect(mockRepository.removeWorkspaceMember).toHaveBeenCalledWith('ws1', 'u2');
  });

  it('should throw if workspaceId missing for removeWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.removeWorkspaceMember('', 'user1', 'u2')).rejects.toThrow('workspaceId is required');
  });

  it('should throw if userId missing for removeWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.removeWorkspaceMember('ws1', '', 'u2')).rejects.toThrow('userId is required');
  });

  it('should throw if memberId missing for removeWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    await expect(service.removeWorkspaceMember('ws1', 'user1', '')).rejects.toThrow('memberId is required');
  });

  it('should throw if workspace not found for removeWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue(null);
    await expect(service.removeWorkspaceMember('ws1', 'user1', 'u2')).rejects.toThrow();
  });

  it('should handle repository errors for getWorkspaces', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspaces.mockRejectedValue(new Error('DB error'));
    await expect(service.getWorkspaces('school1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createWorkspace', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.createWorkspace.mockRejectedValue(new Error('Create failed'));
    await expect(service.createWorkspace('school1', 'user1', { name: 'WS' })).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for getWorkspaceMembers', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspaceMembers.mockRejectedValue(new Error('Members failed'));
    await expect(service.getWorkspaceMembers('ws1', 'user1')).rejects.toThrow('Members failed');
  });

  it('should handle repository errors for addWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue({ id: 'ws1' });
    mockRepository.addWorkspaceMember.mockRejectedValue(new Error('Add failed'));
    await expect(service.addWorkspaceMember('ws1', 'user1', 'u2')).rejects.toThrow('Add failed');
  });

  it('should handle repository errors for removeWorkspaceMember', async () => {
    const service = createWorkspaceService(mockRepository as any);
    mockRepository.getWorkspace.mockResolvedValue({ id: 'ws1' });
    mockRepository.removeWorkspaceMember.mockRejectedValue(new Error('Remove failed'));
    await expect(service.removeWorkspaceMember('ws1', 'user1', 'u2')).rejects.toThrow('Remove failed');
  });
});
