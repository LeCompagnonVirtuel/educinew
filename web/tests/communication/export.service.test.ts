import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createExportService } from '../../src/features/communication/services/export.service';

const mockRepository = {
  exportConversation: vi.fn(),
  exportDocuments: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('ExportService', () => {
  beforeEach(() => { vi.resetAllMocks(); });

  it('should create ExportService with all methods', () => {
    const service = createExportService(mockRepository as any);
    expect(typeof service.exportConversation).toBe('function');
    expect(typeof service.exportDocuments).toBe('function');
    expect(typeof service.logCommunicationEvent).toBe('function');
  });

  it('should export conversation', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportConversation.mockResolvedValue({ id: 'e1', status: 'pending' });
    const result = await service.exportConversation('c1', 'user1', 'json');
    expect(result.status).toBe('pending');
  });

  it('should export conversation with default format', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportConversation.mockResolvedValue({ id: 'e1', status: 'pending' });
    await service.exportConversation('c1', 'user1');
    expect(mockRepository.exportConversation).toHaveBeenCalledWith('c1', expect.objectContaining({ format: 'json' }));
  });

  it('should throw if conversationId missing', async () => {
    const service = createExportService(mockRepository as any);
    await expect(service.exportConversation('', 'user1')).rejects.toThrow('conversationId is required');
  });

  it('should throw if userId missing for exportConversation', async () => {
    const service = createExportService(mockRepository as any);
    await expect(service.exportConversation('c1', '')).rejects.toThrow('userId is required');
  });

  it('should export documents', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportDocuments.mockResolvedValue({ id: 'e1', status: 'pending' });
    const result = await service.exportDocuments('school1', 'user1', ['d1', 'd2'], 'zip');
    expect(result.status).toBe('pending');
  });

  it('should export documents with default format', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportDocuments.mockResolvedValue({ id: 'e1', status: 'pending' });
    await service.exportDocuments('school1', 'user1', ['d1']);
    expect(mockRepository.exportDocuments).toHaveBeenCalledWith(expect.objectContaining({ format: 'zip' }));
  });

  it('should throw if schoolId missing for exportDocuments', async () => {
    const service = createExportService(mockRepository as any);
    await expect(service.exportDocuments('', 'user1', ['d1'])).rejects.toThrow('schoolId is required');
  });

  it('should throw if documentIds empty for exportDocuments', async () => {
    const service = createExportService(mockRepository as any);
    await expect(service.exportDocuments('school1', 'user1', [])).rejects.toThrow('documentIds are required');
  });

  it('should log communication event directly', async () => {
    const service = createExportService(mockRepository as any);
    await service.logCommunicationEvent('school1', 'custom.event', { key: 'value' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'custom.event', { key: 'value' });
  });

  it('should throw if schoolId missing for logCommunicationEvent', async () => {
    const service = createExportService(mockRepository as any);
    await expect(service.logCommunicationEvent('', 'event', {})).rejects.toThrow('schoolId is required');
  });

  it('should throw if event missing for logCommunicationEvent', async () => {
    const service = createExportService(mockRepository as any);
    await expect(service.logCommunicationEvent('school1', '', {})).rejects.toThrow('event name is required');
  });

  it('should log event on exportConversation', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportConversation.mockResolvedValue({ id: 'e1' });
    await service.exportConversation('c1', 'user1', 'json');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('', 'export.conversation', expect.any(Object));
  });

  it('should log event on exportDocuments', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportDocuments.mockResolvedValue({ id: 'e1' });
    await service.exportDocuments('school1', 'user1', ['d1']);
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'export.documents', expect.any(Object));
  });

  it('should handle exportConversation error', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportConversation.mockRejectedValue(new Error('fail'));
    await expect(service.exportConversation('c1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle exportDocuments error', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportDocuments.mockRejectedValue(new Error('fail'));
    await expect(service.exportDocuments('school1', 'user1', ['d1'])).rejects.toThrow('fail');
  });

  it('should handle logCommunicationEvent error', async () => {
    const service = createExportService(mockRepository as never);
    mockRepository.logCommunicationEvent.mockRejectedValue(new Error('logfail'));
    await expect(service.logCommunicationEvent('school1', 'event', {})).rejects.toThrow();
  });

  it('should export documents with csv format', async () => {
    const service = createExportService(mockRepository as any);
    mockRepository.exportDocuments.mockResolvedValue({ id: 'e1' });
    await service.exportDocuments('school1', 'user1', ['d1'], 'csv');
    expect(mockRepository.exportDocuments).toHaveBeenCalledWith(expect.objectContaining({ format: 'csv' }));
  });

  it('should throw if userId missing for exportDocuments', async () => {
    const service = createExportService(mockRepository as any);
    await expect(service.exportDocuments('school1', '', ['d1'])).rejects.toThrow('userId is required');
  });
});
