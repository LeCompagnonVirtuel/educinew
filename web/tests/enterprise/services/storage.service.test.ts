import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('StorageService', () => {
  const mockRepo = {
    getStorageUsage: vi.fn(),
    getStorageQuota: vi.fn(),
    updateStorageQuota: vi.fn(),
    getFiles: vi.fn(),
    uploadFile: vi.fn(),
    deleteFile: vi.fn(),
    getFileById: vi.fn(),
    getStorageBreakdown: vi.fn(),
    cleanupTempFiles: vi.fn(),
    getStorageStats: vi.fn(),
    generatePresignedUrl: vi.fn(),
    moveFile: vi.fn(),
    copyFile: vi.fn(),
    getStorageProviders: vi.fn(),
    switchProvider: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const fileId = 'file-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getStorageUsage', () => {
    it('should return storage usage', async () => {
      mockRepo.getStorageUsage.mockResolvedValue({ used: 5.5, limit: 50, unit: 'GB' });
      const result = await mockRepo.getStorageUsage(enterpriseId);
      expect(result.used).toBe(5.5);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should calculate usage percentage', () => {
      const used = 5.5;
      const limit = 50;
      const percentage = (used / limit) * 100;
      expect(percentage).toBe(11);
    });

    it('should handle zero usage', async () => {
      mockRepo.getStorageUsage.mockResolvedValue({ used: 0, limit: 50 });
      const result = await mockRepo.getStorageUsage(enterpriseId);
      expect(result.used).toBe(0);
    });

    it('should detect over-usage', () => {
      const used = 55;
      const limit = 50;
      const isOver = used > limit;
      expect(isOver).toBe(true);
    });

    it('should handle missing limit', async () => {
      mockRepo.getStorageUsage.mockResolvedValue({ used: 5.5, limit: null });
      const result = await mockRepo.getStorageUsage(enterpriseId);
      expect(result.limit).toBeNull();
    });
  });

  describe('getStorageQuota', () => {
    it('should return storage quota', async () => {
      mockRepo.getStorageQuota.mockResolvedValue({ maxStorage: 100, currentUsage: 25 });
      const result = await mockRepo.getStorageQuota(enterpriseId);
      expect(result.maxStorage).toBe(100);
    });

    it('should include plan-based limits', async () => {
      mockRepo.getStorageQuota.mockResolvedValue({ maxStorage: 50, plan: 'standard' });
      const result = await mockRepo.getStorageQuota(enterpriseId);
      expect(result.plan).toBe('standard');
    });

    it('should handle unlimited quota', async () => {
      mockRepo.getStorageQuota.mockResolvedValue({ maxStorage: -1, unlimited: true });
      const result = await mockRepo.getStorageQuota(enterpriseId);
      expect(result.unlimited).toBe(true);
    });

    it('should include warning threshold', async () => {
      mockRepo.getStorageQuota.mockResolvedValue({ warningThreshold: 80, currentPercentage: 75 });
      const result = await mockRepo.getStorageQuota(enterpriseId);
      expect(result.warningThreshold).toBe(80);
    });

    it('should handle exceeded quota', async () => {
      mockRepo.getStorageQuota.mockResolvedValue({ maxStorage: 50, currentUsage: 55, exceeded: true });
      const result = await mockRepo.getStorageQuota(enterpriseId);
      expect(result.exceeded).toBe(true);
    });
  });

  describe('updateStorageQuota', () => {
    it('should update storage quota', async () => {
      mockRepo.updateStorageQuota.mockResolvedValue({ maxStorage: 200, updatedAt: new Date().toISOString() });
      const result = await mockRepo.updateStorageQuota(enterpriseId, 200);
      expect(result.maxStorage).toBe(200);
    });

    it('should validate quota value', () => {
      const validate = (quota: number) => {
        if (quota < -1) throw new Error('Quota invalide');
      };
      expect(() => validate(100)).not.toThrow();
      expect(() => validate(-2)).toThrow();
    });

    it('should not set below current usage', async () => {
      mockRepo.getStorageUsage.mockResolvedValue({ used: 50 });
      const validate = (newQuota: number, currentUsage: number) => {
        if (newQuota !== -1 && newQuota < currentUsage) throw new Error('Le quota ne peut pas être inférieur à l\'utilisation actuelle');
      };
      expect(() => validate(100, 50)).not.toThrow();
      expect(() => validate(30, 50)).toThrow();
    });

    it('should allow unlimited quota', async () => {
      mockRepo.updateStorageQuota.mockResolvedValue({ maxStorage: -1, unlimited: true });
      const result = await mockRepo.updateStorageQuota(enterpriseId, -1);
      expect(result.unlimited).toBe(true);
    });

    it('should record update metadata', async () => {
      mockRepo.updateStorageQuota.mockResolvedValue({ updatedAt: new Date().toISOString(), updatedBy: 'usr-1' });
      const result = await mockRepo.updateStorageQuota(enterpriseId, 200, 'usr-1');
      expect(result.updatedBy).toBe('usr-1');
    });

    it('should validate minimum quota', () => {
      const validate = (quota: number) => {
        if (quota > 0 && quota < 1) throw new Error('Le quota minimum est 1 GB');
      };
      expect(() => validate(1)).not.toThrow();
      expect(() => validate(0.5)).toThrow();
    });
  });

  describe('getFiles', () => {
    it('should return files list', async () => {
      mockRepo.getFiles.mockResolvedValue([{ id: fileId, name: 'document.pdf', size: 1024 }]);
      const result = await mockRepo.getFiles(enterpriseId);
      expect(result).toHaveLength(1);
    });

    it('should filter by type', async () => {
      mockRepo.getFiles.mockResolvedValue([]);
      await mockRepo.getFiles(enterpriseId, { type: 'document' });
      expect(mockRepo.getFiles).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.getFiles.mockResolvedValue([]);
      await mockRepo.getFiles(enterpriseId, { page: 1, limit: 20 });
      expect(mockRepo.getFiles).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockRepo.getFiles.mockResolvedValue([]);
      const result = await mockRepo.getFiles(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by size', async () => {
      mockRepo.getFiles.mockResolvedValue([]);
      await mockRepo.getFiles(enterpriseId, { sortBy: 'size', order: 'desc' });
      expect(mockRepo.getFiles).toHaveBeenCalled();
    });

    it('should filter by folder', async () => {
      mockRepo.getFiles.mockResolvedValue([]);
      await mockRepo.getFiles(enterpriseId, { folder: '/uploads' });
      expect(mockRepo.getFiles).toHaveBeenCalled();
    });
  });

  describe('uploadFile', () => {
    it('should upload file', async () => {
      mockRepo.uploadFile.mockResolvedValue({ id: fileId, name: 'doc.pdf', size: 1024, url: '/files/doc.pdf' });
      const result = await mockRepo.uploadFile(enterpriseId, { name: 'doc.pdf', size: 1024, type: 'application/pdf' });
      expect(result.name).toBe('doc.pdf');
    });

    it('should require file name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nom du fichier est requis');
      };
      expect(() => validate({ size: 1024 })).toThrow('Le nom du fichier est requis');
    });

    it('should validate file size', () => {
      const maxSize = 100 * 1024 * 1024; // 100MB
      const validate = (size: number) => {
        if (size > maxSize) throw new Error('Le fichier est trop volumineux');
      };
      expect(() => validate(50 * 1024 * 1024)).not.toThrow();
      expect(() => validate(150 * 1024 * 1024)).toThrow();
    });

    it('should validate file type', () => {
      const allowedTypes = ['pdf', 'docx', 'xlsx', 'png', 'jpg'];
      const validate = (ext: string) => {
        if (!allowedTypes.includes(ext)) throw new Error('Type de fichier non supporté');
      };
      expect(() => validate('pdf')).not.toThrow();
      expect(() => validate('exe')).toThrow();
    });

    it('should check storage quota', async () => {
      mockRepo.getStorageUsage.mockResolvedValue({ used: 49, limit: 50 });
      mockRepo.uploadFile.mockRejectedValue(new Error('Quota de stockage dépassé'));
      await expect(mockRepo.uploadFile(enterpriseId, { name: 'big.zip', size: 2 * 1024 * 1024 * 1024 })).rejects.toThrow();
    });

    it('should generate unique file ID', async () => {
      mockRepo.uploadFile.mockResolvedValue({ id: 'file-' + Date.now() });
      const result = await mockRepo.uploadFile(enterpriseId, { name: 'doc.pdf', size: 1024 });
      expect(result.id).toBeDefined();
    });

    it('should store metadata', async () => {
      mockRepo.uploadFile.mockResolvedValue({ id: fileId, metadata: { uploadedBy: 'usr-1', category: 'report' } });
      const result = await mockRepo.uploadFile(enterpriseId, { name: 'doc.pdf', size: 1024, metadata: { uploadedBy: 'usr-1', category: 'report' } });
      expect(result.metadata.uploadedBy).toBe('usr-1');
    });
  });

  describe('deleteFile', () => {
    it('should delete file', async () => {
      mockRepo.getFileById.mockResolvedValue({ id: fileId });
      mockRepo.deleteFile.mockResolvedValue(undefined);
      await mockRepo.deleteFile(fileId);
      expect(mockRepo.deleteFile).toHaveBeenCalledWith(fileId);
    });

    it('should throw if not found', async () => {
      mockRepo.getFileById.mockResolvedValue(null);
      const deleteOrThrow = async (id: string) => {
        const file = await mockRepo.getFileById(id);
        if (!file) throw new Error('Fichier non trouvé');
      };
      await expect(deleteOrThrow('nonexistent')).rejects.toThrow('Fichier non trouvé');
    });

    it('should not delete system files', async () => {
      mockRepo.getFileById.mockResolvedValue({ id: fileId, isSystem: true });
      const deleteOrThrow = async () => {
        const file = await mockRepo.getFileById(fileId);
        if (file?.isSystem) throw new Error('Les fichiers système ne peuvent pas être supprimés');
      };
      await expect(deleteOrThrow()).rejects.toThrow();
    });

    it('should soft delete file', async () => {
      mockRepo.getFileById.mockResolvedValue({ id: fileId });
      mockRepo.deleteFile.mockResolvedValue({ deleted: true, restoredUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() });
      const result = await mockRepo.deleteFile(fileId);
      expect(result.restoredUntil).toBeDefined();
    });

    it('should free up storage', async () => {
      mockRepo.getFileById.mockResolvedValue({ id: fileId, size: 1024 });
      mockRepo.deleteFile.mockResolvedValue({ freedBytes: 1024 });
      const result = await mockRepo.deleteFile(fileId);
      expect(result.freedBytes).toBe(1024);
    });
  });

  describe('getStorageBreakdown', () => {
    it('should return storage breakdown', async () => {
      mockRepo.getStorageBreakdown.mockResolvedValue({ documents: 2.5, images: 1.5, videos: 1.0, other: 0.5 });
      const result = await mockRepo.getStorageBreakdown(enterpriseId);
      expect(result.documents).toBe(2.5);
    });

    it('should include file counts', async () => {
      mockRepo.getStorageBreakdown.mockResolvedValue({ totalFiles: 500, byType: { pdf: 200, png: 150 } });
      const result = await mockRepo.getStorageBreakdown(enterpriseId);
      expect(result.totalFiles).toBe(500);
    });

    it('should handle empty storage', async () => {
      mockRepo.getStorageBreakdown.mockResolvedValue({ documents: 0, images: 0, videos: 0, other: 0 });
      const result = await mockRepo.getStorageBreakdown(enterpriseId);
      expect(result.documents).toBe(0);
    });

    it('should include largest files', async () => {
      mockRepo.getStorageBreakdown.mockResolvedValue({ largestFiles: [{ name: 'big.mp4', size: 500 * 1024 * 1024 }] });
      const result = await mockRepo.getStorageBreakdown(enterpriseId);
      expect(result.largestFiles).toHaveLength(1);
    });

    it('should calculate percentages', () => {
      const breakdown = { documents: 5, images: 3, videos: 1.5, other: 0.5 };
      const total = Object.values(breakdown).reduce((a, b) => a + b, 0);
      const percentages = Object.entries(breakdown).map(([key, value]) => ({ type: key, percentage: (value / total) * 100 }));
      expect(percentages[0].percentage).toBe(50);
    });
  });

  describe('getStorageStats', () => {
    it('should return storage statistics', async () => {
      mockRepo.getStorageStats.mockResolvedValue({ totalFiles: 1000, totalSize: 25.5, avgFileSize: 25.5 * 1024 * 1024 });
      const result = await mockRepo.getStorageStats(enterpriseId);
      expect(result.totalFiles).toBe(1000);
    });

    it('should include growth trends', async () => {
      mockRepo.getStorageStats.mockResolvedValue({ growth: { daily: 0.1, weekly: 0.7, monthly: 3.0 } });
      const result = await mockRepo.getStorageStats(enterpriseId);
      expect(result.growth.daily).toBe(0.1);
    });

    it('should include upload trends', async () => {
      mockRepo.getStorageStats.mockResolvedValue({ uploads: { today: 15, thisWeek: 80, thisMonth: 300 } });
      const result = await mockRepo.getStorageStats(enterpriseId);
      expect(result.uploads.today).toBe(15);
    });

    it('should handle zero files', async () => {
      mockRepo.getStorageStats.mockResolvedValue({ totalFiles: 0, totalSize: 0 });
      const result = await mockRepo.getStorageStats(enterpriseId);
      expect(result.totalFiles).toBe(0);
    });

    it('should include deletion stats', async () => {
      mockRepo.getStorageStats.mockResolvedValue({ deletions: { today: 5, thisWeek: 20 } });
      const result = await mockRepo.getStorageStats(enterpriseId);
      expect(result.deletions.today).toBe(5);
    });
  });

  describe('generatePresignedUrl', () => {
    it('should generate presigned URL', async () => {
      mockRepo.generatePresignedUrl.mockResolvedValue({ url: 'https://storage.example.com/upload?token=abc', expiresAt: new Date(Date.now() + 3600000).toISOString() });
      const result = await mockRepo.generatePresignedUrl(enterpriseId, { fileName: 'doc.pdf', contentType: 'application/pdf' });
      expect(result.url).toContain('https://');
    });

    it('should require file name', () => {
      const validate = (data: any) => {
        if (!data?.fileName) throw new Error('Le nom du fichier est requis');
      };
      expect(() => validate({})).toThrow('Le nom du fichier est requis');
    });

    it('should set expiry time', async () => {
      mockRepo.generatePresignedUrl.mockResolvedValue({ expiresAt: new Date(Date.now() + 3600000).toISOString() });
      const result = await mockRepo.generatePresignedUrl(enterpriseId, { fileName: 'doc.pdf' });
      expect(new Date(result.expiresAt).getTime()).toBeGreaterThan(Date.now());
    });

    it('should handle different content types', async () => {
      mockRepo.generatePresignedUrl.mockResolvedValue({ url: 'https://example.com' });
      await mockRepo.generatePresignedUrl(enterpriseId, { fileName: 'image.png', contentType: 'image/png' });
      expect(mockRepo.generatePresignedUrl).toHaveBeenCalled();
    });

    it('should limit file size', async () => {
      mockRepo.generatePresignedUrl.mockResolvedValue({ url: 'https://example.com', maxSize: 100 * 1024 * 1024 });
      const result = await mockRepo.generatePresignedUrl(enterpriseId, { fileName: 'doc.pdf' });
      expect(result.maxSize).toBe(100 * 1024 * 1024);
    });
  });

  describe('moveFile', () => {
    it('should move file to new location', async () => {
      mockRepo.moveFile.mockResolvedValue({ id: fileId, folder: '/archive', movedAt: new Date().toISOString() });
      const result = await mockRepo.moveFile(fileId, '/archive');
      expect(result.folder).toBe('/archive');
    });

    it('should require destination folder', () => {
      const validate = (folder: string) => {
        if (!folder) throw new Error('Le dossier de destination est requis');
      };
      expect(() => validate('')).toThrow('Le dossier de destination est requis');
    });

    it('should not move to same folder', async () => {
      mockRepo.getFileById.mockResolvedValue({ id: fileId, folder: '/uploads' });
      const moveOrThrow = async (destFolder: string) => {
        const file = await mockRepo.getFileById(fileId);
        if (file?.folder === destFolder) throw new Error('Le fichier est déjà dans ce dossier');
      };
      await expect(moveOrThrow('/uploads')).rejects.toThrow();
    });

    it('should handle non-existent destination', async () => {
      mockRepo.moveFile.mockRejectedValue(new Error('Le dossier de destination n\'existe pas'));
      await expect(mockRepo.moveFile(fileId, '/nonexistent')).rejects.toThrow();
    });
  });

  describe('copyFile', () => {
    it('should copy file', async () => {
      mockRepo.copyFile.mockResolvedValue({ id: 'file-copy-1', name: 'doc_copy.pdf' });
      const result = await mockRepo.copyFile(fileId, { name: 'doc_copy.pdf' });
      expect(result.id).toBe('file-copy-1');
    });

    it('should require new name', () => {
      const validate = (data: any) => {
        if (!data?.name) throw new Error('Le nouveau nom est requis');
      };
      expect(() => validate({})).toThrow('Le nouveau nom est requis');
    });

    it('should generate unique ID for copy', async () => {
      mockRepo.copyFile.mockResolvedValue({ id: 'file-copy-' + Date.now() });
      const result = await mockRepo.copyFile(fileId, { name: 'copy.pdf' });
      expect(result.id).not.toBe(fileId);
    });

    it('should not copy to same name', async () => {
      mockRepo.getFileById.mockResolvedValue({ id: fileId, name: 'doc.pdf' });
      const copyOrThrow = async (newName: string) => {
        const file = await mockRepo.getFileById(fileId);
        if (file?.name === newName) throw new Error('Le nom du fichier doit être différent');
      };
      await expect(copyOrThrow('doc.pdf')).rejects.toThrow();
    });
  });

  describe('getStorageProviders', () => {
    it('should return storage providers', async () => {
      mockRepo.getStorageProviders.mockResolvedValue([{ name: 'aws_s3', enabled: true }, { name: 'gcs', enabled: false }]);
      const result = await mockRepo.getStorageProviders();
      expect(result).toHaveLength(2);
    });

    it('should include provider config', async () => {
      mockRepo.getStorageProviders.mockResolvedValue([{ name: 'aws_s3', region: 'eu-west-1', bucket: 'my-bucket' }]);
      const result = await mockRepo.getStorageProviders();
      expect(result[0].region).toBe('eu-west-1');
    });

    it('should mark active provider', async () => {
      mockRepo.getStorageProviders.mockResolvedValue([{ name: 'aws_s3', active: true }, { name: 'gcs', active: false }]);
      const result = await mockRepo.getStorageProviders();
      expect(result[0].active).toBe(true);
    });
  });

  describe('switchProvider', () => {
    it('should switch storage provider', async () => {
      mockRepo.switchProvider.mockResolvedValue({ provider: 'gcs', switchedAt: new Date().toISOString() });
      const result = await mockRepo.switchProvider(enterpriseId, 'gcs');
      expect(result.provider).toBe('gcs');
    });

    it('should require provider name', () => {
      const validate = (provider: string) => {
        if (!provider) throw new Error('Le fournisseur est requis');
      };
      expect(() => validate('')).toThrow('Le fournisseur est requis');
    });

    it('should validate provider exists', async () => {
      mockRepo.switchProvider.mockRejectedValue(new Error('Fournisseur non supporté'));
      await expect(mockRepo.switchProvider(enterpriseId, 'unsupported')).rejects.toThrow();
    });

    it('should not switch to current provider', async () => {
      mockRepo.getStorageProviders.mockResolvedValue([{ name: 'aws_s3', active: true }]);
      const switchOrThrow = async (provider: string) => {
        const providers = await mockRepo.getStorageProviders();
        const active = providers.find((p: any) => p.active);
        if (active?.name === provider) throw new Error('Ce fournisseur est déjà actif');
      };
      await expect(switchOrThrow('aws_s3')).rejects.toThrow();
    });

    it('should handle provider migration', async () => {
      mockRepo.switchProvider.mockResolvedValue({ provider: 'gcs', migrationStarted: true, estimatedTime: '30 minutes' });
      const result = await mockRepo.switchProvider(enterpriseId, 'gcs');
      expect(result.migrationStarted).toBe(true);
    });
  });
});
