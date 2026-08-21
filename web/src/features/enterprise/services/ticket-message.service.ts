import type { EnterpriseRepositoryExtended } from '../types';
import { AppError } from '@educi/errors';

export function createTicketMessageService(repo: EnterpriseRepositoryExtended) {
  return {
    async findMessages(enterpriseId: string, ticketId: string, filters?: any) {
      if (!enterpriseId || !ticketId) throw new AppError('Identifiants requis');
      const ticket = await repo.findTicketById(enterpriseId, ticketId);
      if (!ticket) throw new AppError('Ticket non trouvé');
      return repo.findTicketMessages(enterpriseId, ticketId, filters);
    },

    async addMessage(enterpriseId: string, ticketId: string, data: any) {
      if (!enterpriseId || !ticketId) throw new AppError('Identifiants requis');
      if (!data?.content) throw new AppError('Le contenu du message est requis');
      const ticket = await repo.findTicketById(enterpriseId, ticketId);
      if (!ticket) throw new AppError('Ticket non trouvé');
      return repo.addTicketMessage(enterpriseId, ticketId, data);
    },
  };
}
