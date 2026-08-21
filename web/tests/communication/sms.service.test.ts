import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSmsService } from '../../src/features/communication/services/sms.service';

const mockRepository = {
  getSmsMessages: vi.fn(),
  sendSms: vi.fn(),
  sendBulkSms: vi.fn(),
  getSmsTemplates: vi.fn(),
  createSmsTemplate: vi.fn(),
  deleteSmsTemplate: vi.fn(),
  getSmsStats: vi.fn(),
  getSmsBulk: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('SmsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create SmsService with all methods', () => {
    const service = createSmsService(mockRepository as any);
    expect(typeof service.getSmsMessages).toBe('function');
    expect(typeof service.sendSms).toBe('function');
    expect(typeof service.sendBulkSms).toBe('function');
    expect(typeof service.getSmsTemplates).toBe('function');
    expect(typeof service.createSmsTemplate).toBe('function');
    expect(typeof service.deleteSmsTemplate).toBe('function');
    expect(typeof service.getSmsStats).toBe('function');
    expect(typeof service.getSmsBulk).toBe('function');
  });

  it('should fetch SMS messages', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.getSmsMessages.mockResolvedValue([{ id: 's1' }]);
    const result = await service.getSmsMessages('school1', 'user1');
    expect(result).toEqual([{ id: 's1' }]);
  });

  it('should throw if schoolId missing for getSmsMessages', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.getSmsMessages('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should send an SMS', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.sendSms.mockResolvedValue({ id: 's1', status: 'sent' });
    const result = await service.sendSms('school1', 'user1', { to: '+1234567890', message: 'Hello' });
    expect(result.status).toBe('sent');
  });

  it('should throw if to missing for sendSms', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.sendSms('school1', 'user1', { message: 'Hi' })).rejects.toThrow('recipient phone number is required');
  });

  it('should throw if message missing for sendSms', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.sendSms('school1', 'user1', { to: '+123' })).rejects.toThrow('message content is required');
  });

  it('should send bulk SMS', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.sendBulkSms.mockResolvedValue({ id: 'b1', status: 'sending' });
    const result = await service.sendBulkSms('school1', 'user1', { recipients: ['+123', '+456'], message: 'Hi' });
    expect(result.status).toBe('sending');
  });

  it('should throw if recipients empty for sendBulkSms', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.sendBulkSms('school1', 'user1', { recipients: [], message: 'Hi' })).rejects.toThrow('recipients are required');
  });

  it('should throw if message missing for sendBulkSms', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.sendBulkSms('school1', 'user1', { recipients: ['+123'] })).rejects.toThrow('message content is required');
  });

  it('should fetch SMS templates', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.getSmsTemplates.mockResolvedValue([{ id: 't1' }]);
    const result = await service.getSmsTemplates('school1', 'user1');
    expect(result).toEqual([{ id: 't1' }]);
  });

  it('should create SMS template', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.createSmsTemplate.mockResolvedValue({ id: 't1', name: 'Welcome' });
    const result = await service.createSmsTemplate('school1', 'user1', { name: 'Welcome', content: 'Hi' });
    expect(result.name).toBe('Welcome');
  });

  it('should throw if name missing for createSmsTemplate', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.createSmsTemplate('school1', 'user1', {})).rejects.toThrow('template name is required');
  });

  it('should throw if content missing for createSmsTemplate', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.createSmsTemplate('school1', 'user1', { name: 'T' })).rejects.toThrow('template content is required');
  });

  it('should delete SMS template', async () => {
    const service = createSmsService(mockRepository as any);
    await service.deleteSmsTemplate('t1', 'user1');
    expect(mockRepository.deleteSmsTemplate).toHaveBeenCalledWith('t1');
  });

  it('should get SMS stats', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.getSmsStats.mockResolvedValue({ sent: 50 });
    const result = await service.getSmsStats('school1');
    expect(result).toEqual({ sent: 50 });
  });

  it('should throw if schoolId missing for getSmsStats', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.getSmsStats('')).rejects.toThrow('schoolId is required');
  });

  it('should get SMS bulk', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.getSmsBulk.mockResolvedValue({ id: 'b1', status: 'sending' });
    const result = await service.getSmsBulk('school1', 'user1', 'b1');
    expect(result).toEqual({ id: 'b1', status: 'sending' });
  });

  it('should throw if bulkId missing for getSmsBulk', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.getSmsBulk('school1', 'user1', '')).rejects.toThrow('bulkId is required');
  });

  it('should throw if bulk not found for getSmsBulk', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.getSmsBulk.mockResolvedValue(null);
    await expect(service.getSmsBulk('school1', 'user1', 'b1')).rejects.toThrow();
  });

  it('should throw if templateId missing for deleteSmsTemplate', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.deleteSmsTemplate('', 'user1')).rejects.toThrow('templateId is required');
  });

  it('should throw if userId missing for deleteSmsTemplate', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.deleteSmsTemplate('t1', '')).rejects.toThrow('userId is required');
  });

  it('should handle getSmsMessages with filters', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.getSmsMessages.mockResolvedValue([]);
    await service.getSmsMessages('school1', 'user1', { limit: 10 });
    expect(mockRepository.getSmsMessages).toHaveBeenCalledWith('school1', 'user1', { limit: 10 });
  });

  it('should handle getSmsTemplates with filters', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.getSmsTemplates.mockResolvedValue([]);
    await service.getSmsTemplates('school1', 'user1', { limit: 5 });
    expect(mockRepository.getSmsTemplates).toHaveBeenCalledWith('school1', { limit: 5 });
  });

  it('should handle getSmsStats with date range', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.getSmsStats.mockResolvedValue({ sent: 20 });
    await service.getSmsStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getSmsStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on sendSms', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.sendSms.mockResolvedValue({ id: 's1' });
    await service.sendSms('school1', 'user1', { to: '+123', message: 'Hi' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'sms.sent', expect.any(Object));
  });

  it('should log event on sendBulkSms', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.sendBulkSms.mockResolvedValue({ id: 'b1' });
    await service.sendBulkSms('school1', 'user1', { recipients: ['+123'], message: 'Hi' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'sms_bulk.created', expect.any(Object));
  });

  it('should log event on createSmsTemplate', async () => {
    const service = createSmsService(mockRepository as any);
    mockRepository.createSmsTemplate.mockResolvedValue({ id: 't1' });
    await service.createSmsTemplate('school1', 'user1', { name: 'T', content: 'Hi' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'sms_template.created', expect.any(Object));
  });

  it('should throw if userId missing for sendSms', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.sendSms('school1', '', { to: '+123', message: 'Hi' })).rejects.toThrow('userId is required');
  });

  it('should throw if userId missing for sendBulkSms', async () => {
    const service = createSmsService(mockRepository as any);
    await expect(service.sendBulkSms('school1', '', { recipients: ['+123'], message: 'Hi' })).rejects.toThrow('userId is required');
  });
});
