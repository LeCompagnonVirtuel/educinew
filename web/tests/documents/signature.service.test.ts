import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSignatureService } from '../../src/features/documents/services/signature.service';

describe('SignatureService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      createSignatureRequest: vi.fn(),
      getSignature: vi.fn(),
      approveSignature: vi.fn(),
      rejectSignature: vi.fn(),
      revokeSignature: vi.fn(),
      getSignatureStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createSignatureService(mockRepository);
    expect(service).toBeDefined();
    expect(service.createSignatureRequest).toBeInstanceOf(Function);
    expect(service.approveSignature).toBeInstanceOf(Function);
    expect(service.rejectSignature).toBeInstanceOf(Function);
    expect(service.revokeSignature).toBeInstanceOf(Function);
    expect(service.getSignatureStats).toBeInstanceOf(Function);
  });

  describe('createSignatureRequest', () => {
    it('should create a signature request', async () => {
      mockRepository.createSignatureRequest.mockResolvedValue({ id: 'sig-1', status: 'pending' });
      const service = createSignatureService(mockRepository);
      const result = await service.createSignatureRequest('school-1', 'user-1', { documentId: 'doc-1', signerEmail: 'signer@example.com' });
      expect(result).toEqual({ id: 'sig-1', status: 'pending' });
      expect(mockRepository.createSignatureRequest).toHaveBeenCalledWith(
        expect.objectContaining({ documentId: 'doc-1', signerEmail: 'signer@example.com', createdBy: 'user-1' }),
        'school-1'
      );
    });
  });

  describe('approveSignature', () => {
    it('should approve a signature', async () => {
      mockRepository.getSignature.mockResolvedValue({ id: 'sig-1' });
      mockRepository.approveSignature.mockResolvedValue({ id: 'sig-1', status: 'signed' });
      const service = createSignatureService(mockRepository);
      const result = await service.approveSignature('sig-1', 'user-1');
      expect(result).toEqual({ id: 'sig-1', status: 'signed' });
      expect(mockRepository.approveSignature).toHaveBeenCalledWith('sig-1', 'user-1');
    });
  });

  describe('rejectSignature', () => {
    it('should reject a signature', async () => {
      mockRepository.getSignature.mockResolvedValue({ id: 'sig-1' });
      mockRepository.rejectSignature.mockResolvedValue({ id: 'sig-1', status: 'rejected' });
      const service = createSignatureService(mockRepository);
      const result = await service.rejectSignature('sig-1', 'user-1', 'Incorrect information');
      expect(result).toEqual({ id: 'sig-1', status: 'rejected' });
      expect(mockRepository.rejectSignature).toHaveBeenCalledWith('sig-1', 'user-1', 'Incorrect information');
    });
  });

  describe('revokeSignature', () => {
    it('should revoke a signature', async () => {
      mockRepository.getSignature.mockResolvedValue({ id: 'sig-1' });
      mockRepository.revokeSignature.mockResolvedValue({ id: 'sig-1', status: 'revoked' });
      const service = createSignatureService(mockRepository);
      const result = await service.revokeSignature('sig-1', 'user-1');
      expect(result).toEqual({ id: 'sig-1', status: 'revoked' });
      expect(mockRepository.revokeSignature).toHaveBeenCalledWith('sig-1', 'user-1');
    });
  });

  describe('getSignatureStats', () => {
    it('should return signature statistics', async () => {
      const stats = { total: 100, pending: 10, signed: 85, rejected: 5 };
      mockRepository.getSignatureStats.mockResolvedValue(stats);
      const service = createSignatureService(mockRepository);
      const result = await service.getSignatureStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getSignatureStats).toHaveBeenCalledWith('school-1', undefined, undefined);
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing signatureId for approveSignature', async () => {
      const service = createSignatureService(mockRepository);
      await expect(service.approveSignature('', 'user-1')).rejects.toThrow('signatureId is required');
    });

    it('should throw on missing userId for approveSignature', async () => {
      const service = createSignatureService(mockRepository);
      await expect(service.approveSignature('sig-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw on missing schoolId for createSignatureRequest', async () => {
      const service = createSignatureService(mockRepository);
      await expect(service.createSignatureRequest('', 'user-1', { documentId: 'doc-1' })).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing documentId for createSignatureRequest', async () => {
      const service = createSignatureService(mockRepository);
      await expect(service.createSignatureRequest('school-1', 'user-1', {})).rejects.toThrow('documentId is required');
    });

    it('should throw on missing schoolId for getSignatureStats', async () => {
      const service = createSignatureService(mockRepository);
      await expect(service.getSignatureStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in createSignatureRequest', async () => {
      mockRepository.createSignatureRequest.mockRejectedValue(new Error('Create failed'));
      const service = createSignatureService(mockRepository);
      await expect(service.createSignatureRequest('school-1', 'user-1', { documentId: 'doc-1' })).rejects.toThrow('Create failed');
    });

    it('should handle repository errors in approveSignature', async () => {
      mockRepository.getSignature.mockResolvedValue({ id: 'sig-1' });
      mockRepository.approveSignature.mockRejectedValue(new Error('Approve failed'));
      const service = createSignatureService(mockRepository);
      await expect(service.approveSignature('sig-1', 'user-1')).rejects.toThrow('Approve failed');
    });

    it('should handle repository errors in rejectSignature', async () => {
      mockRepository.getSignature.mockResolvedValue({ id: 'sig-1' });
      mockRepository.rejectSignature.mockRejectedValue(new Error('Reject failed'));
      const service = createSignatureService(mockRepository);
      await expect(service.rejectSignature('sig-1', 'user-1', 'bad')).rejects.toThrow('Reject failed');
    });

    it('should handle repository errors in revokeSignature', async () => {
      mockRepository.getSignature.mockResolvedValue({ id: 'sig-1' });
      mockRepository.revokeSignature.mockRejectedValue(new Error('Revoke failed'));
      const service = createSignatureService(mockRepository);
      await expect(service.revokeSignature('sig-1', 'user-1')).rejects.toThrow('Revoke failed');
    });

    it('should handle repository errors in getSignatureStats', async () => {
      mockRepository.getSignatureStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createSignatureService(mockRepository);
      await expect(service.getSignatureStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
