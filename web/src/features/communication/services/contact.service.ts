import type { CommunicationRepositoryExtended, Contact } from '@/features/communication/types';
import { logger } from '@educi/logger';

export function createContactService(repository: CommunicationRepositoryExtended) {
  return {
    async getContacts(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching contacts', { schoolId, userId }, 'ContactService');

        const contacts = await repository.getContacts(schoolId, userId, filters);

        logger.info('Contacts fetched', { schoolId, count: contacts.length }, 'ContactService');

        return contacts;
      } catch (error) {
        logger.error('Failed to fetch contacts', { schoolId }, 'ContactService');
        throw error;
      }
    },

    async getContact(contactId: string, userId: string) {
      try {
        if (!contactId) throw new Error('contactId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching contact', { contactId, userId }, 'ContactService');

        const contact = await repository.getContact(contactId);
        if (!contact) throw new Error('Contact not found');

        return contact;
      } catch (error) {
        logger.error('Failed to fetch contact', { contactId }, 'ContactService');
        throw error;
      }
    },

    async createContact(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.name) throw new Error('contact name is required');

        logger.info('Creating contact', { schoolId, userId, name: data.name }, 'ContactService');

        const contact = await repository.createContact({
          ...data,
          schoolId,
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'contact.created', { contactId: contact.id, userId });

        logger.info('Contact created', { contactId: contact.id }, 'ContactService');

        return contact;
      } catch (error) {
        logger.error('Failed to create contact', { schoolId }, 'ContactService');
        throw error;
      }
    },

    async updateContact(contactId: string, userId: string, data: any) {
      try {
        if (!contactId) throw new Error('contactId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');

        logger.info('Updating contact', { contactId, userId }, 'ContactService');

        const existing = await repository.getContact(contactId);
        if (!existing) throw new Error('Contact not found');

        const updated = await repository.updateContact(contactId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent((existing as any).schoolId, 'contact.updated', { contactId, userId });

        logger.info('Contact updated', { contactId }, 'ContactService');

        return updated;
      } catch (error) {
        logger.error('Failed to update contact', { contactId }, 'ContactService');
        throw error;
      }
    },

    async deleteContact(contactId: string, userId: string) {
      try {
        if (!contactId) throw new Error('contactId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting contact', { contactId, userId }, 'ContactService');

        const existing = await repository.getContact(contactId);
        if (!existing) throw new Error('Contact not found');

        await repository.deleteContact(contactId);

        await repository.logCommunicationEvent((existing as any).schoolId, 'contact.deleted', { contactId, userId });

        logger.info('Contact deleted', { contactId }, 'ContactService');
      } catch (error) {
        logger.error('Failed to delete contact', { contactId }, 'ContactService');
        throw error;
      }
    },

    async getContactGroups(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching contact groups', { schoolId, userId }, 'ContactService');

        const groups = await repository.getContactGroups(schoolId, userId);

        logger.info('Contact groups fetched', { schoolId, count: groups.length }, 'ContactService');

        return groups;
      } catch (error) {
        logger.error('Failed to fetch contact groups', { schoolId }, 'ContactService');
        throw error;
      }
    },

    async getContactStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching contact stats', { schoolId, dateFrom, dateTo }, 'ContactService');

        const stats = await repository.getContactStats(schoolId, dateFrom, dateTo);

        logger.info('Contact stats fetched', { schoolId }, 'ContactService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch contact stats', { schoolId }, 'ContactService');
        throw error;
      }
    },
  };
}
