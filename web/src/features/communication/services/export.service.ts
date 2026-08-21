import type { CommunicationRepositoryExtended, ExportJob } from '@/features/communication/types';
import { logger } from '@educi/logger';

export function createExportService(repository: CommunicationRepositoryExtended) {
  return {
    async exportConversation(conversationId: string, userId: string, format?: string) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Exporting conversation', { conversationId, userId, format }, 'ExportService');

        const exportJob = await repository.exportConversation(conversationId, {
          format: format || 'json',
          requestedBy: userId,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent('', 'export.conversation', {
          conversationId,
          userId,
          format,
        });

        logger.info('Conversation export initiated', { conversationId }, 'ExportService');

        return exportJob;
      } catch (error) {
        logger.error('Failed to export conversation', { conversationId }, 'ExportService');
        throw error;
      }
    },

    async exportDocuments(schoolId: string, userId: string, documentIds: string[], format?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!documentIds || documentIds.length === 0) throw new Error('documentIds are required');

        logger.info('Exporting documents', { schoolId, userId, count: documentIds.length, format }, 'ExportService');

        const exportJob = await repository.exportDocuments({
          schoolId,
          documentIds,
          format: format || 'zip',
          requestedBy: userId,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'export.documents', {
          userId,
          documentCount: documentIds.length,
          format,
        });

        logger.info('Documents export initiated', { schoolId, count: documentIds.length }, 'ExportService');

        return exportJob;
      } catch (error) {
        logger.error('Failed to export documents', { schoolId }, 'ExportService');
        throw error;
      }
    },

    async logCommunicationEvent(schoolId: string, event: string, data: Record<string, unknown>) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!event) throw new Error('event name is required');

        logger.info('Logging communication event', { schoolId, event }, 'ExportService');

        await repository.logCommunicationEvent(schoolId, event, data);

        logger.info('Communication event logged', { schoolId, event }, 'ExportService');
      } catch (error) {
        logger.error('Failed to log communication event', { schoolId, event }, 'ExportService');
        throw error;
      }
    },
  };
}
