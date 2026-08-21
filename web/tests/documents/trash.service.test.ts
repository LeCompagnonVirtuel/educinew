import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTrashService } from '../../src/features/documents/services/trash.service';

describe('TrashService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getTrashItems: vi.fn(),
      restoreFromTrash: vi.fn(),
      permanentlyDeleteFromTrash: vi.fn(),
      emptyTrash: vi.fn(),
      getTrashStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createTrashService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getTrashItems).toBeInstanceOf(Function);
    expect(service.restoreFromTrash).toBeInstanceOf(Function);
    expect(service.emptyTrash).toBeInstanceOf(Function);
    expect(service.getTrashStats).toBeInstanceOf(Function);
  });

  describe('getTrashItems', () => {
    it('should return trash items', async () => {
      const items = [{ id: '1', name: 'deleted-file.pdf' }];
      mockRepository.getTrashItems.mockResolvedValue(items);
      const service = createTrashService(mockRepository);
      const result = await service.getTrashItems('school-1', 'user-1');
      expect(result).toEqual(items);
      expect(mockRepository.getTrashItems).toHaveBeenCalledWith('school-1');
    });
  });

  describe('restoreFromTrash', () => {
    it('should restore document from trash', async () => {
      mockRepository.restoreFromTrash.mockResolvedValue({ id: 'doc-1', restored: true });
      const service = createTrashService(mockRepository);
      const result = await service.restoreFromTrash('trash-1', 'user-1');
      expect(result).toEqual({ id: 'doc-1', restored: true });
      expect(mockRepository.restoreFromTrash).toHaveBeenCalledWith('trash-1');
    });
  });

  describe('permanentDelete', () => {
    it('should permanently delete an item', async () => {
      mockRepository.permanentlyDeleteFromTrash.mockResolvedValue(undefined);
      const service = createTrashService(mockRepository);
      await service.permanentDelete('trash-1', 'user-1');
      expect(mockRepository.permanentlyDeleteFromTrash).toHaveBeenCalledWith('trash-1');
    });
  });

  describe('emptyTrash', () => {
    it('should empty the trash', async () => {
      mockRepository.emptyTrash.mockResolvedValue(undefined);
      const service = createTrashService(mockRepository);
      await service.emptyTrash('school-1', 'user-1');
      expect(mockRepository.emptyTrash).toHaveBeenCalledWith('school-1');
    });
  });

  describe('getTrashStats', () => {
    it('should return trash statistics', async () => {
      const stats = { totalItems: 10, totalSize: 1024 };
      mockRepository.getTrashStats.mockResolvedValue(stats);
      const service = createTrashService(mockRepository);
      const result = await service.getTrashStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getTrashStats).toHaveBeenCalledWith('school-1');
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing schoolId for getTrashItems', async () => {
      const service = createTrashService(mockRepository);
      await expect(service.getTrashItems('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing trashId for restoreFromTrash', async () => {
      const service = createTrashService(mockRepository);
      await expect(service.restoreFromTrash('', 'user-1')).rejects.toThrow('trashId is required');
    });

    it('should throw on missing schoolId for emptyTrash', async () => {
      const service = createTrashService(mockRepository);
      await expect(service.emptyTrash('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing schoolId for getTrashStats', async () => {
      const service = createTrashService(mockRepository);
      await expect(service.getTrashStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in getTrashItems', async () => {
      mockRepository.getTrashItems.mockRejectedValue(new Error('DB connection failed'));
      const service = createTrashService(mockRepository);
      await expect(service.getTrashItems('school-1', 'user-1')).rejects.toThrow('DB connection failed');
    });

    it('should handle repository errors in restoreFromTrash', async () => {
      mockRepository.restoreFromTrash.mockRejectedValue(new Error('Restore failed'));
      const service = createTrashService(mockRepository);
      await expect(service.restoreFromTrash('trash-1', 'user-1')).rejects.toThrow('Restore failed');
    });

    it('should handle repository errors in permanentDelete', async () => {
      mockRepository.permanentlyDeleteFromTrash.mockRejectedValue(new Error('Permanent delete failed'));
      const service = createTrashService(mockRepository);
      await expect(service.permanentDelete('trash-1', 'user-1')).rejects.toThrow('Permanent delete failed');
    });

    it('should handle repository errors in emptyTrash', async () => {
      mockRepository.emptyTrash.mockRejectedValue(new Error('Delete failed'));
      const service = createTrashService(mockRepository);
      await expect(service.emptyTrash('school-1', 'user-1')).rejects.toThrow('Delete failed');
    });

    it('should handle repository errors in getTrashStats', async () => {
      mockRepository.getTrashStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createTrashService(mockRepository);
      await expect(service.getTrashStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
