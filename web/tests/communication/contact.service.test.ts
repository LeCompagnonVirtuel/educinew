import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createContactService } from '../../src/features/communication/services/contact.service';

const mockRepository = {
  getContacts: vi.fn(),
  getContact: vi.fn(),
  createContact: vi.fn(),
  updateContact: vi.fn(),
  deleteContact: vi.fn(),
  getContactGroups: vi.fn(),
  getContactStats: vi.fn(),
  logCommunicationEvent: vi.fn(),
};

describe('ContactService', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should create ContactService with all methods', () => {
    const service = createContactService(mockRepository as any);
    expect(typeof service.getContacts).toBe('function');
    expect(typeof service.getContact).toBe('function');
    expect(typeof service.createContact).toBe('function');
    expect(typeof service.updateContact).toBe('function');
    expect(typeof service.deleteContact).toBe('function');
    expect(typeof service.getContactGroups).toBe('function');
    expect(typeof service.getContactStats).toBe('function');
  });

  it('should fetch contacts', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContacts.mockResolvedValue([{ id: 'c1' }]);
    const result = await service.getContacts('school1', 'user1');
    expect(result).toEqual([{ id: 'c1' }]);
  });

  it('should throw if schoolId missing', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.getContacts('', 'user1')).rejects.toThrow('schoolId is required');
  });

  it('should fetch a contact', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContact.mockResolvedValue({ id: 'c1', name: 'John' });
    const result = await service.getContact('c1', 'user1');
    expect(result).toEqual({ id: 'c1', name: 'John' });
  });

  it('should throw if contact not found', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContact.mockResolvedValue(null);
    await expect(service.getContact('c1', 'user1')).rejects.toThrow('Contact not found');
  });

  it('should create a contact', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.createContact.mockResolvedValue({ id: 'c1', name: 'Jane' });
    const result = await service.createContact('school1', 'user1', { name: 'Jane' });
    expect(result.name).toBe('Jane');
  });

  it('should throw if name missing for createContact', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.createContact('school1', 'user1', {})).rejects.toThrow('contact name is required');
  });

  it('should update a contact', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContact.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    mockRepository.updateContact.mockResolvedValue({ id: 'c1', name: 'Updated' });
    const result = await service.updateContact('c1', 'user1', { name: 'Updated' });
    expect(result.name).toBe('Updated');
  });

  it('should throw if contact not found for update', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContact.mockResolvedValue(null);
    await expect(service.updateContact('c1', 'user1', { name: 'X' })).rejects.toThrow('Contact not found');
  });

  it('should throw if data missing for updateContact', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.updateContact('c1', 'user1', undefined)).rejects.toThrow('update data is required');
  });

  it('should delete a contact', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContact.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    await service.deleteContact('c1', 'user1');
    expect(mockRepository.deleteContact).toHaveBeenCalledWith('c1');
  });

  it('should throw if contact not found for delete', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContact.mockResolvedValue(null);
    await expect(service.deleteContact('c1', 'user1')).rejects.toThrow('Contact not found');
  });

  it('should get contact groups', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContactGroups.mockResolvedValue([{ id: 'g1' }]);
    const result = await service.getContactGroups('school1', 'user1');
    expect(result).toEqual([{ id: 'g1' }]);
  });

  it('should get contact stats', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContactStats.mockResolvedValue({ total: 25 });
    const result = await service.getContactStats('school1');
    expect(result).toEqual({ total: 25 });
  });

  it('should throw if schoolId missing for getContactStats', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.getContactStats('')).rejects.toThrow('schoolId is required');
  });

  it('should handle getContacts with filters', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContacts.mockResolvedValue([]);
    await service.getContacts('school1', 'user1', { group: 'teachers' });
    expect(mockRepository.getContacts).toHaveBeenCalledWith('school1', 'user1', { group: 'teachers' });
  });

  it('should handle getContactStats with date range', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContactStats.mockResolvedValue({ total: 10 });
    await service.getContactStats('school1', '2024-01-01', '2024-12-31');
    expect(mockRepository.getContactStats).toHaveBeenCalledWith('school1', '2024-01-01', '2024-12-31');
  });

  it('should log event on createContact', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.createContact.mockResolvedValue({ id: 'c1' });
    await service.createContact('school1', 'user1', { name: 'C' });
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'contact.created', expect.any(Object));
  });

  it('should log event on deleteContact', async () => {
    const service = createContactService(mockRepository as any);
    mockRepository.getContact.mockResolvedValue({ id: 'c1', schoolId: 'school1' });
    await service.deleteContact('c1', 'user1');
    expect(mockRepository.logCommunicationEvent).toHaveBeenCalledWith('school1', 'contact.deleted', expect.any(Object));
  });

  it('should throw if contactId missing for getContact', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.getContact('', 'user1')).rejects.toThrow('contactId is required');
  });

  it('should throw if contactId missing for updateContact', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.updateContact('', 'user1', { name: 'X' })).rejects.toThrow('contactId is required');
  });

  it('should throw if contactId missing for deleteContact', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.deleteContact('', 'user1')).rejects.toThrow('contactId is required');
  });

  it('should throw if userId missing for getContacts', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.getContacts('school1', '')).rejects.toThrow('userId is required');
  });

  it('should throw if userId missing for createContact', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.createContact('school1', '', { name: 'C' })).rejects.toThrow('userId is required');
  });

  it('should throw if userId missing for deleteContact', async () => {
    const service = createContactService(mockRepository as any);
    await expect(service.deleteContact('c1', '')).rejects.toThrow('userId is required');
  });
});
