import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSearchService } from '../../src/features/communication/services/search.service';

const mockRepository = {
  search: vi.fn(),
  getSearchStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('SearchService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create SearchService with all methods', () => {
    const service = createSearchService(mockRepository as any);
    expect(typeof service.search).toBe('function');
    expect(typeof service.searchStats).toBe('function');
  });

  it('should perform search', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.search.mockResolvedValue([{ id: 'r1', type: 'message' }]);
    const result = await service.search('school1', 'user1', 'test query');
    expect(result).toEqual([{ id: 'r1', type: 'message' }]);
  });

  it('should throw if schoolId missing', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.search('', 'user1', 'query')).rejects.toThrow('schoolId is required');
  });

  it('should throw if query missing', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.search('school1', 'user1', '')).rejects.toThrow('search query is required');
  });

  it('should throw if query too short', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.search('school1', 'user1', 'a')).rejects.toThrow();
  });

  it('should search with filters', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.search.mockResolvedValue([]);
    await service.search('school1', 'user1', 'query', { type: 'message' });
    expect(mockRepository.search).toHaveBeenCalledWith('school1', 'user1', 'query', { type: 'message' });
  });

  it('should get search stats', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getSearchStats.mockResolvedValue({ total: 100 });
    const result = await service.searchStats('school1');
    expect(result).toEqual({ total: 100 });
  });

  it('should throw if schoolId missing for searchStats', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.searchStats('')).rejects.toThrow('schoolId is required');
  });

  it('should handle searchStats with date range', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getSearchStats.mockResolvedValue({ total: 50 });
    await service.searchStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getSearchStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on search', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.search.mockResolvedValue([]);
    await service.search('school1', 'user1', 'test');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'search.performed', expect.any(Object));
  });

  it('should throw if userId missing', async () => {
    const service = createSearchService(mockRepository as any);
    await expect(service.search('school1', '', 'query')).rejects.toThrow('userId is required');
  });

  it('should handle search error', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.search.mockRejectedValue(new Error('fail'));
    await expect(service.search('school1', 'user1', 'query')).rejects.toThrow('fail');
  });

  it('should handle searchStats error', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.getSearchStats.mockRejectedValue(new Error('fail'));
    await expect(service.searchStats('school1')).rejects.toThrow('fail');
  });

  it('should allow query of exactly 2 characters', async () => {
    const service = createSearchService(mockRepository as any);
    mockRepository.search.mockResolvedValue([]);
    const result = await service.search('school1', 'user1', 'ab');
    expect(result).toEqual([]);
  });
});
