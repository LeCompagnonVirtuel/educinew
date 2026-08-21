import type { CommunicationRepositoryExtended, Message } from '@/features/communication/types';
import {
  CommMessageNotFoundError,
  CommMessageAccessDeniedError,
  CommMessageTooLongError,
  CommMessageDeletedError,
  MessageEditExpiredError,
  MessageRateLimitError,
  MessagePinnedError,
  MessageThreadLockedError,
  MessageDuplicateError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createMessageService(repository: CommunicationRepositoryExtended) {
  return {
    async getMessages(conversationId: string, userId: string, filters?: any) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching messages', { conversationId, userId }, 'MessageService');

        const messages = await repository.getMessages(conversationId, filters);

        logger.info('Messages fetched', { conversationId, count: messages.length }, 'MessageService');

        return messages;
      } catch (error) {
        logger.error('Failed to fetch messages', { conversationId }, 'MessageService');
        throw error;
      }
    },

    async getMessage(messageId: string, userId: string) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching message', { messageId, userId }, 'MessageService');

        const message = await repository.getMessage(messageId);
        if (!message) throw new CommMessageNotFoundError(messageId);

        return message;
      } catch (error) {
        logger.error('Failed to fetch message', { messageId }, 'MessageService');
        throw error;
      }
    },

    async sendMessage(schoolId: string, conversationId: string, userId: string, data: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');
        if (!data || !data.content) throw new Error('message content is required');
        if (data.content.length > 10000) throw new CommMessageTooLongError(10000);

        logger.info('Sending message', { schoolId, conversationId, userId }, 'MessageService');

        const message = await repository.sendMessage({
          ...data,
          schoolId,
          conversationId,
          senderId: userId,
          status: 'sent',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(schoolId, 'message.sent', {
          messageId: message.id,
          conversationId,
          userId,
        });

        logger.info('Message sent', { messageId: message.id }, 'MessageService');

        return message;
      } catch (error) {
        logger.error('Failed to send message', { conversationId }, 'MessageService');
        throw error;
      }
    },

    async editMessage(messageId: string, userId: string, content: string) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');
        if (!content || content.trim().length === 0) throw new Error('content is required');
        if (content.length > 10000) throw new CommMessageTooLongError(10000);

        logger.info('Editing message', { messageId, userId }, 'MessageService');

        const existing = await repository.getMessage(messageId);
        if (!existing) throw new CommMessageNotFoundError(messageId);
        if (existing.senderId !== userId) throw new CommMessageAccessDeniedError(messageId);

        const updated = await repository.updateMessage(messageId, {
          content,
          edited: true,
          editedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        logger.info('Message edited', { messageId }, 'MessageService');

        return updated;
      } catch (error) {
        logger.error('Failed to edit message', { messageId }, 'MessageService');
        throw error;
      }
    },

    async deleteMessage(messageId: string, userId: string) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Deleting message', { messageId, userId }, 'MessageService');

        const existing = await repository.getMessage(messageId);
        if (!existing) throw new CommMessageNotFoundError(messageId);
        if (existing.senderId !== userId) throw new CommMessageAccessDeniedError(messageId);

        await repository.deleteMessage(messageId);

        await repository.logCommunicationEvent(existing.schoolId, 'message.deleted', { messageId, userId });

        logger.info('Message deleted', { messageId }, 'MessageService');
      } catch (error) {
        logger.error('Failed to delete message', { messageId }, 'MessageService');
        throw error;
      }
    },

    async pinMessage(messageId: string, userId: string, pinned: boolean) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Toggling pin message', { messageId, userId, pinned }, 'MessageService');

        const existing = await repository.getMessage(messageId);
        if (!existing) throw new CommMessageNotFoundError(messageId);

        const updated = await repository.updateMessage(messageId, {
          pinned,
          pinnedAt: pinned ? new Date().toISOString() : null,
          pinnedBy: pinned ? userId : null,
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'message.pinned', { messageId, userId, pinned });

        logger.info('Message pin toggled', { messageId, pinned }, 'MessageService');

        return updated;
      } catch (error) {
        logger.error('Failed to pin message', { messageId }, 'MessageService');
        throw error;
      }
    },

    async reactToMessage(messageId: string, userId: string, reactionType: string) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');
        if (!reactionType) throw new Error('reactionType is required');

        logger.info('Reacting to message', { messageId, userId, reactionType }, 'MessageService');

        const existing = await repository.getMessage(messageId);
        if (!existing) throw new CommMessageNotFoundError(messageId);

        const reaction = await repository.addReaction(messageId, {
          userId,
          type: reactionType,
          createdAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'message.reacted', { messageId, userId, reactionType });

        logger.info('Message reacted', { messageId, reactionType }, 'MessageService');

        return reaction;
      } catch (error) {
        logger.error('Failed to react to message', { messageId }, 'MessageService');
        throw error;
      }
    },

    async removeReaction(messageId: string, userId: string, reactionType: string) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');
        if (!reactionType) throw new Error('reactionType is required');

        logger.info('Removing reaction from message', { messageId, userId, reactionType }, 'MessageService');

        const existing = await repository.getMessage(messageId);
        if (!existing) throw new CommMessageNotFoundError(messageId);

        await repository.removeReaction(messageId, userId, reactionType);

        logger.info('Reaction removed', { messageId, reactionType }, 'MessageService');
      } catch (error) {
        logger.error('Failed to remove reaction', { messageId }, 'MessageService');
        throw error;
      }
    },

    async replyToMessage(messageId: string, userId: string, content: string) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');
        if (!content || content.trim().length === 0) throw new Error('reply content is required');
        if (content.length > 10000) throw new CommMessageTooLongError(10000);

        logger.info('Replying to message', { messageId, userId }, 'MessageService');

        const existing = await repository.getMessage(messageId);
        if (!existing) throw new CommMessageNotFoundError(messageId);

        const reply = await repository.sendMessage({
          content,
          conversationId: existing.conversationId,
          senderId: userId,
          replyToId: messageId,
          schoolId: existing.schoolId,
          status: 'sent',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'message.replied', {
          messageId: reply.id,
          replyToId: messageId,
          userId,
        });

        logger.info('Reply sent', { replyMessageId: reply.id }, 'MessageService');

        return reply;
      } catch (error) {
        logger.error('Failed to reply to message', { messageId }, 'MessageService');
        throw error;
      }
    },

    async forwardMessage(messageId: string, userId: string, targetConversationId: string) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');
        if (!targetConversationId) throw new Error('targetConversationId is required');

        logger.info('Forwarding message', { messageId, userId, targetConversationId }, 'MessageService');

        const existing = await repository.getMessage(messageId);
        if (!existing) throw new CommMessageNotFoundError(messageId);

        const forwarded = await repository.sendMessage({
          content: existing.content,
          conversationId: targetConversationId,
          senderId: userId,
          forwardFromId: messageId,
          schoolId: existing.schoolId,
          status: 'sent',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        await repository.logCommunicationEvent(existing.schoolId, 'message.forwarded', {
          messageId: forwarded.id,
          forwardFromId: messageId,
          userId,
        });

        logger.info('Message forwarded', { forwardedMessageId: forwarded.id }, 'MessageService');

        return forwarded;
      } catch (error) {
        logger.error('Failed to forward message', { messageId }, 'MessageService');
        throw error;
      }
    },

    async searchMessages(schoolId: string, userId: string, query: string, filters?: any) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');
        if (!query || query.trim().length === 0) throw new Error('search query is required');

        logger.info('Searching messages', { schoolId, userId, query }, 'MessageService');

        const results = await repository.searchMessages(schoolId, query, filters);

        logger.info('Message search completed', { schoolId, count: results.length }, 'MessageService');

        return results;
      } catch (error) {
        logger.error('Failed to search messages', { schoolId, query }, 'MessageService');
        throw error;
      }
    },

    async markAsRead(conversationId: string, userId: string, messageIds: string[]) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');
        if (!messageIds || messageIds.length === 0) throw new Error('messageIds are required');

        logger.info('Marking messages as read', { conversationId, userId, count: messageIds.length }, 'MessageService');

        await repository.markAsRead(conversationId, userId, messageIds);

        logger.info('Messages marked as read', { conversationId, count: messageIds.length }, 'MessageService');
      } catch (error) {
        logger.error('Failed to mark messages as read', { conversationId }, 'MessageService');
        throw error;
      }
    },

    async markAsDelivered(messageId: string, userId: string) {
      try {
        if (!messageId) throw new Error('messageId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Marking message as delivered', { messageId, userId }, 'MessageService');

        const existing = await repository.getMessage(messageId);
        if (!existing) throw new CommMessageNotFoundError(messageId);

        await repository.updateMessage(messageId, {
          status: 'delivered',
          deliveredAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        logger.info('Message marked as delivered', { messageId }, 'MessageService');
      } catch (error) {
        logger.error('Failed to mark message as delivered', { messageId }, 'MessageService');
        throw error;
      }
    },

    async getUnreadCount(schoolId: string, userId: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching unread count', { schoolId, userId }, 'MessageService');

        const counts = await repository.getUnreadCounts(schoolId, userId);

        logger.info('Unread count fetched', { schoolId, userId }, 'MessageService');

        return counts;
      } catch (error) {
        logger.error('Failed to fetch unread count', { schoolId, userId }, 'MessageService');
        throw error;
      }
    },

    async bulkMarkAsRead(conversationId: string, userId: string, messageIds: string[]) {
      try {
        if (!conversationId) throw new Error('conversationId is required');
        if (!userId) throw new Error('userId is required');
        if (!messageIds || messageIds.length === 0) throw new Error('messageIds are required');

        logger.info('Bulk marking messages as read', { conversationId, userId, count: messageIds.length }, 'MessageService');

        await repository.bulkMarkAsRead(conversationId, userId, messageIds);

        logger.info('Bulk messages marked as read', { conversationId, count: messageIds.length }, 'MessageService');
      } catch (error) {
        logger.error('Failed to bulk mark messages as read', { conversationId }, 'MessageService');
        throw error;
      }
    },

    async bulkDeleteMessages(messageIds: string[]) {
      try {
        if (!messageIds || messageIds.length === 0) throw new Error('messageIds are required');

        logger.info('Bulk deleting messages', { count: messageIds.length }, 'MessageService');

        await repository.bulkDeleteMessages(messageIds);

        logger.info('Bulk messages deleted', { count: messageIds.length }, 'MessageService');
      } catch (error) {
        logger.error('Failed to bulk delete messages', {}, 'MessageService');
        throw error;
      }
    },

    async getRecentConversations(schoolId: string, userId: string, limit?: number) {
      try {
        if (!schoolId) throw new Error('schoolId is required');
        if (!userId) throw new Error('userId is required');

        logger.info('Fetching recent conversations', { schoolId, userId, limit }, 'MessageService');

        const conversations = await repository.getRecentConversations(schoolId, userId, limit);

        logger.info('Recent conversations fetched', { schoolId, count: conversations.length }, 'MessageService');

        return conversations;
      } catch (error) {
        logger.error('Failed to fetch recent conversations', { schoolId }, 'MessageService');
        throw error;
      }
    },

    async getMessageStats(schoolId: string, dateFrom?: string, dateTo?: string) {
      try {
        if (!schoolId) throw new Error('schoolId is required');

        logger.info('Fetching message stats', { schoolId, dateFrom, dateTo }, 'MessageService');

        const stats = await repository.getMessageStats(schoolId, dateFrom, dateTo);

        logger.info('Message stats fetched', { schoolId }, 'MessageService');

        return stats;
      } catch (error) {
        logger.error('Failed to fetch message stats', { schoolId }, 'MessageService');
        throw error;
      }
    },
  };
}
