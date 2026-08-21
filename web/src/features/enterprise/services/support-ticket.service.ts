import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createSupportTicketService(repo: EnterpriseRepositoryExtended) {
  return {
    async findTickets(enterpriseId: string, filters?: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      return repo.findTickets(enterpriseId, filters);
    },

    async findTicketById(enterpriseId: string, ticketId: string) {
      if (!enterpriseId || !ticketId) throw new AppError('Identifiants requis');
      const ticket = await repo.findTicketById(enterpriseId, ticketId);
      if (!ticket) throw new AppError('Ticket non trouvé');
      return ticket;
    },

    async createTicket(enterpriseId: string, data: any) {
      if (!enterpriseId) throw new AppError('Identifiant de l\'entreprise requis');
      if (!data?.subject) throw new AppError('L\'objet est requis');
      if (!data?.message) throw new AppError('Le message est requis');
      return repo.createTicket({ ...data, enterprise_id: enterpriseId });
    },

    async updateTicket(enterpriseId: string, ticketId: string, data: any) {
      if (!enterpriseId || !ticketId) throw new AppError('Identifiants requis');
      const existing = await repo.findTicketById(enterpriseId, ticketId);
      if (!existing) throw new AppError('Ticket non trouvé');
      return repo.updateTicket(enterpriseId, ticketId, data);
    },

    async deleteTicket(enterpriseId: string, ticketId: string) {
      if (!enterpriseId || !ticketId) throw new AppError('Identifiants requis');
      const existing = await repo.findTicketById(enterpriseId, ticketId);
      if (!existing) throw new AppError('Ticket non trouvé');
      return repo.deleteTicket(enterpriseId, ticketId);
    },

    async assignTicket(enterpriseId: string, ticketId: string, assigneeId: string) {
      if (!enterpriseId || !ticketId || !assigneeId) throw new AppError('Identifiants requis');
      const existing = await repo.findTicketById(enterpriseId, ticketId);
      if (!existing) throw new AppError('Ticket non trouvé');
      return repo.assignTicket(enterpriseId, ticketId, assigneeId);
    },

    async escalateTicket(enterpriseId: string, ticketId: string, reason?: string) {
      if (!enterpriseId || !ticketId) throw new AppError('Identifiants requis');
      const existing = await repo.findTicketById(enterpriseId, ticketId);
      if (!existing) throw new AppError('Ticket non trouvé');
      return repo.escalateTicket(enterpriseId, ticketId, reason);
    },

    async resolveTicket(enterpriseId: string, ticketId: string, resolution: string) {
      if (!enterpriseId || !ticketId) throw new AppError('Identifiants requis');
      if (!resolution) throw new AppError('La résolution est requise');
      const existing = await repo.findTicketById(enterpriseId, ticketId);
      if (!existing) throw new AppError('Ticket non trouvé');
      return repo.resolveTicket(enterpriseId, ticketId, resolution);
    },

    async closeTicket(enterpriseId: string, ticketId: string) {
      if (!enterpriseId || !ticketId) throw new AppError('Identifiants requis');
      const existing = await repo.findTicketById(enterpriseId, ticketId);
      if (!existing) throw new AppError('Ticket non trouvé');
      return repo.closeTicket(enterpriseId, ticketId);
    },
  };
}
