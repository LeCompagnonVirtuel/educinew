import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createLegalHoldService } from '../../src/features/documents/services/legal-hold.service';

describe('LegalHoldService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getLegalHolds: vi.fn(),
      createLegalHold: vi.fn(),
      releaseLegalHold: vi.fn(),
      getDocumentsOnHold: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createLegalHoldService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getLegalHolds).toBeInstanceOf(Function);
    expect(service.createLegalHold).toBeInstanceOf(Function);
    expect(service.releaseLegalHold).toBeInstanceOf(Function);
  });

  describe('getLegalHolds', () => {
    it('should return legal holds list', async () => {
      const holds = [{ id: 'lh-1', name: 'Litigation Hold' }];
      mockRepository.getLegalHolds.mockResolvedValue(holds);
      const service = createLegalHoldService(mockRepository);
      const result = await service.getLegalHolds('school-1', 'user-1');
      expect(result).toEqual(holds);
      expect(mockRepository.getLegalHolds).toHaveBeenCalledWith('school-1');
    });
  });

  describe('createLegalHold', () => {
    it('should create a legal hold', async () => {
      const data = { name: 'Litigation Hold', description: 'Court case #123', documentIds: ['doc-1', 'doc-2'] };
      mockRepository.createLegalHold.mockResolvedValue({ id: 'lh-1', ...data, status: 'active' });
      const service = createLegalHoldService(mockRepository);
      const result = await service.createLegalHold('school-1', 'user-1', data);
      expect(result).toEqual({ id: 'lh-1', ...data, status: 'active' });
      expect(mockRepository.createLegalHold).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'Litigation Hold', createdBy: 'user-1' }),
        'school-1'
      );
    });
  });

  describe('releaseLegalHold', () => {
    it('should release a legal hold', async () => {
      mockRepository.getLegalHolds.mockResolvedValue([{ id: 'lh-1', status: 'active' }]);
      mockRepository.releaseLegalHold.mockResolvedValue({ id: 'lh-1', status: 'released' });
      const service = createLegalHoldService(mockRepository);
      const result = await service.releaseLegalHold('lh-1', 'user-1');
      expect(result).toEqual({ id: 'lh-1', status: 'released' });
      expect(mockRepository.releaseLegalHold).toHaveBeenCalledWith('lh-1');
    });
  });

  describe('getLegalHoldDocuments', () => {
    it('should return documents on hold', async () => {
      const docs = [{ id: 'doc-1', holdId: 'lh-1' }];
      mockRepository.getDocumentsOnHold.mockResolvedValue(docs);
      const service = createLegalHoldService(mockRepository);
      const result = await service.getLegalHoldDocuments('lh-1', 'user-1');
      expect(result).toEqual(docs);
    });
  });

  describe('getLegalHoldStats', () => {
    it('should return stats', async () => {
      mockRepository.getLegalHolds.mockResolvedValue([{ id: 'lh-1', status: 'active' }]);
      mockRepository.getDocumentsOnHold.mockResolvedValue([{ id: 'doc-1' }]);
      const service = createLegalHoldService(mockRepository);
      const result = await service.getLegalHoldStats('school-1', 'user-1');
      expect(result).toBeDefined();
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing schoolId for createLegalHold', async () => {
      const service = createLegalHoldService(mockRepository);
      await expect(service.createLegalHold('', 'user-1', { name: 'Hold' })).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing name for createLegalHold', async () => {
      const service = createLegalHoldService(mockRepository);
      await expect(service.createLegalHold('school-1', 'user-1', {})).rejects.toThrow('legal hold name is required');
    });

    it('should throw on missing holdId for releaseLegalHold', async () => {
      const service = createLegalHoldService(mockRepository);
      await expect(service.releaseLegalHold('', 'user-1')).rejects.toThrow('holdId is required');
    });

    it('should throw on missing schoolId for getLegalHolds', async () => {
      const service = createLegalHoldService(mockRepository);
      await expect(service.getLegalHolds('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in getLegalHolds', async () => {
      mockRepository.getLegalHolds.mockRejectedValue(new Error('DB error'));
      const service = createLegalHoldService(mockRepository);
      await expect(service.getLegalHolds('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should handle repository errors in createLegalHold', async () => {
      mockRepository.createLegalHold.mockRejectedValue(new Error('Create failed'));
      const service = createLegalHoldService(mockRepository);
      await expect(service.createLegalHold('school-1', 'user-1', { name: 'Hold' })).rejects.toThrow('Create failed');
    });

    it('should handle repository errors in releaseLegalHold', async () => {
      mockRepository.getLegalHolds.mockResolvedValue([{ id: 'lh-1', status: 'active' }]);
      mockRepository.releaseLegalHold.mockRejectedValue(new Error('Release failed'));
      const service = createLegalHoldService(mockRepository);
      await expect(service.releaseLegalHold('lh-1', 'user-1')).rejects.toThrow('Release failed');
    });

    it('should handle repository errors in getLegalHoldDocuments', async () => {
      mockRepository.getDocumentsOnHold.mockRejectedValue(new Error('Query failed'));
      const service = createLegalHoldService(mockRepository);
      await expect(service.getLegalHoldDocuments('lh-1', 'user-1')).rejects.toThrow('Query failed');
    });

    it('should handle repository errors in getLegalHoldStats', async () => {
      mockRepository.getLegalHolds.mockRejectedValue(new Error('Stats query failed'));
      const service = createLegalHoldService(mockRepository);
      await expect(service.getLegalHoldStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
