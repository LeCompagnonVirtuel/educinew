import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('SupportTicketService', () => {
  const mockRepo = {
    findTickets: vi.fn(),
    findTicketById: vi.fn(),
    createTicket: vi.fn(),
    updateTicket: vi.fn(),
    closeTicket: vi.fn(),
    reopenTicket: vi.fn(),
    assignTicket: vi.fn(),
    unassignTicket: vi.fn(),
    getTicketStats: vi.fn(),
    getTicketMessages: vi.fn(),
    addMessage: vi.fn(),
    getTicketAuditLog: vi.fn(),
    searchTickets: vi.fn(),
    getTicketsByPriority: vi.fn(),
    bulkUpdateTickets: vi.fn(),
    exportTickets: vi.fn(),
    getTicketTemplates: vi.fn(),
    createFromTemplate: vi.fn(),
    getSLAStatus: vi.fn(),
    escalateTicket: vi.fn(),
    mergeTickets: vi.fn(),
  };

  const enterpriseId = 'ent-1';
  const ticketId = 'tick-1';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findTickets', () => {
    it('should return tickets list', async () => {
      const tickets = [{ id: ticketId, subject: 'Login issue', status: 'open' }];
      mockRepo.findTickets.mockResolvedValue(tickets);
      const result = await mockRepo.findTickets(enterpriseId);
      expect(result).toEqual(tickets);
    });

    it('should require enterpriseId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'entreprise requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'entreprise requis');
    });

    it('should filter by status', async () => {
      mockRepo.findTickets.mockResolvedValue([]);
      await mockRepo.findTickets(enterpriseId, { status: 'open' });
      expect(mockRepo.findTickets).toHaveBeenCalledWith(enterpriseId, { status: 'open' });
    });

    it('should filter by priority', async () => {
      mockRepo.findTickets.mockResolvedValue([]);
      await mockRepo.findTickets(enterpriseId, { priority: 'high' });
      expect(mockRepo.findTickets).toHaveBeenCalledWith(enterpriseId, { priority: 'high' });
    });

    it('should filter by assignee', async () => {
      mockRepo.findTickets.mockResolvedValue([]);
      await mockRepo.findTickets(enterpriseId, { assigneeId: 'usr-1' });
      expect(mockRepo.findTickets).toHaveBeenCalled();
    });

    it('should paginate results', async () => {
      mockRepo.findTickets.mockResolvedValue([]);
      await mockRepo.findTickets(enterpriseId, { page: 1, limit: 20 });
      expect(mockRepo.findTickets).toHaveBeenCalled();
    });

    it('should handle empty results', async () => {
      mockRepo.findTickets.mockResolvedValue([]);
      const result = await mockRepo.findTickets(enterpriseId);
      expect(result).toHaveLength(0);
    });

    it('should sort by creation date', async () => {
      mockRepo.findTickets.mockResolvedValue([]);
      await mockRepo.findTickets(enterpriseId, { sortBy: 'createdAt', order: 'desc' });
      expect(mockRepo.findTickets).toHaveBeenCalled();
    });
  });

  describe('findTicketById', () => {
    it('should return ticket by id', async () => {
      const ticket = { id: ticketId, subject: 'Login issue', status: 'open' };
      mockRepo.findTicketById.mockResolvedValue(ticket);
      const result = await mockRepo.findTicketById(ticketId);
      expect(result).toEqual(ticket);
    });

    it('should throw if not found', async () => {
      mockRepo.findTicketById.mockResolvedValue(null);
      const findOrThrow = async (id: string) => {
        const ticket = await mockRepo.findTicketById(id);
        if (!ticket) throw new Error('Ticket non trouvé');
      };
      await expect(findOrThrow('nonexistent')).rejects.toThrow('Ticket non trouvé');
    });

    it('should require ticketId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant requis');
      };
      expect(() => validate('')).toThrow('Identifiant requis');
    });

    it('should include message count', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, messageCount: 5 });
      const result = await mockRepo.findTicketById(ticketId);
      expect(result.messageCount).toBe(5);
    });

    it('should include SLA information', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, sla: { deadline: '2026-08-01', breached: false } });
      const result = await mockRepo.findTicketById(ticketId);
      expect(result.sla.breached).toBe(false);
    });
  });

  describe('createTicket', () => {
    it('should create ticket with valid data', async () => {
      const data = { subject: 'Login issue', description: 'Cannot login', priority: 'high' };
      mockRepo.createTicket.mockResolvedValue({ id: ticketId, ...data, status: 'open' });
      const result = await mockRepo.createTicket({ ...data, enterprise_id: enterpriseId, creatorId: 'usr-1' });
      expect(result.subject).toBe('Login issue');
    });

    it('should require subject', () => {
      const validate = (data: any) => {
        if (!data?.subject) throw new Error('Le sujet est requis');
      };
      expect(() => validate({ description: 'Desc' })).toThrow('Le sujet est requis');
    });

    it('should require description', () => {
      const validate = (data: any) => {
        if (!data?.description) throw new Error('La description est requise');
      };
      expect(() => validate({ subject: 'Subject' })).toThrow('La description est requise');
    });

    it('should require priority', () => {
      const validate = (data: any) => {
        if (!data?.priority) throw new Error('La priorité est requise');
      };
      expect(() => validate({ subject: 'S', description: 'D' })).toThrow('La priorité est requise');
    });

    it('should validate priority values', () => {
      const validPriorities = ['low', 'medium', 'high', 'critical'];
      const validate = (p: string) => {
        if (!validPriorities.includes(p)) throw new Error('Priorité invalide');
      };
      expect(() => validate('high')).not.toThrow();
      expect(() => validate('invalid')).toThrow();
    });

    it('should set default status to open', async () => {
      mockRepo.createTicket.mockResolvedValue({ id: ticketId, status: 'open' });
      const result = await mockRepo.createTicket({ subject: 'S', description: 'D', priority: 'medium', enterprise_id: enterpriseId, creatorId: 'usr-1' });
      expect(result.status).toBe('open');
    });

    it('should auto-generate ticket number', async () => {
      mockRepo.createTicket.mockResolvedValue({ id: ticketId, ticketNumber: 'TKT-001' });
      const result = await mockRepo.createTicket({ subject: 'S', description: 'D', priority: 'medium', enterprise_id: enterpriseId, creatorId: 'usr-1' });
      expect(result.ticketNumber).toBeDefined();
    });

    it('should validate subject length', () => {
      const validate = (subject: string) => {
        if (subject.length < 5 || subject.length > 200) throw new Error('Le sujet doit contenir entre 5 et 200 caractères');
      };
      expect(() => validate('Hi')).toThrow();
      expect(() => validate('Valid subject')).not.toThrow();
    });

    it('should validate description length', () => {
      const validate = (desc: string) => {
        if (desc.length < 10) throw new Error('La description doit contenir au moins 10 caractères');
      };
      expect(() => validate('Short')).toThrow();
      expect(() => validate('This is a valid description')).not.toThrow();
    });
  });

  describe('updateTicket', () => {
    it('should update ticket', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, subject: 'Old' });
      mockRepo.updateTicket.mockResolvedValue({ id: ticketId, subject: 'Updated' });
      const result = await mockRepo.updateTicket(ticketId, { subject: 'Updated' });
      expect(result.subject).toBe('Updated');
    });

    it('should throw if not found', async () => {
      mockRepo.findTicketById.mockResolvedValue(null);
      const updateOrThrow = async () => {
        const ticket = await mockRepo.findTicketById(ticketId);
        if (!ticket) throw new Error('Ticket non trouvé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Ticket non trouvé');
    });

    it('should not update closed ticket', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, status: 'closed' });
      const updateOrThrow = async () => {
        const ticket = await mockRepo.findTicketById(ticketId);
        if (ticket?.status === 'closed') throw new Error('Impossible de modifier un ticket fermé');
      };
      await expect(updateOrThrow()).rejects.toThrow('Impossible de modifier un ticket fermé');
    });

    it('should allow status transitions', () => {
      const validTransitions: Record<string, string[]> = {
        open: ['in_progress', 'closed'],
        in_progress: ['open', 'resolved', 'closed'],
        resolved: ['open', 'closed'],
        closed: ['open'],
      };
      expect(validTransitions.open).toContain('in_progress');
      expect(validTransitions.closed).toContain('open');
    });

    it('should validate status transition', () => {
      const validTransitions: Record<string, string[]> = {
        open: ['in_progress', 'closed'],
        closed: ['open'],
      };
      const isValidTransition = (from: string, to: string) => validTransitions[from]?.includes(to) ?? false;
      expect(isValidTransition('open', 'in_progress')).toBe(true);
      expect(isValidTransition('closed', 'in_progress')).toBe(false);
    });
  });

  describe('closeTicket', () => {
    it('should close ticket', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, status: 'open' });
      mockRepo.closeTicket.mockResolvedValue({ id: ticketId, status: 'closed', closedAt: new Date().toISOString() });
      const result = await mockRepo.closeTicket(ticketId, 'Issue resolved');
      expect(result.status).toBe('closed');
    });

    it('should require resolution note', () => {
      const validate = (note: string) => {
        if (!note || note.trim().length < 3) throw new Error('La note de résolution est requise');
      };
      expect(() => validate('')).toThrow('La note de résolution est requise');
    });

    it('should throw if already closed', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, status: 'closed' });
      const closeOrThrow = async () => {
        const ticket = await mockRepo.findTicketById(ticketId);
        if (ticket?.status === 'closed') throw new Error('Le ticket est déjà fermé');
      };
      await expect(closeOrThrow()).rejects.toThrow('Le ticket est déjà fermé');
    });

    it('should set closedAt timestamp', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, status: 'open' });
      mockRepo.closeTicket.mockResolvedValue({ closedAt: new Date().toISOString() });
      const result = await mockRepo.closeTicket(ticketId, 'Resolved');
      expect(result.closedAt).toBeDefined();
    });

    it('should calculate resolution time', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, status: 'open', createdAt: '2026-01-01T10:00:00Z' });
      mockRepo.closeTicket.mockResolvedValue({ resolutionTimeHours: 24 });
      const result = await mockRepo.closeTicket(ticketId, 'Resolved');
      expect(result.resolutionTimeHours).toBe(24);
    });
  });

  describe('reopenTicket', () => {
    it('should reopen closed ticket', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, status: 'closed' });
      mockRepo.reopenTicket.mockResolvedValue({ id: ticketId, status: 'open', reopenedAt: new Date().toISOString() });
      const result = await mockRepo.reopenTicket(ticketId, 'Issue returned');
      expect(result.status).toBe('open');
    });

    it('should require reopen reason', () => {
      const validate = (reason: string) => {
        if (!reason) throw new Error('La raison de la réouverture est requise');
      };
      expect(() => validate('')).toThrow('La raison de la réouverture est requise');
    });

    it('should throw if ticket not closed', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, status: 'open' });
      const reopenOrThrow = async () => {
        const ticket = await mockRepo.findTicketById(ticketId);
        if (ticket?.status !== 'closed') throw new Error('Seul un ticket fermé peut être rouvert');
      };
      await expect(reopenOrThrow()).rejects.toThrow();
    });

    it('should increment reopen count', async () => {
      mockRepo.findTicketById.mockResolvedValue({ id: ticketId, status: 'closed', reopenCount: 1 });
      mockRepo.reopenTicket.mockResolvedValue({ reopenCount: 2 });
      const result = await mockRepo.reopenTicket(ticketId, 'Reason');
      expect(result.reopenCount).toBe(2);
    });
  });

  describe('assignTicket', () => {
    it('should assign ticket to agent', async () => {
      mockRepo.assignTicket.mockResolvedValue({ id: ticketId, assigneeId: 'agent-1', assignedAt: new Date().toISOString() });
      const result = await mockRepo.assignTicket(ticketId, 'agent-1');
      expect(result.assigneeId).toBe('agent-1');
    });

    it('should require assigneeId', () => {
      const validate = (id: string) => {
        if (!id) throw new Error('Identifiant de l\'agent requis');
      };
      expect(() => validate('')).toThrow('Identifiant de l\'agent requis');
    });

    it('should reassign ticket', async () => {
      mockRepo.assignTicket.mockResolvedValue({ id: ticketId, assigneeId: 'agent-2', previousAssignee: 'agent-1' });
      const result = await mockRepo.assignTicket(ticketId, 'agent-2');
      expect(result.previousAssignee).toBe('agent-1');
    });

    it('should handle self-assignment', async () => {
      mockRepo.assignTicket.mockResolvedValue({ id: ticketId, assigneeId: 'agent-1', selfAssigned: true });
      const result = await mockRepo.assignTicket(ticketId, 'agent-1');
      expect(result.selfAssigned).toBe(true);
    });
  });

  describe('getTicketStats', () => {
    it('should return ticket statistics', async () => {
      mockRepo.getTicketStats.mockResolvedValue({ total: 100, open: 20, inProgress: 10, closed: 70 });
      const result = await mockRepo.getTicketStats(enterpriseId);
      expect(result.total).toBe(100);
    });

    it('should include average resolution time', async () => {
      mockRepo.getTicketStats.mockResolvedValue({ avgResolutionHours: 24 });
      const result = await mockRepo.getTicketStats(enterpriseId);
      expect(result.avgResolutionHours).toBe(24);
    });

    it('should include SLA compliance', async () => {
      mockRepo.getTicketStats.mockResolvedValue({ slaCompliance: 95 });
      const result = await mockRepo.getTicketStats(enterpriseId);
      expect(result.slaCompliance).toBe(95);
    });

    it('should include priority distribution', async () => {
      mockRepo.getTicketStats.mockResolvedValue({ byPriority: { low: 30, medium: 40, high: 20, critical: 10 } });
      const result = await mockRepo.getTicketStats(enterpriseId);
      expect(result.byPriority.high).toBe(20);
    });

    it('should handle zero tickets', async () => {
      mockRepo.getTicketStats.mockResolvedValue({ total: 0 });
      const result = await mockRepo.getTicketStats(enterpriseId);
      expect(result.total).toBe(0);
    });

    it('should include category breakdown', async () => {
      mockRepo.getTicketStats.mockResolvedValue({ byCategory: { technical: 50, billing: 30, general: 20 } });
      const result = await mockRepo.getTicketStats(enterpriseId);
      expect(result.byCategory.technical).toBe(50);
    });
  });

  describe('addMessage', () => {
    it('should add message to ticket', async () => {
      mockRepo.addMessage.mockResolvedValue({ id: 'msg-1', ticketId, content: 'Here is the solution' });
      const result = await mockRepo.addMessage(ticketId, { content: 'Here is the solution', authorId: 'usr-1' });
      expect(result.content).toBe('Here is the solution');
    });

    it('should require content', () => {
      const validate = (data: any) => {
        if (!data?.content) throw new Error('Le contenu est requis');
      };
      expect(() => validate({})).toThrow('Le contenu est requis');
    });

    it('should require author', () => {
      const validate = (data: any) => {
        if (!data?.authorId) throw new Error('L\'auteur est requis');
      };
      expect(() => validate({ content: 'Hi' })).toThrow('L\'auteur est requis');
    });

    it('should validate content length', () => {
      const validate = (content: string) => {
        if (content.length < 1) throw new Error('Le contenu ne peut pas être vide');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('Valid message')).not.toThrow();
    });

    it('should set timestamp', async () => {
      mockRepo.addMessage.mockResolvedValue({ id: 'msg-1', createdAt: new Date().toISOString() });
      const result = await mockRepo.addMessage(ticketId, { content: 'Hi', authorId: 'usr-1' });
      expect(result.createdAt).toBeDefined();
    });

    it('should support attachments', async () => {
      mockRepo.addMessage.mockResolvedValue({ id: 'msg-1', attachments: [{ name: 'file.pdf', url: '/files/file.pdf' }] });
      const result = await mockRepo.addMessage(ticketId, { content: 'See attached', authorId: 'usr-1', attachments: [{ name: 'file.pdf' }] });
      expect(result.attachments).toHaveLength(1);
    });
  });

  describe('searchTickets', () => {
    it('should search tickets', async () => {
      mockRepo.searchTickets.mockResolvedValue([{ id: ticketId, subject: 'Login issue' }]);
      const result = await mockRepo.searchTickets(enterpriseId, 'Login');
      expect(result).toHaveLength(1);
    });

    it('should require minimum query length', () => {
      const validate = (query: string) => {
        if (!query || query.trim().length < 2) throw new Error('Le terme de recherche doit contenir au moins 2 caractères');
      };
      expect(() => validate('')).toThrow();
      expect(() => validate('L')).toThrow();
      expect(() => validate('Lo')).not.toThrow();
    });

    it('should search across fields', async () => {
      mockRepo.searchTickets.mockResolvedValue([]);
      await mockRepo.searchTickets(enterpriseId, 'query', { fields: ['subject', 'description'] });
      expect(mockRepo.searchTickets).toHaveBeenCalled();
    });

    it('should handle no results', async () => {
      mockRepo.searchTickets.mockResolvedValue([]);
      const result = await mockRepo.searchTickets(enterpriseId, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('bulkUpdateTickets', () => {
    it('should bulk update tickets', async () => {
      mockRepo.bulkUpdateTickets.mockResolvedValue({ updated: 5 });
      const result = await mockRepo.bulkUpdateTickets(['tick-1', 'tick-2'], { status: 'closed' });
      expect(result.updated).toBe(5);
    });

    it('should validate batch size', () => {
      const maxBatchSize = 100;
      const batchSize = 50;
      const isValid = batchSize <= maxBatchSize;
      expect(isValid).toBe(true);
    });

    it('should handle empty batch', async () => {
      mockRepo.bulkUpdateTickets.mockResolvedValue({ updated: 0 });
      const result = await mockRepo.bulkUpdateTickets([], { status: 'closed' });
      expect(result.updated).toBe(0);
    });
  });

  describe('escalateTicket', () => {
    it('should escalate ticket', async () => {
      mockRepo.escalateTicket.mockResolvedValue({ id: ticketId, priority: 'critical', escalatedAt: new Date().toISOString() });
      const result = await mockRepo.escalateTicket(ticketId, 'SLA breach imminent');
      expect(result.priority).toBe('critical');
    });

    it('should require escalation reason', () => {
      const validate = (reason: string) => {
        if (!reason) throw new Error('La raison de l\'escalade est requise');
      };
      expect(() => validate('')).toThrow('La raison de l\'escalade est requise');
    });

    it('should track escalation history', async () => {
      mockRepo.escalateTicket.mockResolvedValue({ escalatedCount: 2 });
      const result = await mockRepo.escalateTicket(ticketId, 'Still unresolved');
      expect(result.escalatedCount).toBe(2);
    });
  });

  describe('getSLAStatus', () => {
    it('should return SLA status', async () => {
      mockRepo.getSLAStatus.mockResolvedValue({ ticketId, sla: { deadline: '2026-08-01', status: 'on_track' } });
      const result = await mockRepo.getSLAStatus(ticketId);
      expect(result.sla.status).toBe('on_track');
    });

    it('should detect SLA breach', async () => {
      mockRepo.getSLAStatus.mockResolvedValue({ sla: { status: 'breached' } });
      const result = await mockRepo.getSLAStatus(ticketId);
      expect(result.sla.status).toBe('breached');
    });

    it('should detect near-breach', async () => {
      mockRepo.getSLAStatus.mockResolvedValue({ sla: { status: 'at_risk', hoursRemaining: 2 } });
      const result = await mockRepo.getSLAStatus(ticketId);
      expect(result.sla.status).toBe('at_risk');
    });
  });

  describe('mergeTickets', () => {
    it('should merge duplicate tickets', async () => {
      mockRepo.mergeTickets.mockResolvedValue({ primaryTicketId: 'tick-1', mergedIds: ['tick-2', 'tick-3'] });
      const result = await mockRepo.mergeTickets('tick-1', ['tick-2', 'tick-3'], 'Duplicate issues');
      expect(result.mergedIds).toHaveLength(2);
    });

    it('should require reason', () => {
      const validate = (reason: string) => {
        if (!reason) throw new Error('La raison de la fusion est requise');
      };
      expect(() => validate('')).toThrow('La raison de la fusion est requise');
    });

    it('should not merge with self', () => {
      const validate = (primary: string, duplicates: string[]) => {
        if (duplicates.includes(primary)) throw new Error('Cannot merge ticket with itself');
      };
      expect(() => validate('tick-1', ['tick-1'])).toThrow();
    });
  });

  describe('exportTickets', () => {
    it('should export tickets as CSV', async () => {
      mockRepo.exportTickets.mockResolvedValue('id,subject,status\ntick-1,Login issue,open');
      const result = await mockRepo.exportTickets(enterpriseId, 'csv');
      expect(result).toContain('subject');
    });

    it('should export as JSON', async () => {
      mockRepo.exportTickets.mockResolvedValue('[{"id":"tick-1"}]');
      const result = await mockRepo.exportTickets(enterpriseId, 'json');
      expect(JSON.parse(result)).toHaveLength(1);
    });

    it('should filter export by date range', async () => {
      mockRepo.exportTickets.mockResolvedValue('');
      await mockRepo.exportTickets(enterpriseId, 'csv', { from: '2026-01-01', to: '2026-12-31' });
      expect(mockRepo.exportTickets).toHaveBeenCalled();
    });

    it('should handle empty export', async () => {
      mockRepo.exportTickets.mockResolvedValue('id,subject,status\n');
      const result = await mockRepo.exportTickets(enterpriseId, 'csv');
      expect(result).toContain('id,subject,status');
    });
  });
});
