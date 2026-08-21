import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiVisionProcessingService } from '@/features/ai/services/ai-vision-processing.service';
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

describe('AiVisionProcessingService', () => {
  let service: AiVisionProcessingService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiVisionProcessingService(null as any);
  });

  describe('getVisionAnalysis', () => {
    it('should return a vision analysis when found', async () => {
      const mockAnalysis = { id: '1', imageUrl: 'https://example.com/img.jpg', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAnalysis as any);
      const result = await service.getVisionAnalysis('school-1', '1');
      expect(result).toEqual(mockAnalysis);
    });

    it('should throw error when vision analysis not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getVisionAnalysis('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listVisionAnalyses', () => {
    it('should return a list of vision analyses', async () => {
      const mockAnalyses = [{ id: '1', imageUrl: 'img.jpg' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockAnalyses as any);
      const result = await service.listVisionAnalyses('school-1', {});
      expect(result).toEqual(mockAnalyses);
    });

    it('should return empty array when no analyses found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listVisionAnalyses('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createVisionAnalysis', () => {
    it('should create a vision analysis and return it', async () => {
      const mockAnalysis = { id: '1', imageUrl: 'img.jpg' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockAnalysis as any);
      const result = await service.createVisionAnalysis('school-1', { imageUrl: 'img.jpg' } as any);
      expect(result).toEqual(mockAnalysis);
    });
  });

  describe('updateVisionAnalysis', () => {
    it('should update an existing vision analysis', async () => {
      const mockAnalysis = { id: '1', status: 'pending' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAnalysis as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockAnalysis, status: 'completed' } as any);
      const result = await service.updateVisionAnalysis('school-1', '1', { status: 'completed' } as any);
      expect(result.status).toBe('completed');
    });

    it('should throw error when updating non-existent vision analysis', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateVisionAnalysis('school-1', 'nonexistent', { status: 'completed' } as any)).rejects.toThrow();
    });
  });

  describe('deleteVisionAnalysis', () => {
    it('should delete an existing vision analysis', async () => {
      const mockAnalysis = { id: '1', status: 'completed' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockAnalysis as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteVisionAnalysis('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent vision analysis', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteVisionAnalysis('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('analyzeImage', () => {
    it('should analyze an image and return results', async () => {
      const mockResult = { labels: ['classroom', 'students'], objects: ['desk', 'chair'] };
      vi.mocked(aiRepository.analyzeImage).mockResolvedValue(mockResult as any);
      const result = await service.analyzeImage('school-1', { imageUrl: 'https://example.com/img.jpg' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle image analysis errors', async () => {
      vi.mocked(aiRepository.analyzeImage).mockRejectedValue(new Error('Image too large'));
      await expect(service.analyzeImage('school-1', { imageUrl: 'large.jpg' } as any)).rejects.toThrow('Image too large');
    });
  });

  describe('detectObjects', () => {
    it('should detect objects in an image', async () => {
      const mockResult = { objects: [{ name: 'book', confidence: 0.95 }, { name: 'pen', confidence: 0.88 }] };
      vi.mocked(aiRepository.detectObjects).mockResolvedValue(mockResult as any);
      const result = await service.detectObjects('school-1', { imageUrl: 'https://example.com/img.jpg' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle object detection errors', async () => {
      vi.mocked(aiRepository.detectObjects).mockRejectedValue(new Error('Detection failed'));
      await expect(service.detectObjects('school-1', { imageUrl: 'bad.jpg' } as any)).rejects.toThrow('Detection failed');
    });
  });

  describe('ocrImage', () => {
    it('should extract text from an image via OCR', async () => {
      const mockResult = { text: 'Chapter 1: Introduction', confidence: 0.97 };
      vi.mocked(aiRepository.ocrImage).mockResolvedValue(mockResult as any);
      const result = await service.ocrImage('school-1', { imageUrl: 'https://example.com/text.jpg' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle OCR errors', async () => {
      vi.mocked(aiRepository.ocrImage).mockRejectedValue(new Error('No text found'));
      await expect(service.ocrImage('school-1', { imageUrl: 'blank.jpg' } as any)).rejects.toThrow('No text found');
    });
  });

  describe('analyzeHandwriting', () => {
    it('should analyze handwriting in an image', async () => {
      const mockResult = { text: 'Student answer', legibility: 0.82 };
      vi.mocked(aiRepository.analyzeHandwriting).mockResolvedValue(mockResult as any);
      const result = await service.analyzeHandwriting('school-1', { imageUrl: 'https://example.com/handwriting.jpg' } as any);
      expect(result).toEqual(mockResult);
    });

    it('should handle handwriting analysis errors', async () => {
      vi.mocked(aiRepository.analyzeHandwriting).mockRejectedValue(new Error('Unreadable'));
      await expect(service.analyzeHandwriting('school-1', { imageUrl: 'messy.jpg' } as any)).rejects.toThrow('Unreadable');
    });
  });
});
