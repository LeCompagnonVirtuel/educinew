import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createCheckoutService } from '../../src/features/documents/services/checkout.service';

describe('CheckoutService', () => {
  const mockRepository = {
    checkoutDocument: vi.fn(),
    checkinDocument: vi.fn(),
    getCheckedOutDocuments: vi.fn(),
  };

  const schoolId = 'school-1';
  const userId = 'user-1';
  const documentId = 'doc-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create service with all methods', () => {
    const service = createCheckoutService(mockRepository as any);
    expect(service.checkoutDocument).toBeDefined();
    expect(service.checkinDocument).toBeDefined();
    expect(service.getCheckedOutDocuments).toBeDefined();
    expect(service.forceCheckin).toBeDefined();
  });

  describe('checkoutDocument', () => {
    it('should checkout document', async () => {
      const checkout = { id: 'checkout-1', documentId, userId, checkedOutAt: new Date().toISOString() };
      mockRepository.checkoutDocument.mockResolvedValue(checkout);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.checkoutDocument(documentId, schoolId, userId);
      expect(result.id).toBe('checkout-1');
    });

    it('should throw on missing documentId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkoutDocument('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkoutDocument(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkoutDocument(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.checkoutDocument.mockRejectedValue(new Error('Document already checked out'));
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkoutDocument(documentId, schoolId, userId)).rejects.toThrow('Document already checked out');
    });

    it('should call repository with documentId and userId', async () => {
      mockRepository.checkoutDocument.mockResolvedValue({ id: 'c1' });
      const service = createCheckoutService(mockRepository as any);
      await service.checkoutDocument(documentId, schoolId, userId);
      expect(mockRepository.checkoutDocument).toHaveBeenCalledWith(documentId, userId);
    });

    it('should return checkout with timestamp', async () => {
      const checkout = { id: 'checkout-1', checkedOutAt: '2026-01-01T10:00:00Z' };
      mockRepository.checkoutDocument.mockResolvedValue(checkout);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.checkoutDocument(documentId, schoolId, userId);
      expect(result.checkedOutAt).toBeDefined();
    });

    it('should handle document locked by another user', async () => {
      mockRepository.checkoutDocument.mockRejectedValue(new Error('Document is locked by another user'));
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkoutDocument(documentId, schoolId, userId)).rejects.toThrow('Document is locked by another user');
    });

    it('should handle version conflict', async () => {
      mockRepository.checkoutDocument.mockRejectedValue(new Error('Version conflict detected'));
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkoutDocument(documentId, schoolId, userId)).rejects.toThrow('Version conflict detected');
    });

    it('should return checkout with user info', async () => {
      const checkout = { id: 'checkout-1', userId, userName: 'John Doe' };
      mockRepository.checkoutDocument.mockResolvedValue(checkout);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.checkoutDocument(documentId, schoolId, userId);
      expect(result.userName).toBe('John Doe');
    });
  });

  describe('checkinDocument', () => {
    it('should checkin document', async () => {
      const document = { id: documentId, status: 'available' };
      mockRepository.checkinDocument.mockResolvedValue(document);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.checkinDocument(documentId, schoolId, userId);
      expect(result.id).toBe(documentId);
    });

    it('should throw on missing documentId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkinDocument('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkinDocument(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkinDocument(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.checkinDocument.mockRejectedValue(new Error('Document not checked out'));
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkinDocument(documentId, schoolId, userId)).rejects.toThrow('Document not checked out');
    });

    it('should call repository with documentId and userId', async () => {
      mockRepository.checkinDocument.mockResolvedValue({ id: documentId });
      const service = createCheckoutService(mockRepository as any);
      await service.checkinDocument(documentId, schoolId, userId);
      expect(mockRepository.checkinDocument).toHaveBeenCalledWith(documentId, userId);
    });

    it('should return document with available status', async () => {
      const document = { id: documentId, status: 'available', checkedInAt: new Date().toISOString() };
      mockRepository.checkinDocument.mockResolvedValue(document);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.checkinDocument(documentId, schoolId, userId);
      expect(result.status).toBe('available');
    });

    it('should handle checkin with version update', async () => {
      const document = { id: documentId, version: 2 };
      mockRepository.checkinDocument.mockResolvedValue(document);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.checkinDocument(documentId, schoolId, userId, { version: 2 });
      expect(result.version).toBe(2);
    });

    it('should handle checkin without permission', async () => {
      mockRepository.checkinDocument.mockRejectedValue(new Error('Permission denied'));
      const service = createCheckoutService(mockRepository as any);
      await expect(service.checkinDocument(documentId, schoolId, userId)).rejects.toThrow('Permission denied');
    });
  });

  describe('getCheckedOutDocuments', () => {
    it('should return checked out documents', async () => {
      const docs = [{ id: 'd1' }, { id: 'd2' }];
      mockRepository.getCheckedOutDocuments.mockResolvedValue(docs);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.getCheckedOutDocuments(schoolId, userId);
      expect(result).toHaveLength(2);
    });

    it('should throw on missing schoolId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.getCheckedOutDocuments('', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.getCheckedOutDocuments(schoolId, '')).rejects.toThrow();
    });

    it('should return empty array when no documents checked out', async () => {
      mockRepository.getCheckedOutDocuments.mockResolvedValue([]);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.getCheckedOutDocuments(schoolId, userId);
      expect(result).toHaveLength(0);
    });

    it('should handle repository errors', async () => {
      mockRepository.getCheckedOutDocuments.mockRejectedValue(new Error('Fetch failed'));
      const service = createCheckoutService(mockRepository as any);
      await expect(service.getCheckedOutDocuments(schoolId, userId)).rejects.toThrow('Fetch failed');
    });

    it('should call repository with schoolId', async () => {
      mockRepository.getCheckedOutDocuments.mockResolvedValue([]);
      const service = createCheckoutService(mockRepository as any);
      await service.getCheckedOutDocuments(schoolId, userId);
      expect(mockRepository.getCheckedOutDocuments).toHaveBeenCalledWith(schoolId);
    });

    it('should return documents with checkout info', async () => {
      const docs = [{ id: 'd1', checkedOutBy: userId, checkedOutAt: '2026-01-01' }];
      mockRepository.getCheckedOutDocuments.mockResolvedValue(docs);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.getCheckedOutDocuments(schoolId, userId);
      expect(result[0].checkedOutBy).toBe(userId);
    });

    it('should handle many checked out documents', async () => {
      const docs = Array.from({ length: 30 }, (_, i) => ({ id: `d${i}` }));
      mockRepository.getCheckedOutDocuments.mockResolvedValue(docs);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.getCheckedOutDocuments(schoolId, userId);
      expect(result).toHaveLength(30);
    });

    it('should handle documents from multiple users', async () => {
      const docs = [{ id: 'd1', checkedOutBy: 'u1' }, { id: 'd2', checkedOutBy: 'u2' }];
      mockRepository.getCheckedOutDocuments.mockResolvedValue(docs);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.getCheckedOutDocuments(schoolId, userId);
      expect(result).toHaveLength(2);
    });
  });

  describe('forceCheckin', () => {
    it('should force checkin document', async () => {
      const document = { id: documentId, status: 'available' };
      mockRepository.checkinDocument.mockResolvedValue(document);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.forceCheckin(documentId, schoolId, userId);
      expect(result.id).toBe(documentId);
    });

    it('should throw on missing documentId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.forceCheckin('', schoolId, userId)).rejects.toThrow();
    });

    it('should throw on missing schoolId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.forceCheckin(documentId, '', userId)).rejects.toThrow();
    });

    it('should throw on missing userId', async () => {
      const service = createCheckoutService(mockRepository as any);
      await expect(service.forceCheckin(documentId, schoolId, '')).rejects.toThrow();
    });

    it('should handle repository errors', async () => {
      mockRepository.checkinDocument.mockRejectedValue(new Error('Force checkin failed'));
      const service = createCheckoutService(mockRepository as any);
      await expect(service.forceCheckin(documentId, schoolId, userId)).rejects.toThrow('Force checkin failed');
    });

    it('should call repository with documentId and userId', async () => {
      mockRepository.checkinDocument.mockResolvedValue({ id: documentId });
      const service = createCheckoutService(mockRepository as any);
      await service.forceCheckin(documentId, schoolId, userId);
      expect(mockRepository.checkinDocument).toHaveBeenCalledWith(documentId, userId);
    });

    it('should return document with force checkin flag', async () => {
      const document = { id: documentId, forceCheckin: true, checkedInAt: new Date().toISOString() };
      mockRepository.checkinDocument.mockResolvedValue(document);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.forceCheckin(documentId, schoolId, userId);
      expect(result.forceCheckin).toBe(true);
    });

    it('should handle force checkin on unlocked document', async () => {
      const document = { id: documentId, status: 'available' };
      mockRepository.checkinDocument.mockResolvedValue(document);
      const service = createCheckoutService(mockRepository as any);
      const result = await service.forceCheckin(documentId, schoolId, userId);
      expect(result.status).toBe('available');
    });

    it('should handle admin permission required', async () => {
      mockRepository.checkinDocument.mockRejectedValue(new Error('Admin permission required'));
      const service = createCheckoutService(mockRepository as any);
      await expect(service.forceCheckin(documentId, schoolId, userId)).rejects.toThrow('Admin permission required');
    });
  });
});
