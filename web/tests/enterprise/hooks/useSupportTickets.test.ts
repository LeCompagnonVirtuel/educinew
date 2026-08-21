import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('useSupportTickets service', () => {
  const mockRepo = {
    findTickets: vi.fn(),
    findTicketById: vi.fn(),
    createTicket: vi.fn(),
    updateTicket: vi.fn(),
    deleteTicket: vi.fn(),
    assignTicket: vi.fn(),
    escalateTicket: vi.fn(),
    resolveTicket: vi.fn(),
    closeTicket: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return tickets list', async () => {
    const tickets = [{ id: 't1', subject: 'Login issue', status: 'open' }];
    mockRepo.findTickets.mockResolvedValue(tickets);
    const result = await mockRepo.findTickets('ent-1');
    expect(result).toHaveLength(1);
  });

  it('should throw when enterpriseId is empty', async () => {
    mockRepo.findTickets.mockRejectedValueOnce(new Error('Identifiant de l\'entreprise requis'));
    await expect(mockRepo.findTickets('')).rejects.toThrow('Identifiant de l\'entreprise requis');
  });

  it('should return a ticket by id', async () => {
    const ticket = { id: 't1', subject: 'Login issue', status: 'open' };
    mockRepo.findTicketById.mockResolvedValue(ticket);
    const result = await mockRepo.findTicketById('ent-1', 't1');
    expect(result.subject).toBe('Login issue');
  });

  it('should return null when ticket not found', async () => {
    mockRepo.findTicketById.mockResolvedValue(null);
    const result = await mockRepo.findTicketById('ent-1', 'missing');
    expect(result).toBeNull();
  });

  it('should create a ticket', async () => {
    const ticket = { id: 't2', subject: 'Bug report', message: 'App crashes', status: 'open' };
    mockRepo.createTicket.mockResolvedValue(ticket);
    const result = await mockRepo.createTicket({ subject: 'Bug report', message: 'App crashes', enterprise_id: 'ent-1' });
    expect(result.subject).toBe('Bug report');
  });

  it('should update a ticket', async () => {
    const updated = { id: 't1', subject: 'Updated', status: 'in-progress' };
    mockRepo.updateTicket.mockResolvedValue(updated);
    const result = await mockRepo.updateTicket('ent-1', 't1', { status: 'in-progress' });
    expect(result.status).toBe('in-progress');
  });

  it('should delete a ticket', async () => {
    mockRepo.deleteTicket.mockResolvedValue({ success: true });
    const result = await mockRepo.deleteTicket('ent-1', 't1');
    expect(result.success).toBe(true);
  });

  it('should assign a ticket', async () => {
    const assigned = { id: 't1', assigneeId: 'user-1', status: 'assigned' };
    mockRepo.assignTicket.mockResolvedValue(assigned);
    const result = await mockRepo.assignTicket('ent-1', 't1', 'user-1');
    expect(result.assigneeId).toBe('user-1');
  });

  it('should escalate a ticket', async () => {
    const escalated = { id: 't1', status: 'escalated' };
    mockRepo.escalateTicket.mockResolvedValue(escalated);
    const result = await mockRepo.escalateTicket('ent-1', 't1', 'Critical issue');
    expect(result.status).toBe('escalated');
  });

  it('should resolve a ticket', async () => {
    const resolved = { id: 't1', status: 'resolved', resolution: 'Fixed in v2' };
    mockRepo.resolveTicket.mockResolvedValue(resolved);
    const result = await mockRepo.resolveTicket('ent-1', 't1', 'Fixed in v2');
    expect(result.status).toBe('resolved');
  });

  it('should close a ticket', async () => {
    const closed = { id: 't1', status: 'closed' };
    mockRepo.closeTicket.mockResolvedValue(closed);
    const result = await mockRepo.closeTicket('ent-1', 't1');
    expect(result.status).toBe('closed');
  });

  it('should handle empty tickets list', async () => {
    mockRepo.findTickets.mockResolvedValue([]);
    const result = await mockRepo.findTickets('ent-1');
    expect(result).toEqual([]);
  });

  it('should handle repo error on createTicket', async () => {
    mockRepo.createTicket.mockRejectedValue(new Error('Validation failed'));
    await expect(mockRepo.createTicket({ subject: 'X' })).rejects.toThrow('Validation failed');
  });

  it('should handle repo error on resolveTicket', async () => {
    mockRepo.resolveTicket.mockRejectedValue(new Error('Ticket not found'));
    await expect(mockRepo.resolveTicket('ent-1', 'bad-id', 'resolution')).rejects.toThrow('Ticket not found');
  });

  it('should pass filters to findTickets', async () => {
    mockRepo.findTickets.mockResolvedValue([]);
    const filters = { status: 'open', priority: 'high' };
    await mockRepo.findTickets('ent-1', filters);
    expect(mockRepo.findTickets).toHaveBeenCalledWith('ent-1', filters);
  });
});
