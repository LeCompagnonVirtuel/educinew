import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createEncryptionService } from '../../src/features/documents/services/encryption.service';

describe('EncryptionService', () => {
  let mockRepository: {
    getEncryptionConfig: ReturnType<typeof vi.fn>;
    encryptDocument: ReturnType<typeof vi.fn>;
    decryptDocument: ReturnType<typeof vi.fn>;
    getEncryptionStats: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getEncryptionConfig: vi.fn(),
      encryptDocument: vi.fn(),
      decryptDocument: vi.fn(),
      getEncryptionStats: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createEncryptionService(mockRepository as any);
    expect(service).toBeDefined();
    expect(service.getEncryptionConfig).toBeInstanceOf(Function);
    expect(service.encryptDocument).toBeInstanceOf(Function);
    expect(service.decryptDocument).toBeInstanceOf(Function);
    expect(service.getEncryptionStats).toBeInstanceOf(Function);
  });

  describe('getEncryptionConfig', () => {
    it('should return encryption config', async () => {
      const config = { algorithm: 'AES-256', keyLength: 256, enabled: true };
      mockRepository.getEncryptionConfig.mockResolvedValue(config);
      const service = createEncryptionService(mockRepository as any);
      const result = await service.getEncryptionConfig('school-1', 'user-1');
      expect(result).toEqual(config);
      expect(mockRepository.getEncryptionConfig).toHaveBeenCalledWith('school-1');
    });

    it('should return config with all fields', async () => {
      const config = { algorithm: 'RSA-4096', keyLength: 4096, enabled: false, keyRotationDays: 90 };
      mockRepository.getEncryptionConfig.mockResolvedValue(config);
      const service = createEncryptionService(mockRepository as any);
      const result = await service.getEncryptionConfig('school-1', 'user-1');
      expect(result).toEqual(config);
    });

    it('should throw if schoolId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionConfig('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionConfig('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both schoolId and userId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionConfig('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getEncryptionConfig.mockRejectedValue(new Error('DB error'));
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionConfig('school-1', 'user-1')).rejects.toThrow('DB error');
    });

    it('should not swallow errors', async () => {
      mockRepository.getEncryptionConfig.mockRejectedValue(new Error('Connection timeout'));
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionConfig('school-1', 'user-1')).rejects.toThrow('Connection timeout');
    });
  });

  describe('encryptDocument', () => {
    it('should encrypt a document', async () => {
      const result = { id: 'doc-1', encrypted: true, keyId: 'key-1' };
      mockRepository.encryptDocument.mockResolvedValue(result);
      const service = createEncryptionService(mockRepository as any);
      const response = await service.encryptDocument('doc-1', 'user-1');
      expect(response).toEqual(result);
      expect(mockRepository.encryptDocument).toHaveBeenCalledWith('doc-1', undefined);
    });

    it('should encrypt with options', async () => {
      const options = { algorithm: 'AES-256-GCM' };
      mockRepository.encryptDocument.mockResolvedValue({ encrypted: true });
      const service = createEncryptionService(mockRepository as any);
      await service.encryptDocument('doc-1', 'user-1', options);
      expect(mockRepository.encryptDocument).toHaveBeenCalledWith('doc-1', options);
    });

    it('should encrypt with keyId option', async () => {
      const options = { keyId: 'key-123' };
      mockRepository.encryptDocument.mockResolvedValue({ encrypted: true, keyId: 'key-123' });
      const service = createEncryptionService(mockRepository as any);
      const result = await service.encryptDocument('doc-1', 'user-1', options);
      expect(result).toEqual({ encrypted: true, keyId: 'key-123' });
    });

    it('should throw if documentId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.encryptDocument('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.encryptDocument('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both documentId and userId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.encryptDocument('', '')).rejects.toThrow('documentId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.encryptDocument.mockRejectedValue(new Error('Encryption failed'));
      const service = createEncryptionService(mockRepository as any);
      await expect(service.encryptDocument('doc-1', 'user-1')).rejects.toThrow('Encryption failed');
    });

    it('should handle key not found errors', async () => {
      mockRepository.encryptDocument.mockRejectedValue(new Error('Encryption key not found'));
      const service = createEncryptionService(mockRepository as any);
      await expect(service.encryptDocument('doc-1', 'user-1')).rejects.toThrow('Encryption key not found');
    });
  });

  describe('decryptDocument', () => {
    it('should decrypt a document', async () => {
      const result = { id: 'doc-1', decrypted: true };
      mockRepository.decryptDocument.mockResolvedValue(result);
      const service = createEncryptionService(mockRepository as any);
      const response = await service.decryptDocument('doc-1', 'user-1');
      expect(response).toEqual(result);
      expect(mockRepository.decryptDocument).toHaveBeenCalledWith('doc-1', undefined);
    });

    it('should decrypt with options', async () => {
      const options = { keyId: 'key-1' };
      mockRepository.decryptDocument.mockResolvedValue({ decrypted: true });
      const service = createEncryptionService(mockRepository as any);
      await service.decryptDocument('doc-1', 'user-1', options);
      expect(mockRepository.decryptDocument).toHaveBeenCalledWith('doc-1', options);
    });

    it('should decrypt with passphrase option', async () => {
      const options = { passphrase: 'secret-passphrase' };
      mockRepository.decryptDocument.mockResolvedValue({ decrypted: true });
      const service = createEncryptionService(mockRepository as any);
      const result = await service.decryptDocument('doc-1', 'user-1', options);
      expect(result).toEqual({ decrypted: true });
    });

    it('should throw if documentId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.decryptDocument('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.decryptDocument('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both documentId and userId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.decryptDocument('', '')).rejects.toThrow('documentId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.decryptDocument.mockRejectedValue(new Error('Decryption failed'));
      const service = createEncryptionService(mockRepository as any);
      await expect(service.decryptDocument('doc-1', 'user-1')).rejects.toThrow('Decryption failed');
    });

    it('should handle wrong key errors', async () => {
      mockRepository.decryptDocument.mockRejectedValue(new Error('Invalid decryption key'));
      const service = createEncryptionService(mockRepository as any);
      await expect(service.decryptDocument('doc-1', 'user-1')).rejects.toThrow('Invalid decryption key');
    });
  });

  describe('getEncryptionStats', () => {
    it('should return encryption stats', async () => {
      const stats = { totalEncrypted: 42, totalDecrypted: 10, keyRotations: 3 };
      mockRepository.getEncryptionStats.mockResolvedValue(stats);
      const service = createEncryptionService(mockRepository as any);
      const result = await service.getEncryptionStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getEncryptionStats).toHaveBeenCalledWith('school-1');
    });

    it('should return empty stats', async () => {
      mockRepository.getEncryptionStats.mockResolvedValue({ totalEncrypted: 0, totalDecrypted: 0, keyRotations: 0 });
      const service = createEncryptionService(mockRepository as any);
      const result = await service.getEncryptionStats('school-1', 'user-1');
      expect(result).toEqual({ totalEncrypted: 0, totalDecrypted: 0, keyRotations: 0 });
    });

    it('should accept optional date parameters', async () => {
      mockRepository.getEncryptionStats.mockResolvedValue({ totalEncrypted: 5 });
      const service = createEncryptionService(mockRepository as any);
      await service.getEncryptionStats('school-1', 'user-1', '2024-01-01', '2024-12-31');
      expect(mockRepository.getEncryptionStats).toHaveBeenCalledWith('school-1');
    });

    it('should accept only dateFrom parameter', async () => {
      mockRepository.getEncryptionStats.mockResolvedValue({ totalEncrypted: 2 });
      const service = createEncryptionService(mockRepository as any);
      await service.getEncryptionStats('school-1', 'user-1', '2024-01-01');
      expect(mockRepository.getEncryptionStats).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionStats('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw if both schoolId and userId missing', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionStats('', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getEncryptionStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });

    it('should handle database connection errors', async () => {
      mockRepository.getEncryptionStats.mockRejectedValue(new Error('ECONNREFUSED'));
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionStats('school-1', 'user-1')).rejects.toThrow('ECONNREFUSED');
    });
  });

  describe('method existence', () => {
    it('should have all 4 methods defined', () => {
      const service = createEncryptionService(mockRepository as any);
      const methods = ['getEncryptionConfig', 'encryptDocument', 'decryptDocument', 'getEncryptionStats'];
      methods.forEach((method) => {
        expect(service[method as keyof typeof service]).toBeDefined();
      });
    });

    it('should return object with correct shape', () => {
      const service = createEncryptionService(mockRepository as any);
      expect(Object.keys(service)).toHaveLength(4);
    });

    it('should pass correct arguments to encryptDocument', async () => {
      mockRepository.encryptDocument.mockResolvedValue({ encrypted: true });
      const service = createEncryptionService(mockRepository as any);
      await service.encryptDocument('doc-1', 'user-1');
      expect(mockRepository.encryptDocument).toHaveBeenCalledWith('doc-1', undefined);
    });

    it('should pass correct arguments to decryptDocument', async () => {
      mockRepository.decryptDocument.mockResolvedValue({ decrypted: true });
      const service = createEncryptionService(mockRepository as any);
      await service.decryptDocument('doc-1', 'user-1');
      expect(mockRepository.decryptDocument).toHaveBeenCalledWith('doc-1', undefined);
    });

    it('should pass correct arguments to getEncryptionConfig', async () => {
      mockRepository.getEncryptionConfig.mockResolvedValue({ enabled: true });
      const service = createEncryptionService(mockRepository as any);
      await service.getEncryptionConfig('school-1', 'user-1');
      expect(mockRepository.getEncryptionConfig).toHaveBeenCalledWith('school-1');
    });

    it('should pass correct arguments to getEncryptionStats', async () => {
      mockRepository.getEncryptionStats.mockResolvedValue({ totalEncrypted: 0 });
      const service = createEncryptionService(mockRepository as any);
      await service.getEncryptionStats('school-1', 'user-1');
      expect(mockRepository.getEncryptionStats).toHaveBeenCalledWith('school-1');
    });

    it('should validate schoolId before repository call in getEncryptionConfig', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionConfig('', 'user-1')).rejects.toThrow();
      expect(mockRepository.getEncryptionConfig).not.toHaveBeenCalled();
    });

    it('should validate documentId before repository call in encryptDocument', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.encryptDocument('', 'user-1')).rejects.toThrow();
      expect(mockRepository.encryptDocument).not.toHaveBeenCalled();
    });

    it('should validate documentId before repository call in decryptDocument', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.decryptDocument('', 'user-1')).rejects.toThrow();
      expect(mockRepository.decryptDocument).not.toHaveBeenCalled();
    });

    it('should validate schoolId before repository call in getEncryptionStats', async () => {
      const service = createEncryptionService(mockRepository as any);
      await expect(service.getEncryptionStats('', 'user-1')).rejects.toThrow();
      expect(mockRepository.getEncryptionStats).not.toHaveBeenCalled();
    });
  });
});
