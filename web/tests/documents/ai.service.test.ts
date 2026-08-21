import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAiService } from '../../src/features/documents/services/ai.service';

describe('AiService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      classifyDocument: vi.fn(),
      getDocumentClassification: vi.fn(),
      getRecommendations: vi.fn(),
      getDocumentInsights: vi.fn(),
      detectDuplicates: vi.fn(),
      getDuplicateDocuments: vi.fn(),
      generateDocumentSummary: vi.fn(),
      extractKeyPhrases: vi.fn(),
      detectLanguage: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createAiService(mockRepository);
    expect(service).toBeDefined();
    expect(service.classifyDocument).toBeInstanceOf(Function);
    expect(service.getDocumentClassification).toBeInstanceOf(Function);
    expect(service.getRecommendations).toBeInstanceOf(Function);
    expect(service.getDocumentInsights).toBeInstanceOf(Function);
    expect(service.detectDuplicates).toBeInstanceOf(Function);
    expect(service.getDuplicateDocuments).toBeInstanceOf(Function);
    expect(service.generateDocumentSummary).toBeInstanceOf(Function);
    expect(service.extractKeyPhrases).toBeInstanceOf(Function);
    expect(service.detectLanguage).toBeInstanceOf(Function);
  });

  describe('classifyDocument', () => {
    it('should classify a document', async () => {
      const classification = { category: 'invoice', confidence: 0.95 };
      mockRepository.classifyDocument.mockResolvedValue(classification);
      const service = createAiService(mockRepository);
      const result = await service.classifyDocument('doc-1', 'user-1', 'school-1');
      expect(result).toEqual(classification);
      expect(mockRepository.classifyDocument).toHaveBeenCalledWith('doc-1', 'school-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.classifyDocument('', 'user-1', 'school-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.classifyDocument('doc-1', '', 'school-1')).rejects.toThrow('userId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.classifyDocument('doc-1', 'user-1', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.classifyDocument.mockRejectedValue(new Error('Classification failed'));
      const service = createAiService(mockRepository);
      await expect(service.classifyDocument('doc-1', 'user-1', 'school-1')).rejects.toThrow('Classification failed');
    });
  });

  describe('getDocumentClassification', () => {
    it('should return document classification', async () => {
      const classification = { category: 'report', confidence: 0.88 };
      mockRepository.getDocumentClassification.mockResolvedValue(classification);
      const service = createAiService(mockRepository);
      const result = await service.getDocumentClassification('doc-1', 'user-1');
      expect(result).toEqual(classification);
      expect(mockRepository.getDocumentClassification).toHaveBeenCalledWith('doc-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getDocumentClassification('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getDocumentClassification('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocumentClassification.mockRejectedValue(new Error('Not found'));
      const service = createAiService(mockRepository);
      await expect(service.getDocumentClassification('doc-1', 'user-1')).rejects.toThrow('Not found');
    });
  });

  describe('getRecommendations', () => {
    it('should return recommendations', async () => {
      const recommendations = [{ id: 'rec-1', type: 'similar', documentId: 'doc-2' }];
      mockRepository.getRecommendations.mockResolvedValue(recommendations);
      const service = createAiService(mockRepository);
      const result = await service.getRecommendations('doc-1', 'user-1', 'school-1');
      expect(result).toEqual(recommendations);
      expect(mockRepository.getRecommendations).toHaveBeenCalledWith('school-1', 'user-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getRecommendations('', 'user-1', 'school-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getRecommendations('doc-1', '', 'school-1')).rejects.toThrow('userId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getRecommendations('doc-1', 'user-1', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getRecommendations.mockRejectedValue(new Error('Recommendation failed'));
      const service = createAiService(mockRepository);
      await expect(service.getRecommendations('doc-1', 'user-1', 'school-1')).rejects.toThrow('Recommendation failed');
    });
  });

  describe('getDocumentInsights', () => {
    it('should return document insights', async () => {
      const insights = { views: 42, downloads: 12, shares: 5 };
      mockRepository.getDocumentInsights.mockResolvedValue(insights);
      const service = createAiService(mockRepository);
      const result = await service.getDocumentInsights('doc-1', 'user-1', 'school-1');
      expect(result).toEqual(insights);
      expect(mockRepository.getDocumentInsights).toHaveBeenCalledWith('school-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getDocumentInsights('', 'user-1', 'school-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getDocumentInsights('doc-1', '', 'school-1')).rejects.toThrow('userId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getDocumentInsights('doc-1', 'user-1', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getDocumentInsights.mockRejectedValue(new Error('Insights failed'));
      const service = createAiService(mockRepository);
      await expect(service.getDocumentInsights('doc-1', 'user-1', 'school-1')).rejects.toThrow('Insights failed');
    });
  });

  describe('detectDuplicates', () => {
    it('should detect duplicates', async () => {
      const duplicates = [{ id: 'doc-2', similarity: 0.92 }];
      mockRepository.detectDuplicates.mockResolvedValue(duplicates);
      const service = createAiService(mockRepository);
      const result = await service.detectDuplicates('doc-1', 'user-1', 'school-1');
      expect(result).toEqual(duplicates);
      expect(mockRepository.detectDuplicates).toHaveBeenCalledWith('school-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.detectDuplicates('', 'user-1', 'school-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.detectDuplicates('doc-1', '', 'school-1')).rejects.toThrow('userId is required');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.detectDuplicates('doc-1', 'user-1', '')).rejects.toThrow('schoolId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.detectDuplicates.mockRejectedValue(new Error('Detection failed'));
      const service = createAiService(mockRepository);
      await expect(service.detectDuplicates('doc-1', 'user-1', 'school-1')).rejects.toThrow('Detection failed');
    });
  });

  describe('getDuplicateDocuments', () => {
    it('should return duplicate documents', async () => {
      const duplicates = [{ id: 'dup-1', originalId: 'doc-1' }];
      mockRepository.getDuplicateDocuments.mockResolvedValue(duplicates);
      const service = createAiService(mockRepository);
      const result = await service.getDuplicateDocuments('school-1', 'user-1');
      expect(result).toEqual(duplicates);
      expect(mockRepository.getDuplicateDocuments).toHaveBeenCalledWith('school-1');
    });

    it('should throw if schoolId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getDuplicateDocuments('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.getDuplicateDocuments('school-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.getDuplicateDocuments.mockRejectedValue(new Error('Query failed'));
      const service = createAiService(mockRepository);
      await expect(service.getDuplicateDocuments('school-1', 'user-1')).rejects.toThrow('Query failed');
    });
  });

  describe('generateDocumentSummary', () => {
    it('should generate document summary', async () => {
      const summary = { text: 'This document covers quarterly results...', wordCount: 250 };
      mockRepository.generateDocumentSummary.mockResolvedValue(summary);
      const service = createAiService(mockRepository);
      const result = await service.generateDocumentSummary('doc-1', 'user-1');
      expect(result).toEqual(summary);
      expect(mockRepository.generateDocumentSummary).toHaveBeenCalledWith('doc-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.generateDocumentSummary('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.generateDocumentSummary('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.generateDocumentSummary.mockRejectedValue(new Error('Summary failed'));
      const service = createAiService(mockRepository);
      await expect(service.generateDocumentSummary('doc-1', 'user-1')).rejects.toThrow('Summary failed');
    });
  });

  describe('extractKeyPhrases', () => {
    it('should extract key phrases', async () => {
      const keyPhrases = ['quarterly results', 'revenue growth', 'market analysis'];
      mockRepository.extractKeyPhrases.mockResolvedValue(keyPhrases);
      const service = createAiService(mockRepository);
      const result = await service.extractKeyPhrases('doc-1', 'user-1');
      expect(result).toEqual(keyPhrases);
      expect(mockRepository.extractKeyPhrases).toHaveBeenCalledWith('doc-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.extractKeyPhrases('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.extractKeyPhrases('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.extractKeyPhrases.mockRejectedValue(new Error('Extraction failed'));
      const service = createAiService(mockRepository);
      await expect(service.extractKeyPhrases('doc-1', 'user-1')).rejects.toThrow('Extraction failed');
    });
  });

  describe('detectLanguage', () => {
    it('should detect document language', async () => {
      const language = { code: 'en', name: 'English', confidence: 0.99 };
      mockRepository.detectLanguage.mockResolvedValue(language);
      const service = createAiService(mockRepository);
      const result = await service.detectLanguage('doc-1', 'user-1');
      expect(result).toEqual(language);
      expect(mockRepository.detectLanguage).toHaveBeenCalledWith('doc-1');
    });

    it('should throw if documentId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.detectLanguage('', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw if userId missing', async () => {
      const service = createAiService(mockRepository);
      await expect(service.detectLanguage('doc-1', '')).rejects.toThrow('userId is required');
    });

    it('should handle repository errors', async () => {
      mockRepository.detectLanguage.mockRejectedValue(new Error('Detection failed'));
      const service = createAiService(mockRepository);
      await expect(service.detectLanguage('doc-1', 'user-1')).rejects.toThrow('Detection failed');
    });

    it('should not swallow errors', async () => {
      mockRepository.detectLanguage.mockRejectedValue(new Error('Timeout'));
      const service = createAiService(mockRepository);
      await expect(service.detectLanguage('doc-1', 'user-1')).rejects.toThrow('Timeout');
    });
  });
});
