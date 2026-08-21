import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createEmailService } from '../../src/features/communication/services/email.service';

const mockRepository = {
  getEmails: vi.fn(),
  getEmail: vi.fn(),
  sendEmail: vi.fn(),
  saveEmailDraft: vi.fn(),
  deleteEmail: vi.fn(),
  getEmailTemplates: vi.fn(),
  createEmailTemplate: vi.fn(),
  updateEmailTemplate: vi.fn(),
  deleteEmailTemplate: vi.fn(),
  sendEmailCampaign: vi.fn(),
  getEmailCampaigns: vi.fn(),
  getEmailSignatures: vi.fn(),
  getEmailStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('EmailService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create EmailService with all methods', () => {
    const service = createEmailService(mockRepository as any);
    expect(typeof service.getEmails).toBe('function');
    expect(typeof service.getEmail).toBe('function');
    expect(typeof service.sendEmail).toBe('function');
    expect(typeof service.saveDraft).toBe('function');
    expect(typeof service.deleteEmail).toBe('function');
    expect(typeof service.getEmailTemplates).toBe('function');
    expect(typeof service.createEmailTemplate).toBe('function');
    expect(typeof service.updateEmailTemplate).toBe('function');
    expect(typeof service.deleteEmailTemplate).toBe('function');
    expect(typeof service.sendCampaign).toBe('function');
    expect(typeof service.getEmailCampaigns).toBe('function');
    expect(typeof service.getEmailSignatures).toBe('function');
    expect(typeof service.getEmailStats).toBe('function');
  });

  it('should fetch emails', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmails.mockResolvedValue([{ id: 'e1' }]);
    const result = await service.getEmails('school1', 'user1');
    expect(result).toEqual([{ id: 'e1' }]);
  });

  it('should throw if schoolId missing for getEmails', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.getEmails('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should throw if userId missing for getEmails', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.getEmails('school1', '')).rejects.toThrow('userId is required');
  });

  it('should fetch a single email', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmail.mockResolvedValue({ id: 'e1', subject: 'Hi' });
    const result = await service.getEmail('e1', 'user1');
    expect(result).toEqual({ id: 'e1', subject: 'Hi' });
  });

  it('should throw if email not found', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmail.mockResolvedValue(null);
    await expect(service.getEmail('e1', 'user1')).rejects.toThrow();
  });

  it('should send an email', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.sendEmail.mockResolvedValue({ id: 'e1', status: 'sent' });
    const result = await service.sendEmail('school1', 'user1', { to: 'a@b.com', subject: 'Test', body: 'Hello' });
    expect(result.status).toBe('sent');
  });

  it('should throw if to missing for sendEmail', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.sendEmail('school1', 'user1', { subject: 'Test' })).rejects.toThrow('recipient is required');
  });

  it('should throw if subject missing for sendEmail', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.sendEmail('school1', 'user1', { to: 'a@b.com' })).rejects.toThrow('subject is required');
  });

  it('should save a draft', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.saveEmailDraft.mockResolvedValue({ id: 'e1', status: 'draft' });
    const result = await service.saveDraft('school1', 'user1', { subject: 'Draft' });
    expect(result.status).toBe('draft');
  });

  it('should delete an email', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmail.mockResolvedValue({ id: 'e1', schoolId: 'school1' });
    await service.deleteEmail('e1', 'user1');
    expect(mockRepository.deleteEmail).toHaveBeenCalledWith('e1');
  });

  it('should throw if email not found for delete', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmail.mockResolvedValue(null);
    await expect(service.deleteEmail('e1', 'user1')).rejects.toThrow();
  });

  it('should fetch email templates', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmailTemplates.mockResolvedValue([{ id: 't1' }]);
    const result = await service.getEmailTemplates('school1', 'user1');
    expect(result).toEqual([{ id: 't1' }]);
  });

  it('should create email template', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.createEmailTemplate.mockResolvedValue({ id: 't1', name: 'Welcome' });
    const result = await service.createEmailTemplate('school1', 'user1', { name: 'Welcome', body: 'Hi' });
    expect(result.name).toBe('Welcome');
  });

  it('should throw if name missing for createEmailTemplate', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.createEmailTemplate('school1', 'user1', {})).rejects.toThrow('template name is required');
  });

  it('should update email template', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.updateEmailTemplate.mockResolvedValue({ id: 't1', name: 'Updated' });
    const result = await service.updateEmailTemplate('t1', 'user1', { name: 'Updated' });
    expect(result.name).toBe('Updated');
  });

  it('should throw if data missing for updateEmailTemplate', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.updateEmailTemplate('t1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should delete email template', async () => {
    const service = createEmailService(mockRepository as any);
    await service.deleteEmailTemplate('t1', 'user1');
    expect(mockRepository.deleteEmailTemplate).toHaveBeenCalledWith('t1');
  });

  it('should send campaign', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.sendEmailCampaign.mockResolvedValue({ id: 'c1', status: 'sending' });
    const result = await service.sendCampaign('school1', 'user1', { name: 'Newsletter', recipients: ['a@b.com'] });
    expect(result.status).toBe('sending');
  });

  it('should throw if name missing for sendCampaign', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.sendCampaign('school1', 'user1', { recipients: ['a@b.com'] })).rejects.toThrow('campaign name is required');
  });

  it('should throw if recipients empty for sendCampaign', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.sendCampaign('school1', 'user1', { name: 'Test', recipients: [] })).rejects.toThrow('recipients are required');
  });

  it('should fetch email campaigns', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmailCampaigns.mockResolvedValue([{ id: 'c1' }]);
    const result = await service.getEmailCampaigns('school1', 'user1');
    expect(result).toEqual([{ id: 'c1' }]);
  });

  it('should fetch email signatures', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmailSignatures.mockResolvedValue([{ id: 's1' }]);
    const result = await service.getEmailSignatures('school1', 'user1');
    expect(result).toEqual([{ id: 's1' }]);
  });

  it('should fetch email stats', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmailStats.mockResolvedValue({ sent: 100 });
    const result = await service.getEmailStats('school1');
    expect(result).toEqual({ sent: 100 });
  });

  it('should throw if schoolId missing for getEmailStats', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.getEmailStats('')).rejects.toThrow('schoolId is required');
  });

  it('should throw if emailId missing for getEmail', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.getEmail('', 'user1')).rejects.toThrow('emailId is required');
  });

  it('should throw if emailId missing for deleteEmail', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.deleteEmail('', 'user1')).rejects.toThrow('emailId is required');
  });

  it('should throw if templateId missing for updateEmailTemplate', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.updateEmailTemplate('', 'user1', { name: 'x' })).rejects.toThrow('templateId is required');
  });

  it('should throw if templateId missing for deleteEmailTemplate', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.deleteEmailTemplate('', 'user1')).rejects.toThrow('templateId is required');
  });

  it('should handle getEmails with filters', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmails.mockResolvedValue([]);
    await service.getEmails('school1', 'user1', { unread: true });
    expect(mockRepository.getEmails).toHaveBeenCalledWith('school1', 'user1', { unread: true });
  });

  it('should handle getEmailTemplates with filters', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmailTemplates.mockResolvedValue([]);
    await service.getEmailTemplates('school1', 'user1', { limit: 5 });
    expect(mockRepository.getEmailTemplates).toHaveBeenCalledWith('school1', { limit: 5 });
  });

  it('should handle getEmailCampaigns with filters', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmailCampaigns.mockResolvedValue([]);
    await service.getEmailCampaigns('school1', 'user1', { status: 'sent' });
    expect(mockRepository.getEmailCampaigns).toHaveBeenCalledWith('school1', { status: 'sent' });
  });

  it('should handle getEmailStats with date range', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmailStats.mockResolvedValue({ sent: 50 });
    await service.getEmailStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getEmailStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should handle sendEmail error', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.sendEmail.mockRejectedValue(new Error('fail'));
    await expect(service.sendEmail('school1', 'user1', { to: 'a@b.com', subject: 'T' })).rejects.toThrow('fail');
  });

  it('should handle saveDraft error', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.saveEmailDraft.mockRejectedValue(new Error('fail'));
    await expect(service.saveDraft('school1', 'user1', { subject: 'T' })).rejects.toThrow('fail');
  });

  it('should handle deleteEmail error', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmail.mockResolvedValue({ id: 'e1', schoolId: 'school1' });
    mockRepository.deleteEmail.mockRejectedValue(new Error('fail'));
    await expect(service.deleteEmail('e1', 'user1')).rejects.toThrow('fail');
  });

  it('should handle sendCampaign error', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.sendEmailCampaign.mockRejectedValue(new Error('fail'));
    await expect(service.sendCampaign('school1', 'user1', { name: 'C', recipients: ['a@b.com'] })).rejects.toThrow('fail');
  });

  it('should log event on sendEmail', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.sendEmail.mockResolvedValue({ id: 'e1' });
    await service.sendEmail('school1', 'user1', { to: 'a@b.com', subject: 'T' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'email.sent', expect.any(Object));
  });

  it('should handle deleteEmail error', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.getEmail.mockResolvedValue({ id: 'e1', schoolId: 'school1' });
    mockRepository.deleteEmail.mockRejectedValue(new Error('fail'));
    await expect(service.deleteEmail('e1', 'user1')).rejects.toThrow();
  });

  it('should log event on createEmailTemplate', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.createEmailTemplate.mockResolvedValue({ id: 't1' });
    await service.createEmailTemplate('school1', 'user1', { name: 'T' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'email_template.created', expect.any(Object));
  });

  it('should log event on sendCampaign', async () => {
    const service = createEmailService(mockRepository as any);
    mockRepository.sendEmailCampaign.mockResolvedValue({ id: 'c1' });
    await service.sendCampaign('school1', 'user1', { name: 'C', recipients: ['a@b.com'] });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'email_campaign.sent', expect.any(Object));
  });

  it('should throw if userId missing for saveDraft', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.saveDraft('school1', '', { subject: 'T' })).rejects.toThrow('userId is required');
  });

  it('should throw if userId missing for deleteEmail', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.deleteEmail('e1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if userId missing for createEmailTemplate', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.createEmailTemplate('school1', '', { name: 'T' })).rejects.toThrow('userId is required');
  });

  it('should throw if userId missing for deleteEmailTemplate', async () => {
    const service = createEmailService(mockRepository as any);
    await expect(service.deleteEmailTemplate('t1', '')).rejects.toThrow('userId is required');
  });
});
