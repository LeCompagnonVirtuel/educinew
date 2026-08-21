import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOcrService } from '../../src/features/documents/services/ocr.service';

describe('OCRService', () => {
  let mockRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = {
      createOCRJob: vi.fn(),
      getOCRResult: vi.fn(),
      getOCRFields: vi.fn(),
      getOCRTemplates: vi.fn(),
      getOCRArchiveStats: vi.fn(),
      updateOCRResult: vi.fn(),
    };
  });

  it('should create service with all methods', () => {
    const service = createOcrService(mockRepository);
    expect(service).toBeDefined();
    expect(service.createOCRJob).toBeInstanceOf(Function);
    expect(service.getOCRResult).toBeInstanceOf(Function);
    expect(service.getOCRFields).toBeInstanceOf(Function);
    expect(service.getOCRTemplates).toBeInstanceOf(Function);
    expect(service.getOCRStats).toBeInstanceOf(Function);
  });

  describe('createOCRJob', () => {
    it('should create an OCR job', async () => {
      mockRepository.createOCRJob.mockResolvedValue({ id: 'ocr-1', status: 'processing' });
      const service = createOcrService(mockRepository);
      const result = await service.createOCRJob('doc-1', 'school-1', 'user-1', { language: 'en' });
      expect(result).toEqual({ id: 'ocr-1', status: 'processing' });
      expect(mockRepository.createOCRJob).toHaveBeenCalledWith('doc-1', 'school-1', { language: 'en' });
    });
  });

  describe('getOCRResult', () => {
    it('should return a single OCR result', async () => {
      const result = { id: 'ocr-1', text: 'Extracted text' };
      mockRepository.getOCRResult.mockResolvedValue(result);
      const service = createOcrService(mockRepository);
      const output = await service.getOCRResult('ocr-1', 'user-1');
      expect(output).toEqual(result);
      expect(mockRepository.getOCRResult).toHaveBeenCalledWith('ocr-1');
    });
  });

  describe('getOCRFields', () => {
    it('should return extracted fields', async () => {
      mockRepository.getOCRResult.mockResolvedValue({ id: 'ocr-1' });
      const fields = [{ name: 'date', value: '2026-01-01' }];
      mockRepository.getOCRFields.mockResolvedValue(fields);
      const service = createOcrService(mockRepository);
      const result = await service.getOCRFields('ocr-1', 'user-1');
      expect(result).toEqual(fields);
      expect(mockRepository.getOCRFields).toHaveBeenCalledWith('ocr-1');
    });
  });

  describe('getOCRTemplates', () => {
    it('should return OCR templates', async () => {
      const templates = [{ id: 'tpl-1', name: 'Invoice Template' }];
      mockRepository.getOCRTemplates.mockResolvedValue(templates);
      const service = createOcrService(mockRepository);
      const result = await service.getOCRTemplates('school-1', 'user-1');
      expect(result).toEqual(templates);
      expect(mockRepository.getOCRTemplates).toHaveBeenCalledWith('school-1');
    });
  });

  describe('getOCRStats', () => {
    it('should return OCR statistics', async () => {
      const stats = { totalJobs: 50, successRate: 0.95 };
      mockRepository.getOCRArchiveStats.mockResolvedValue(stats);
      const service = createOcrService(mockRepository);
      const result = await service.getOCRStats('school-1', 'user-1');
      expect(result).toEqual(stats);
      expect(mockRepository.getOCRArchiveStats).toHaveBeenCalledWith('school-1', undefined, undefined);
    });
  });

  describe('missing required parameters', () => {
    it('should throw on missing documentId for createOCRJob', async () => {
      const service = createOcrService(mockRepository);
      await expect(service.createOCRJob('', 'school-1', 'user-1')).rejects.toThrow('documentId is required');
    });

    it('should throw on missing ocrId for getOCRResult', async () => {
      const service = createOcrService(mockRepository);
      await expect(service.getOCRResult('', 'user-1')).rejects.toThrow('ocrId is required');
    });

    it('should throw on missing userId for getOCRResult', async () => {
      const service = createOcrService(mockRepository);
      await expect(service.getOCRResult('ocr-1', '')).rejects.toThrow('userId is required');
    });

    it('should throw on missing ocrId for getOCRFields', async () => {
      const service = createOcrService(mockRepository);
      await expect(service.getOCRFields('', 'user-1')).rejects.toThrow('ocrId is required');
    });

    it('should throw on missing schoolId for getOCRTemplates', async () => {
      const service = createOcrService(mockRepository);
      await expect(service.getOCRTemplates('', 'user-1')).rejects.toThrow('schoolId is required');
    });

    it('should throw on missing schoolId for getOCRStats', async () => {
      const service = createOcrService(mockRepository);
      await expect(service.getOCRStats('', 'user-1')).rejects.toThrow('schoolId is required');
    });
  });

  describe('repository errors', () => {
    it('should handle repository errors in createOCRJob', async () => {
      mockRepository.createOCRJob.mockRejectedValue(new Error('Job creation failed'));
      const service = createOcrService(mockRepository);
      await expect(service.createOCRJob('doc-1', 'school-1', 'user-1')).rejects.toThrow('Job creation failed');
    });

    it('should handle repository errors in getOCRResult', async () => {
      mockRepository.getOCRResult.mockRejectedValue(new Error('Not found'));
      const service = createOcrService(mockRepository);
      await expect(service.getOCRResult('ocr-1', 'user-1')).rejects.toThrow('Not found');
    });

    it('should handle repository errors in getOCRFields', async () => {
      mockRepository.getOCRResult.mockResolvedValue({ id: 'ocr-1' });
      mockRepository.getOCRFields.mockRejectedValue(new Error('Fields query failed'));
      const service = createOcrService(mockRepository);
      await expect(service.getOCRFields('ocr-1', 'user-1')).rejects.toThrow('Fields query failed');
    });

    it('should handle repository errors in getOCRTemplates', async () => {
      mockRepository.getOCRTemplates.mockRejectedValue(new Error('Templates query failed'));
      const service = createOcrService(mockRepository);
      await expect(service.getOCRTemplates('school-1', 'user-1')).rejects.toThrow('Templates query failed');
    });

    it('should handle repository errors in getOCRStats', async () => {
      mockRepository.getOCRArchiveStats.mockRejectedValue(new Error('Stats query failed'));
      const service = createOcrService(mockRepository);
      await expect(service.getOCRStats('school-1', 'user-1')).rejects.toThrow('Stats query failed');
    });
  });
});
