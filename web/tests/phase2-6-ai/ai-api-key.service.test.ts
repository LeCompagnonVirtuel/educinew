import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AiApiKeyService } from '@/features/ai/services/ai-api-key.service';
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

describe('AiApiKeyService', () => {
  let service: AiApiKeyService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AiApiKeyService(null as any);
  });

  describe('getApiKey', () => {
    it('should return an API key when found', async () => {
      const mockKey = { id: '1', name: 'OpenAI Key', schoolId: 'school-1' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockKey as any);
      const result = await service.getApiKey('school-1', '1');
      expect(result).toEqual(mockKey);
    });

    it('should throw error when API key not found', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.getApiKey('school-1', 'nonexistent')).rejects.toThrow();
    });
  });

  describe('listApiKeys', () => {
    it('should return a list of API keys', async () => {
      const mockKeys = [{ id: '1', name: 'OpenAI' }];
      vi.mocked(aiRepository.findAll).mockResolvedValue(mockKeys as any);
      const result = await service.listApiKeys('school-1', {});
      expect(result).toEqual(mockKeys);
    });

    it('should return empty array when no API keys found', async () => {
      vi.mocked(aiRepository.findAll).mockResolvedValue([]);
      const result = await service.listApiKeys('school-1', {});
      expect(result).toEqual([]);
    });
  });

  describe('createApiKey', () => {
    it('should create an API key and return it', async () => {
      const mockKey = { id: '1', name: 'New Key', key: 'sk-xxxxx' };
      vi.mocked(aiRepository.create).mockResolvedValue(mockKey as any);
      const result = await service.createApiKey('school-1', { name: 'New Key', key: 'sk-xxxxx' } as any);
      expect(result).toEqual(mockKey);
    });
  });

  describe('updateApiKey', () => {
    it('should update an existing API key', async () => {
      const mockKey = { id: '1', name: 'Old Name' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockKey as any);
      vi.mocked(aiRepository.update).mockResolvedValue({ ...mockKey, name: 'Updated' } as any);
      const result = await service.updateApiKey('school-1', '1', { name: 'Updated' } as any);
      expect(result.name).toBe('Updated');
    });

    it('should throw error when updating non-existent API key', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.updateApiKey('school-1', 'nonexistent', { name: 'test' } as any)).rejects.toThrow();
    });
  });

  describe('deleteApiKey', () => {
    it('should delete an existing API key', async () => {
      const mockKey = { id: '1', name: 'Key' };
      vi.mocked(aiRepository.findById).mockResolvedValue(mockKey as any);
      vi.mocked(aiRepository.delete).mockResolvedValue(undefined);
      await service.deleteApiKey('school-1', '1');
      expect(aiRepository.delete).toHaveBeenCalledWith('school-1', '1');
    });

    it('should throw error when deleting non-existent API key', async () => {
      vi.mocked(aiRepository.findById).mockResolvedValue(null);
      await expect(service.deleteApiKey('school-1', 'nonexistent')).rejects.toThrow();
    });
  });
});
