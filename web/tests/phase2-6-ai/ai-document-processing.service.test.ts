import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiDocumentProcessingService } from '@/features/ai/services/ai-document-processing.service';
import { aiRepository } from '../repositories/ai.repository';

vi.mock('@/features/repositories/ai.repository', () => ({
  aiRepository: {
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('AiDocumentProcessingService', () => {
  let service: AiDocumentProcessingService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiDocumentProcessingService(null as any);
  });

  describe('getDocument', () => {
    it('should return a document when found', async () => {
      const mockDoc = { id: '1', name: 'Exam Paper', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDoc as any);
      const result = await service.getDocument('school-1', '1');
      expect(result).toEqual(mockDoc);
    });

    it('should throw error when document not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getDocument('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listDocuments', () => {
    it('should return a list of documents', async () => {
      const mockDocs = [{ id: '1', name: 'Doc 1' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockDocs as any);
      const result = await service.listDocuments('school-1', {});
      expect(result).toEqual(mockDocs);
    });

    it('should return empty array when no documents found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listDocuments('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createDocument', () => {
    it('should create a document and return it', async () => {
      const mockDoc = { id: '1', name: 'New Doc' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockDoc as any);
      const result = await service.createDocument('school-1', { name: 'New Doc' } as any);
      expect(result).toEqual(mockDoc);
    });
  });

  describe('updateDocument', () => {
    it('should update an existing document', async () => {
      const mockDoc = { id: '1', name: 'Old Doc' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDoc as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockDoc, name: 'Updated' } as any);
      const result = await service.updateDocument('school-1', '1', { name: 'Updated' } as any);
      expect(result.name).toBe('Updated');
    });

    it('should throw error when updating non-existent document', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateDocument('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteDocument', () => {
    it('should delete an existing document', async () => {
      const mockDoc = { id: '1', name: 'Doc' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDoc as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteDocument('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent document', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteDocument('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('processOCR', () => {
    it('should process OCR on a document', async () => {
      const mockDoc = { id: '1', name: 'Handwritten Notes' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDoc as any);
      const mockResult = { text: 'Extracted text', confidence: 0.95 };
      vi.mocked(aiRepository.processOCR).mockResolvedValue(mockResult as any);
      const result = await service.processOCR('school-1', '1');
      expect(result).toEqual(mockResult);
    });

    it('should throw error when document not found for OCR', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.processOCR('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('classifyDocument', () => {
    it('should classify a document', async () => {
      const mockDoc = { id: '1', name: 'Assignment' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDoc as any);
      const mockClassification = { category: 'assignment', confidence: 0.9 };
      vi.mocked(aiRepository.classifyDocument).mockResolvedValue(mockClassification as any);
      const result = await service.classifyDocument('school-1', '1');
      expect(result).toEqual(mockClassification);
    });

    it('should throw error when document not found for classification', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.classifyDocument('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('extractEntities', () => {
    it('should extract entities from a document', async () => {
      const mockDoc = { id: '1', name: 'Student Record' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDoc as any);
      const mockEntities = [{ type: 'NAME', value: 'John Doe' }];
      vi.mocked(aiRepository.extractEntities).mockResolvedValue(mockEntities as any);
      const result = await service.extractEntities('school-1', '1');
      expect(result).toEqual(mockEntities);
    });

    it('should throw error when document not found for entity extraction', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.extractEntities('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('summarizeDocument', () => {
    it('should summarize a document', async () => {
      const mockDoc = { id: '1', name: 'Long Essay' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockDoc as any);
      const mockSummary = { summary: 'Brief summary of the essay' };
      vi.mocked(aiRepository.summarizeDocument).mockResolvedValue(mockSummary as any);
      const result = await service.summarizeDocument('school-1', '1');
      expect(result).toEqual(mockSummary);
    });

    it('should throw error when document not found for summarization', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.summarizeDocument('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
