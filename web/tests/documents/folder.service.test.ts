import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createFolderService } from '../../src/features/documents/services/folder.service';

const mockRepository = {
  getFolders: vi.fn(),
  getFolder: vi.fn(),
  createFolder: vi.fn(),
  updateFolder: vi.fn(),
  deleteFolder: vi.fn(),
  moveFolder: vi.fn(),
  renameFolder: vi.fn(),
  getFolderTree: vi.fn(),
};

describe('FolderService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create FolderService with all methods', () => {
    const service = createFolderService(mockRepository as any);
    expect(typeof service.getFolders).toBe('function');
    expect(typeof service.getFolder).toBe('function');
    expect(typeof service.createFolder).toBe('function');
    expect(typeof service.updateFolder).toBe('function');
    expect(typeof service.deleteFolder).toBe('function');
    expect(typeof service.moveFolder).toBe('function');
    expect(typeof service.renameFolder).toBe('function');
    expect(typeof service.getFolderTree).toBe('function');
  });

  it('should fetch folders', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolders.mockResolvedValue([{ id: 'f1' }]);
    const result = await service.getFolders('school1', 'user1');
    expect(result).toEqual([{ id: 'f1' }]);
  });

  it('should fetch folders with filters', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolders.mockResolvedValue([{ id: 'f1' }]);
    const filters = { parentId: 'root' };
    await service.getFolders('school1', 'user1', filters);
    expect(mockRepository.getFolders).toHaveBeenCalledWith('school1', filters);
  });

  it('should throw if schoolId missing for getFolders', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.getFolders('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getFolders', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.getFolders('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single folder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1', name: 'Docs' });
    const result = await service.getFolder('f1', 'user1');
    expect(result).toEqual({ id: 'f1', name: 'Docs' });
  });

  it('should throw if folder not found', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue(null);
    await expect(service.getFolder('f1', 'user1')).rejects.toThrow();
  });

  it('should throw if folderId missing for getFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.getFolder('', 'user1')).rejects.toThrow('folderId is required');
  });

  it('should throw if userId missing for getFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.getFolder('f1', '')).rejects.toThrow('userId is required');
  });

  it('should create a folder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.createFolder.mockResolvedValue({ id: 'f1', name: 'New Folder' });
    const result = await service.createFolder('school1', 'user1', { name: 'New Folder' });
    expect(result).toEqual({ id: 'f1', name: 'New Folder' });
    expect(mockRepository.createFolder).toHaveBeenCalledWith({ name: 'New Folder', createdBy: 'user1' }, 'school1');
  });

  it('should throw if schoolId missing for createFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.createFolder('', 'user1', { name: 'Folder' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for createFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.createFolder('school1', '', { name: 'Folder' })).rejects.toThrow('userId is required');
  });

  it('should throw if folder name missing for createFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.createFolder('school1', 'user1', {})).rejects.toThrow('folder name is required');
  });

  it('should update a folder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1' });
    mockRepository.updateFolder.mockResolvedValue({ id: 'f1', name: 'Updated' });
    const result = await service.updateFolder('f1', 'user1', { name: 'Updated' });
    expect(result).toEqual({ id: 'f1', name: 'Updated' });
  });

  it('should throw if folderId missing for updateFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.updateFolder('', 'user1', { name: 'Folder' })).rejects.toThrow('folderId is required');
  });

  it('should throw if userId missing for updateFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.updateFolder('f1', '', { name: 'Folder' })).rejects.toThrow('userId is required');
  });

  it('should throw if data missing for updateFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.updateFolder('f1', 'user1', null as any)).rejects.toThrow('update data is required');
  });

  it('should throw if folder not found for updateFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue(null);
    await expect(service.updateFolder('f1', 'user1', { name: 'Folder' })).rejects.toThrow();
  });

  it('should delete a folder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1' });
    mockRepository.deleteFolder.mockResolvedValue(undefined);
    await service.deleteFolder('f1', 'user1');
    expect(mockRepository.deleteFolder).toHaveBeenCalledWith('f1');
  });

  it('should throw if folderId missing for deleteFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.deleteFolder('', 'user1')).rejects.toThrow('folderId is required');
  });

  it('should throw if userId missing for deleteFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.deleteFolder('f1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if folder not found for deleteFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue(null);
    await expect(service.deleteFolder('f1', 'user1')).rejects.toThrow();
  });

  it('should move a folder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1' });
    mockRepository.moveFolder.mockResolvedValue({ id: 'f1', parentId: 'f2' });
    const result = await service.moveFolder('f1', 'f2', 'user1');
    expect(result).toEqual({ id: 'f1', parentId: 'f2' });
  });

  it('should throw if folderId missing for moveFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.moveFolder('', 'f2', 'user1')).rejects.toThrow('folderId is required');
  });

  it('should throw if targetParentId missing for moveFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.moveFolder('f1', '', 'user1')).rejects.toThrow('targetParentId is required');
  });

  it('should throw if userId missing for moveFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.moveFolder('f1', 'f2', '')).rejects.toThrow('userId is required');
  });

  it('should throw if circular reference for moveFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.moveFolder('f1', 'f1', 'user1')).rejects.toThrow();
  });

  it('should throw if folder not found for moveFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue(null);
    await expect(service.moveFolder('f1', 'f2', 'user1')).rejects.toThrow();
  });

  it('should rename a folder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1' });
    mockRepository.renameFolder.mockResolvedValue({ id: 'f1', name: 'Renamed' });
    const result = await service.renameFolder('f1', 'Renamed', 'user1');
    expect(result).toEqual({ id: 'f1', name: 'Renamed' });
  });

  it('should throw if folderId missing for renameFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.renameFolder('', 'New', 'user1')).rejects.toThrow('folderId is required');
  });

  it('should throw if newName missing for renameFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.renameFolder('f1', '', 'user1')).rejects.toThrow('newName is required');
  });

  it('should throw if userId missing for renameFolder', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.renameFolder('f1', 'New', '')).rejects.toThrow('userId is required');
  });

  it('should throw if folder not found for renameFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue(null);
    await expect(service.renameFolder('f1', 'New', 'user1')).rejects.toThrow();
  });

  it('should fetch folder tree', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolderTree.mockResolvedValue([{ id: 'f1', children: [] }]);
    const result = await service.getFolderTree('school1', 'user1');
    expect(result).toEqual([{ id: 'f1', children: [] }]);
  });

  it('should throw if schoolId missing for getFolderTree', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.getFolderTree('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getFolderTree', async () => {
    const service = createFolderService(mockRepository as any);
    await expect(service.getFolderTree('school1', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getFolders', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolders.mockRejectedValue(new Error('DB error'));
    await expect(service.getFolders('school1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.createFolder.mockRejectedValue(new Error('Create failed'));
    await expect(service.createFolder('school1', 'user1', { name: 'Folder' })).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for updateFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1' });
    mockRepository.updateFolder.mockRejectedValue(new Error('Update failed'));
    await expect(service.updateFolder('f1', 'user1', { name: 'Folder' })).rejects.toThrow('Update failed');
  });

  it('should handle repository errors for deleteFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1' });
    mockRepository.deleteFolder.mockRejectedValue(new Error('Delete failed'));
    await expect(service.deleteFolder('f1', 'user1')).rejects.toThrow('Delete failed');
  });

  it('should handle repository errors for moveFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1' });
    mockRepository.moveFolder.mockRejectedValue(new Error('Move failed'));
    await expect(service.moveFolder('f1', 'f2', 'user1')).rejects.toThrow('Move failed');
  });

  it('should handle repository errors for renameFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockResolvedValue({ id: 'f1' });
    mockRepository.renameFolder.mockRejectedValue(new Error('Rename failed'));
    await expect(service.renameFolder('f1', 'New', 'user1')).rejects.toThrow('Rename failed');
  });

  it('should handle repository errors for getFolderTree', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolderTree.mockRejectedValue(new Error('Tree failed'));
    await expect(service.getFolderTree('school1', 'user1')).rejects.toThrow('Tree failed');
  });

  it('should handle repository errors for getFolder', async () => {
    const service = createFolderService(mockRepository as any);
    mockRepository.getFolder.mockRejectedValue(new Error('Fetch failed'));
    await expect(service.getFolder('f1', 'user1')).rejects.toThrow('Fetch failed');
  });
});
