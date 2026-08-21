import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createForensicService } from '../../src/features/documents/services/forensic.service';

describe('ForensicService', () => {
  let mockRepository: {
    getAuditTrail: ReturnType<typeof vi.fn>;
    getDocument: ReturnType<typeof vi.fn>;
    getDocumentTimeline: ReturnType<typeof vi.fn>;
    getDocumentStats: ReturnType<typeof vi.fn>;
    getComplianceChecks: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      getAuditTrail: vi.fn(),
      getDocument: vi.fn(),
      getDocumentTimeline: vi.fn(),
      getDocumentStats: vi.fn(),
      getComplianceChecks: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createForensicService(mockRepository);
    expect(service).toBeDefined();
    expect(service.getForensicAudit).toBeInstanceOf(Function);
    expect(service.createForensicAudit).toBeInstanceOf(Function);
    expect(service.getForensicTimeline).toBeInstanceOf(Function);
    expect(service.getForensicStats).toBeInstanceOf(Function);
    expect(service.validateForensicAudit).toBeInstanceOf(Function);
    expect(service.getForensicReport).toBeInstanceOf(Function);
  });

  describe('getForensicAudit', () => {
    it('should return forensic audit data', async () => {
      const audit = [{ id: 'a-1', action: 'accessed' }];
      mockRepository.getAuditTrail.mockResolvedValue(audit);
      const service = createForensicService(mockRepository);
      const result = await service.getForensicAudit('doc-1', 'school-1', 'user-1');
      expect(result).toEqual(audit);
      expect(mockRepository.getAuditTrail).toHaveBeenCalledWith('school-1', 'doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicAudit('', 'school-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicAudit('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicAudit('doc-1', 'school-1', '')).rejects.toThrow();
    });

    it('should return empty array when no audit entries exist', async () => {
      mockRepository.getAuditTrail.mockResolvedValue([]);
      const service = createForensicService(mockRepository);
      const result = await service.getForensicAudit('doc-1', 'school-1', 'user-1');
      expect(result).toEqual([]);
    });

    it('should propagate repository errors', async () => {
      mockRepository.getAuditTrail.mockRejectedValue(new Error('Audit fetch failed'));
      const service = createForensicService(mockRepository);
      await expect(service.getForensicAudit('doc-1', 'school-1', 'user-1')).rejects.toThrow('Audit fetch failed');
    });
  });

  describe('createForensicAudit', () => {
    it('should create a forensic audit entry', async () => {
      const document = { id: 'doc-1' };
      const data = { action: 'viewed', details: 'Opened for review' };
      mockRepository.getDocument.mockResolvedValue(document);
      const service = createForensicService(mockRepository);
      const result = await service.createForensicAudit('doc-1', 'school-1', 'user-1', data);
      expect(result).toBeDefined();
      expect(result.documentId).toBe('doc-1');
      expect(result.userId).toBe('user-1');
      expect(result.schoolId).toBe('school-1');
      expect(result.action).toBe('viewed');
      expect(result.createdAt).toBeDefined();
    });

    it('should throw when documentId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.createForensicAudit('', 'school-1', 'user-1', { action: 'test' })).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.createForensicAudit('doc-1', '', 'user-1', { action: 'test' })).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.createForensicAudit('doc-1', 'school-1', '', { action: 'test' })).rejects.toThrow();
    });

    it('should throw when data is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.createForensicAudit('doc-1', 'school-1', 'user-1', undefined as any)).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createForensicService(mockRepository);
      await expect(service.createForensicAudit('doc-1', 'school-1', 'user-1', { action: 'test' })).rejects.toThrow();
    });

    it('should include timestamp in audit entry', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createForensicService(mockRepository);
      const result = await service.createForensicAudit('doc-1', 'school-1', 'user-1', { action: 'test' });
      expect(result.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    it('should spread data into audit entry', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      const service = createForensicService(mockRepository);
      const result = await service.createForensicAudit('doc-1', 'school-1', 'user-1', { action: 'deleted', reason: 'Policy' });
      expect(result.action).toBe('deleted');
      expect(result.reason).toBe('Policy');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Create failed'));
      const service = createForensicService(mockRepository);
      await expect(service.createForensicAudit('doc-1', 'school-1', 'user-1', { action: 'test' })).rejects.toThrow('Create failed');
    });
  });

  describe('getForensicTimeline', () => {
    it('should return the forensic timeline', async () => {
      const timeline = [{ action: 'created', timestamp: '2026-01-01T00:00:00Z' }];
      mockRepository.getDocumentTimeline.mockResolvedValue(timeline);
      const service = createForensicService(mockRepository);
      const result = await service.getForensicTimeline('doc-1', 'school-1');
      expect(result).toEqual(timeline);
      expect(mockRepository.getDocumentTimeline).toHaveBeenCalledWith('doc-1');
    });

    it('should throw when documentId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicTimeline('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicTimeline('doc-1', '')).rejects.toThrow();
    });

    it('should return empty timeline when no entries', async () => {
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      const service = createForensicService(mockRepository);
      const result = await service.getForensicTimeline('doc-1', 'school-1');
      expect(result).toEqual([]);
    });

    it('should pass correct documentId to repository', async () => {
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      const service = createForensicService(mockRepository);
      await service.getForensicTimeline('doc-99', 'school-1');
      expect(mockRepository.getDocumentTimeline).toHaveBeenCalledWith('doc-99');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentTimeline.mockRejectedValue(new Error('Timeline error'));
      const service = createForensicService(mockRepository);
      await expect(service.getForensicTimeline('doc-1', 'school-1')).rejects.toThrow('Timeline error');
    });
  });

  describe('getForensicStats', () => {
    it('should fetch forensic stats', async () => {
      const stats = { totalAudits: 25, complianceRate: 0.95 };
      mockRepository.getDocumentStats.mockResolvedValue(stats);
      const service = createForensicService(mockRepository);
      const result = await service.getForensicStats('school-1', 'user-1');
      expect(result).toEqual(stats);
    });

    it('should throw when schoolId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicStats('', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicStats('school-1', '')).rejects.toThrow();
    });

    it('should pass date range to repository', async () => {
      mockRepository.getDocumentStats.mockResolvedValue({ totalAudits: 10 });
      const service = createForensicService(mockRepository);
      await service.getForensicStats('school-1', 'user-1', '2026-01-01', '2026-12-31');
      expect(mockRepository.getDocumentStats).toHaveBeenCalledWith('school-1', '2026-01-01', '2026-12-31');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocumentStats.mockRejectedValue(new Error('Stats failed'));
      const service = createForensicService(mockRepository);
      await expect(service.getForensicStats('school-1', 'user-1')).rejects.toThrow('Stats failed');
    });
  });

  describe('validateForensicAudit', () => {
    it('should validate forensic audit as valid', async () => {
      const audit = [{ id: 'a-1' }, { id: 'a-2' }];
      mockRepository.getAuditTrail.mockResolvedValue(audit);
      const service = createForensicService(mockRepository);
      const result = await service.validateForensicAudit('doc-1', 'school-1');
      expect(result.isValid).toBe(true);
      expect(result.auditCount).toBe(2);
    });

    it('should validate forensic audit as invalid when empty', async () => {
      mockRepository.getAuditTrail.mockResolvedValue([]);
      const service = createForensicService(mockRepository);
      const result = await service.validateForensicAudit('doc-1', 'school-1');
      expect(result.isValid).toBe(false);
      expect(result.auditCount).toBe(0);
    });

    it('should throw when documentId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.validateForensicAudit('', 'school-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.validateForensicAudit('doc-1', '')).rejects.toThrow();
    });

    it('should pass correct parameters to repository', async () => {
      mockRepository.getAuditTrail.mockResolvedValue([]);
      const service = createForensicService(mockRepository);
      await service.validateForensicAudit('doc-42', 'school-42');
      expect(mockRepository.getAuditTrail).toHaveBeenCalledWith('school-42', 'doc-42');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getAuditTrail.mockRejectedValue(new Error('Validation failed'));
      const service = createForensicService(mockRepository);
      await expect(service.validateForensicAudit('doc-1', 'school-1')).rejects.toThrow('Validation failed');
    });
  });

  describe('getForensicReport', () => {
    it('should generate a forensic report', async () => {
      const document = { id: 'doc-1', name: 'test.pdf' };
      const audit = [{ id: 'a-1' }];
      const timeline = [{ action: 'created' }];
      const compliance = [{ check: 'passed' }];
      mockRepository.getDocument.mockResolvedValue(document);
      mockRepository.getAuditTrail.mockResolvedValue(audit);
      mockRepository.getDocumentTimeline.mockResolvedValue(timeline);
      mockRepository.getComplianceChecks.mockResolvedValue(compliance);
      const service = createForensicService(mockRepository);
      const result = await service.getForensicReport('doc-1', 'school-1', 'user-1');
      expect(result.document).toEqual(document);
      expect(result.audit).toEqual(audit);
      expect(result.timeline).toEqual(timeline);
      expect(result.compliance).toEqual(compliance);
      expect(result.generatedAt).toBeDefined();
    });

    it('should throw when documentId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicReport('', 'school-1', 'user-1')).rejects.toThrow();
    });

    it('should throw when schoolId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicReport('doc-1', '', 'user-1')).rejects.toThrow();
    });

    it('should throw when userId is missing', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicReport('doc-1', 'school-1', '')).rejects.toThrow();
    });

    it('should throw when document is not found', async () => {
      mockRepository.getDocument.mockResolvedValue(null);
      const service = createForensicService(mockRepository);
      await expect(service.getForensicReport('doc-1', 'school-1', 'user-1')).rejects.toThrow();
    });

    it('should include generatedAt timestamp', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.getAuditTrail.mockResolvedValue([]);
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      mockRepository.getComplianceChecks.mockResolvedValue([]);
      const service = createForensicService(mockRepository);
      const result = await service.getForensicReport('doc-1', 'school-1', 'user-1');
      expect(result.generatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });

    it('should call all repository methods', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.getAuditTrail.mockResolvedValue([]);
      mockRepository.getDocumentTimeline.mockResolvedValue([]);
      mockRepository.getComplianceChecks.mockResolvedValue([]);
      const service = createForensicService(mockRepository);
      await service.getForensicReport('doc-1', 'school-1', 'user-1');
      expect(mockRepository.getDocument).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.getAuditTrail).toHaveBeenCalledWith('school-1', 'doc-1');
      expect(mockRepository.getDocumentTimeline).toHaveBeenCalledWith('doc-1');
      expect(mockRepository.getComplianceChecks).toHaveBeenCalledWith('school-1');
    });

    it('should propagate repository errors', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Report generation failed'));
      const service = createForensicService(mockRepository);
      await expect(service.getForensicReport('doc-1', 'school-1', 'user-1')).rejects.toThrow('Report generation failed');
    });
  });

  describe('missing required parameters', () => {
    it('should throw when getForensicAudit receives all empty strings', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicAudit('', '', '')).rejects.toThrow();
    });

    it('should throw when createForensicAudit receives all empty strings', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.createForensicAudit('', '', '', undefined as any)).rejects.toThrow();
    });

    it('should throw when getForensicTimeline receives undefined documentId', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicTimeline(undefined as any, 'school-1')).rejects.toThrow();
    });

    it('should throw when getForensicStats receives undefined schoolId', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicStats(undefined as any, 'user-1')).rejects.toThrow();
    });

    it('should throw when validateForensicAudit receives null schoolId', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.validateForensicAudit('doc-1', null as any)).rejects.toThrow();
    });

    it('should throw when getForensicReport receives all empty strings', async () => {
      const service = createForensicService(mockRepository);
      await expect(service.getForensicReport('', '', '')).rejects.toThrow();
    });
  });

  describe('repository error handling', () => {
    it('should handle getDocument failure in createForensicAudit', async () => {
      mockRepository.getDocument.mockRejectedValue(new Error('Doc fetch error'));
      const service = createForensicService(mockRepository);
      await expect(service.createForensicAudit('doc-1', 'school-1', 'user-1', { action: 'test' })).rejects.toThrow('Doc fetch error');
    });

    it('should handle getAuditTrail failure in validateForensicAudit', async () => {
      mockRepository.getAuditTrail.mockRejectedValue(new Error('Trail error'));
      const service = createForensicService(mockRepository);
      await expect(service.validateForensicAudit('doc-1', 'school-1')).rejects.toThrow('Trail error');
    });

    it('should handle multiple repository failures in getForensicReport', async () => {
      mockRepository.getDocument.mockResolvedValue({ id: 'doc-1' });
      mockRepository.getAuditTrail.mockRejectedValue(new Error('Audit fetch error'));
      const service = createForensicService(mockRepository);
      await expect(service.getForensicReport('doc-1', 'school-1', 'user-1')).rejects.toThrow('Audit fetch error');
    });
  });
});
