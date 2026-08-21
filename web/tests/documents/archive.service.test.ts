import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createArchiveService } from '../../src/features/documents/services/archive.service';

const mockRepository = {
  getArchives: vi.fn(),
  getArchive: vi.fn(),
  archiveDocument: vi.fn(),
  restoreFromArchive: vi.fn(),
  deleteArchive: vi.fn(),
  getArchiveRules: vi.fn(),
  getOCRArchiveStats: vi.fn(),
  createArchiveRule: vi.fn(),
  updateArchiveRule: vi.fn(),
  deleteArchiveRule: vi.fn(),
};

describe('ArchiveService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create ArchiveService with all methods', () => {
    const service = createArchiveService(mockRepository as any);
    expect(typeof service.getArchives).toBe('function');
    expect(typeof service.getArchive).toBe('function');
    expect(typeof service.createArchive).toBe('function');
    expect(typeof service.updateArchive).toBe('function');
    expect(typeof service.deleteArchive).toBe('function');
    expect(typeof service.archiveDocument).toBe('function');
    expect(typeof service.restoreFromArchive).toBe('function');
    expect(typeof service.getArchiveRules).toBe('function');
    expect(typeof service.getArchiveStats).toBe('function');
  });

  it('should fetch archives', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchives.mockResolvedValue([{ id: 'ar1' }]);
    const result = await service.getArchives('school1', 'user1');
    expect(result).toEqual([{ id: 'ar1' }]);
  });

  it('should throw if schoolId missing for getArchives', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.getArchives('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getArchives', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.getArchives('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single archive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue({ id: 'ar1', documentId: 'doc1' });
    const result = await service.getArchive('ar1', 'user1');
    expect(result).toEqual({ id: 'ar1', documentId: 'doc1' });
  });

  it('should throw if archive not found', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue(null);
    await expect(service.getArchive('ar1', 'user1')).rejects.toThrow();
  });

  it('should throw if archiveId missing for getArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.getArchive('', 'user1')).rejects.toThrow('archiveId is required');
  });

  it('should throw if userId missing for getArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.getArchive('ar1', '')).rejects.toThrow('userId is required');
  });

  it('should create an archive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.archiveDocument.mockResolvedValue({ id: 'ar1', documentId: 'doc1' });
    const result = await service.createArchive('school1', 'user1', { documentId: 'doc1', reason: 'Retention' });
    expect(result).toEqual({ id: 'ar1', documentId: 'doc1' });
  });

  it('should throw if schoolId missing for createArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.createArchive('', 'user1', { documentId: 'doc1' })).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for createArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.createArchive('school1', '', { documentId: 'doc1' })).rejects.toThrow('userId is required');
  });

  it('should update an archive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue({ id: 'ar1' });
    const result = await service.updateArchive('ar1', 'user1', { status: 'restored' });
    expect(result).toEqual({ id: 'ar1' });
  });

  it('should throw if archive not found for updateArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue(null);
    await expect(service.updateArchive('ar1', 'user1', { status: 'restored' })).rejects.toThrow();
  });

  it('should throw if archiveId missing for updateArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.updateArchive('', 'user1', { status: 'restored' })).rejects.toThrow('archiveId is required');
  });

  it('should throw if userId missing for updateArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.updateArchive('ar1', '', { status: 'restored' })).rejects.toThrow('userId is required');
  });

  it('should throw if data missing for updateArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.updateArchive('ar1', 'user1', null as any)).rejects.toThrow('update data is required');
  });

  it('should delete an archive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue({ id: 'ar1' });
    mockRepository.deleteArchive.mockResolvedValue(undefined);
    await service.deleteArchive('ar1', 'user1');
    expect(mockRepository.deleteArchive).toHaveBeenCalledWith('ar1');
  });

  it('should throw if archive not found for deleteArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue(null);
    await expect(service.deleteArchive('ar1', 'user1')).rejects.toThrow();
  });

  it('should throw if archiveId missing for deleteArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.deleteArchive('', 'user1')).rejects.toThrow('archiveId is required');
  });

  it('should throw if userId missing for deleteArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.deleteArchive('ar1', '')).rejects.toThrow('userId is required');
  });

  it('should archive a document', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.archiveDocument.mockResolvedValue({ id: 'ar1', documentId: 'doc1' });
    const result = await service.archiveDocument('doc1', 'school1', 'user1', { reason: 'Compliance' });
    expect(result).toEqual({ id: 'ar1', documentId: 'doc1' });
  });

  it('should throw if documentId missing for archiveDocument', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.archiveDocument('', 'school1', 'user1')).rejects.toThrow('documentId is required');
  });

  it('should throw if schoolId missing for archiveDocument', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.archiveDocument('doc1', '', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for archiveDocument', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.archiveDocument('doc1', 'school1', '')).rejects.toThrow('userId is required');
  });

  it('should restore from archive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue({ id: 'ar1' });
    mockRepository.restoreFromArchive.mockResolvedValue({ id: 'doc1', archived: false });
    const result = await service.restoreFromArchive('ar1', 'user1');
    expect(result).toEqual({ id: 'doc1', archived: false });
  });

  it('should throw if archive not found for restoreFromArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue(null);
    await expect(service.restoreFromArchive('ar1', 'user1')).rejects.toThrow();
  });

  it('should throw if archiveId missing for restoreFromArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.restoreFromArchive('', 'user1')).rejects.toThrow('archiveId is required');
  });

  it('should throw if userId missing for restoreFromArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.restoreFromArchive('ar1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch archive rules', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchiveRules.mockResolvedValue([{ id: 'r1', name: 'Auto Archive' }]);
    const result = await service.getArchiveRules('school1', 'user1');
    expect(result).toEqual([{ id: 'r1', name: 'Auto Archive' }]);
  });

  it('should throw if schoolId missing for getArchiveRules', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.getArchiveRules('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getArchiveRules', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.getArchiveRules('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch archive stats', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getOCRArchiveStats.mockResolvedValue({ totalArchives: 25 });
    const result = await service.getArchiveStats('school1', 'user1');
    expect(result).toEqual({ totalArchives: 25 });
  });

  it('should throw if schoolId missing for getArchiveStats', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.getArchiveStats('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getArchiveStats', async () => {
    const service = createArchiveService(mockRepository as any);
    await expect(service.getArchiveStats('school1', '')).rejects.toThrow('userId is required');
  });

  it('should handle repository errors for getArchives', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchives.mockRejectedValue(new Error('DB error'));
    await expect(service.getArchives('school1', 'user1')).rejects.toThrow('DB error');
  });

  it('should handle repository errors for createArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.archiveDocument.mockRejectedValue(new Error('Create failed'));
    await expect(service.createArchive('school1', 'user1', { documentId: 'doc1' })).rejects.toThrow('Create failed');
  });

  it('should handle repository errors for archiveDocument', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.archiveDocument.mockRejectedValue(new Error('Archive failed'));
    await expect(service.archiveDocument('doc1', 'school1', 'user1')).rejects.toThrow('Archive failed');
  });

  it('should handle repository errors for restoreFromArchive', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getArchive.mockResolvedValue({ id: 'ar1' });
    mockRepository.restoreFromArchive.mockRejectedValue(new Error('Restore failed'));
    await expect(service.restoreFromArchive('ar1', 'user1')).rejects.toThrow('Restore failed');
  });

  it('should handle repository errors for getArchiveStats', async () => {
    const service = createArchiveService(mockRepository as any);
    mockRepository.getOCRArchiveStats.mockRejectedValue(new Error('Stats failed'));
    await expect(service.getArchiveStats('school1', 'user1')).rejects.toThrow('Stats failed');
  });
});
