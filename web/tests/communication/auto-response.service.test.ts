import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createAutoResponseService } from '../../src/features/communication/services/auto-response.service';

const mockRepository = {
  getAutoResponses: vi.fn(),
  createAutoResponse: vi.fn(),
  updateAutoResponse: vi.fn(),
  deleteAutoResponse: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('AutoResponseService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create AutoResponseService with all methods', () => {
    const service = createAutoResponseService(mockRepository as any);
    expect(typeof service.getAutoResponses).toBe('function');
    expect(typeof service.createAutoResponse).toBe('function');
    expect(typeof service.updateAutoResponse).toBe('function');
    expect(typeof service.deleteAutoResponse).toBe('function');
  });

  it('should fetch auto responses', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.getAutoResponses.mockResolvedValue([{ id: 'ar1' }]);
    const result = await service.getAutoResponses('school1', 'user1');
    expect(result).toEqual([{ id: 'ar1' }]);
  });

  it('should throw if schoolId missing', async () => {
    const service = createAutoResponseService(mockRepository as any);
    await expect(service.getAutoResponses('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should create auto response', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.createAutoResponse.mockResolvedValue({ id: 'ar1', trigger: 'away', response: 'I am away' });
    const result = await service.createAutoResponse('school1', 'user1', { trigger: 'away', response: 'I am away' });
    expect(result.trigger).toBe('away');
  });

  it('should throw if trigger missing', async () => {
    const service = createAutoResponseService(mockRepository as any);
    await expect(service.createAutoResponse('school1', 'user1', { response: 'Hi' })).rejects.toThrow('auto response trigger is required');
  });

  it('should throw if response missing', async () => {
    const service = createAutoResponseService(mockRepository as any);
    await expect(service.createAutoResponse('school1', 'user1', { trigger: 'away' })).rejects.toThrow('auto response content is required');
  });

  it('should update auto response', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.updateAutoResponse.mockResolvedValue({ id: 'ar1', response: 'Updated' });
    const result = await service.updateAutoResponse('ar1', 'user1', { response: 'Updated' });
    expect(result.response).toBe('Updated');
  });

  it('should throw if data missing for update', async () => {
    const service = createAutoResponseService(mockRepository as any);
    await expect(service.updateAutoResponse('ar1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should delete auto response', async () => {
    const service = createAutoResponseService(mockRepository as any);
    await service.deleteAutoResponse('ar1', 'user1');
    expect(mockRepository.deleteAutoResponse).toHaveBeenCalledWith('ar1');
  });

  it('should handle getAutoResponses with filters', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.getAutoResponses.mockResolvedValue([]);
    await service.getAutoResponses('school1', 'user1', { status: 'active' });
    expect(mockRepository.getAutoResponses).toHaveBeenCalledWith('school1', 'user1', { status: 'active' });
  });

  it('should throw if responseId missing for update', async () => {
    const service = createAutoResponseService(mockRepository as any);
    await expect(service.updateAutoResponse('', 'user1', { response: 'X' })).rejects.toThrow('responseId is required');
  });

  it('should throw if responseId missing for delete', async () => {
    const service = createAutoResponseService(mockRepository as any);
    await expect(service.deleteAutoResponse('', 'user1')).rejects.toThrow('responseId is required');
  });

  it('should throw if userId missing for delete', async () => {
    const service = createAutoResponseService(mockRepository as any);
    await expect(service.deleteAutoResponse('ar1', '')).rejects.toThrow('userId is required');
  });

  it('should log event on createAutoResponse', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.createAutoResponse.mockResolvedValue({ id: 'ar1' });
    await service.createAutoResponse('school1', 'user1', { trigger: 'away', response: 'Away' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'auto_response.created', expect.any(Object));
  });

  it('should handle createAutoResponse error', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.createAutoResponse.mockRejectedValue(new Error('fail'));
    await expect(service.createAutoResponse('school1', 'user1', { trigger: 'away', response: 'Away' })).rejects.toThrow('fail');
  });

  it('should handle updateAutoResponse error', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.updateAutoResponse.mockRejectedValue(new Error('fail'));
    await expect(service.updateAutoResponse('ar1', 'user1', { response: 'X' })).rejects.toThrow('fail');
  });

  it('should handle deleteAutoResponse error', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.deleteAutoResponse.mockRejectedValue(new Error('fail'));
    await expect(service.deleteAutoResponse('ar1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle getAutoResponses error', async () => {
    const service = createAutoResponseService(mockRepository as any);
    mockRepository.getAutoResponses.mockRejectedValue(new Error('fail'));
    await expect(service.getAutoResponses('school1', 'user1')).rejects.toThrow('fail');
  });
});
