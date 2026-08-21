import type { CommunicationRepositoryExtended, Conversation } from '@/features/communication/types';
import {
  CommConversationNotFoundError,
  CommConversationAccessDeniedError,
  CommConversationAlreadyExistsError,
  CommConversationFullError,
  CommConversationArchivedError,
  CommConversationMutedError,
  CommConversationBlockedError,
  CommConversationValidationTooLongError,
  CommConversationMaxParticipantsError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createConversationService(repository: CommunicationRepositoryExtended) {
  return {
    async getConversations(schoolId: string, userId: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching conversations', { schoolId, userId }, 'ConversationService');

        const conversations = await repository.getConversations(schoolId, userId, filters);

        logger.info('Conversations fetched successfully', { schoolId, count: conversations.length }, 'ConversationService');

        return conversations;
      } catch (error) {
        logger.error('Failed to fetch conversations', { schoolId, userId }, 'ConversationService');
        throw error;
      }
    },

    async getConversation(conversationId: string, userId: string) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching conversation', { conversationId, userId }, 'ConversationService');

        const conversation = await repository.getConversation(conversationId);
        if (!conversation) throw new CommConversationNotFoundError(conversationId);

        await repository.logCommunicationEvent(conversation.schoolId, 'conversation.viewed', { conversationId, userId });

        return conversation;
      } catch (error) {
        logger.error('Failed to fetch conversation', { conversationId }, 'ConversationService');
        throw error;
      }
    },

    async createConversation(schoolId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.type) throw new Error('conversation type is required');
        if (data.name && data.name.length > 255) throw new CommConversationValidationTooLongError(255);
        if (data.participants && data.participants.length > 500) throw new CommConversationMaxParticipantsError(500);

        logger.info('Creating conversation', { schoolId, userId, type: data.type }, 'ConversationService');

        const conversation = await repository.createConversation({
          ...data,
          schoolId,
          createdBy: userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'conversation.created', { conversationId: conversation.id, userId });

        logger.info('Conversation created', { conversationId: conversation.id }, 'ConversationService');

        return conversation;
      } catch (error) {
        logger.error('Failed to create conversation', { schoolId }, 'ConversationService');
        throw error;
      }
    },

    async updateConversation(conversationId: string, userId: string, data: any) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');
        if (!data) throw new Error('update data is required');
        if (data.name && data.name.length > 255) throw new CommConversationValidationTooLongError(255);

        logger.info('Updating conversation', { conversationId, userId }, 'ConversationService');

        const existing = await repository.getConversation(conversationId);
        if (!existing) throw new CommConversationNotFoundError(conversationId);

        const updated = await repository.updateConversation(conversationId, {
          ...data,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'conversation.updated', { conversationId, userId });

        logger.info('Conversation updated', { conversationId }, 'ConversationService');

        return updated;
      } catch (error) {
        logger.error('Failed to update conversation', { conversationId }, 'ConversationService');
        throw error;
      }
    },

    async deleteConversation(conversationId: string, userId: string) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting conversation', { conversationId, userId }, 'ConversationService');

        const existing = await repository.getConversation(conversationId);
        if (!existing) throw new CommConversationNotFoundError(conversationId);

        await repository.deleteConversation(conversationId);

        await repository.logCommunicationEvent(existing.schoolId, 'conversation.deleted', { conversationId, userId });

        logger.info('Conversation deleted', { conversationId }, 'ConversationService');
      } catch (error) {
        logger.error('Failed to delete conversation', { conversationId }, 'ConversationService');
        throw error;
      }
    },

    async archiveConversation(conversationId: string, userId: string) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Archiving conversation', { conversationId, userId }, 'ConversationService');

        const existing = await repository.getConversation(conversationId);
        if (!existing) throw new CommConversationNotFoundError(conversationId);

        const archived = await repository.updateConversation(conversationId, {
          status: 'archived',
          archivedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'conversation.archived', { conversationId, userId });

        logger.info('Conversation archived', { conversationId }, 'ConversationService');

        return archived;
      } catch (error) {
        logger.error('Failed to archive conversation', { conversationId }, 'ConversationService');
        throw error;
      }
    },

    async muteConversation(conversationId: string, userId: string, muted: boolean) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Toggling mute conversation', { conversationId, userId, muted }, 'ConversationService');

        const existing = await repository.getConversation(conversationId);
        if (!existing) throw new CommConversationNotFoundError(conversationId);

        const updated = await repository.updateConversation(conversationId, {
          muted,
          mutedAt: muted ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'conversation.muted', { conversationId, userId, muted });

        logger.info('Conversation mute toggled', { conversationId, muted }, 'ConversationService');

        return updated;
      } catch (error) {
        logger.error('Failed to mute conversation', { conversationId }, 'ConversationService');
        throw error;
      }
    },

    async pinConversation(conversationId: string, userId: string, pinned: boolean) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Toggling pin conversation', { conversationId, userId, pinned }, 'ConversationService');

        const existing = await repository.getConversation(conversationId);
        if (!existing) throw new CommConversationNotFoundError(conversationId);

        const updated = await repository.updateConversation(conversationId, {
          pinned,
          pinnedAt: pinned ? new Date().toISOString() : null,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'conversation.pinned', { conversationId, userId, pinned });

        logger.info('Conversation pin toggled', { conversationId, pinned }, 'ConversationService');

        return updated;
      } catch (error) {
        logger.error('Failed to pin conversation', { conversationId }, 'ConversationService');
        throw error;
      }
    },

    async addParticipant(conversationId: string, userId: string, participantId: string) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');
        if (!participantId) throw new Error('participantId is required');

        logger.info('Adding participant', { conversationId, userId, participantId }, 'ConversationService');

        const existing = await repository.getConversation(conversationId);
        if (!existing) throw new CommConversationNotFoundError(conversationId);

        const updated = await repository.updateConversation(conversationId, {
          participants: [...(existing.participants || []), participantId],
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'conversation.participant_added', { conversationId, userId, participantId });

        logger.info('Participant added', { conversationId, participantId }, 'ConversationService');

        return updated;
      } catch (error) {
        logger.error('Failed to add participant', { conversationId }, 'ConversationService');
        throw error;
      }
    },

    async removeParticipant(conversationId: string, userId: string, participantId: string) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');
        if (!participantId) throw new Error('participantId is required');

        logger.info('Removing participant', { conversationId, userId, participantId }, 'ConversationService');

        const existing = await repository.getConversation(conversationId);
        if (!existing) throw new CommConversationNotFoundError(conversationId);

        const updated = await repository.updateConversation(conversationId, {
          participants: (existing.participants || []).filter((p: string) => p !== participantId),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'conversation.participant_removed', { conversationId, userId, participantId });

        logger.info('Participant removed', { conversationId, participantId }, 'ConversationService');

        return updated;
      } catch (error) {
        logger.error('Failed to remove participant', { conversationId }, 'ConversationService');
        throw error;
      }
    },

    async searchConversations(schoolId: string, userId: string, query: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!query || query.trim().length === 0) throw new Error('search query is required');

        logger.info('Searching conversations', { schoolId, userId, query }, 'ConversationService');

        const results = await repository.searchConversations(schoolId, userId, query, filters);

        logger.info('Conversation search completed', { schoolId, count: results.length }, 'ConversationService');

        return results;
      } catch (error) {
        logger.error('Failed to search conversations', { schoolId, query }, 'ConversationService');
        throw error;
      }
    },

    async getConversationStats(conversationId: string) {
      try {
        if (!conversationId) throw new Error('conversationId is required');

        logger.info('Fetching conversation stats', { conversationId }, 'ConversationService');

        const stats = await repository.getConversationStats(conversationId);

        logger.info('Conversation stats fetched', { conversationId }, 'ConversationService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch conversation stats', { conversationId }, 'ConversationService');
        throw error;
      }
    },
  };
}
