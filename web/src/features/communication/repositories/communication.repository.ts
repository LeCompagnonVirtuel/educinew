import { createClient } from '@supabase/supabase-js';
import type {
  CommunicationRepositoryExtended,
  Conversation,
  ConversationStats,
  Message,
  MessageStats,
  MessageThread,
  Group,
  GroupStats,
  GroupMember,
  GroupInvite,
  Call,
  CallStats,
  CallRecording,
  Email,
  EmailTemplate,
  EmailCampaign,
  EmailSignature,
  EmailStats,
  SmsMessage,
  SmsTemplate,
  SmsBulk,
  SmsStats,
  PushNotification,
  PushSubscription,
  PushTemplate,
  Announcement,
  AnnouncementStats,
  CalendarEvent,
  CalendarSubscription,
  Task,
  TaskComment,
  TaskChecklist,
  Document,
  DocumentVersion,
  DocumentComment,
  CollaborationSession,
  CollaborationPresence,
  AISummary,
  AITranslation,
  AICorrection,
  AIResponse,
  AIMeetingSummary,
  AISpamDetection,
  Notification,
  NotificationPreference,
  NotificationBatch,
  NotificationStats,
  Contact,
  ContactGroup,
  PresenceStats,
  Poll,
  PollVote,
  Webhook,
  ScheduledMessage,
  AutoResponse,
  Channel,
} from '@/features/communication/types';
import {
  AppError,
  ValidationError,
  CommConversationError,
  CommConversationNotFoundError,
  CommConversationArchivedError,
  CommConversationMutedError,
  CommConversationAlreadyExistsError,
  CommMessageError,
  CommMessageNotFoundError,
  CommGroupError,
  CommGroupNotFoundError,
  CommGroupAlreadyExistsError,
  CommGroupMemberNotFoundError,
  CallError,
  CallNotFoundError,
  CallNotActiveError,
  CallAlreadyActiveError,
  CallRecordingError,
  CommAnnouncementNotFoundError,
  CommCalendarError,
  CommCalendarEventNotFoundError,
  CommCalendarEventConflictError,
  CommTaskError,
  CommTaskNotFoundError,
  CommTaskChecklistError,
  CommDocumentError,
  CommDocumentNotFoundError,
  CommDocumentMoveError,
  CommDocumentShareError,
  CommDocumentVersionError,
  CommDocumentCommentError,
  CommCollaborationError,
  CommCollaborationSessionError,
  CommCollaborationPresenceError,
  CommNotificationError,
  CommNotificationNotFoundError,
  CommNotificationPreferenceError,
  CommAIError,
  ContactError,
  ContactNotFoundError,
  PollError,
  PollNotFoundError,
  PollClosedError,
  PollAlreadyVotedError,
  WebhookError,
  WebhookNotFoundError,
  ChannelError,
  ChannelNotFoundError,
  ChannelAlreadyExistsError,
  CommSearchError,
  CommSearchQueryTooShortError,
  EmailSendError,
  EmailNotFoundError,
  EmailTemplateNotFoundError,
  SmsSendError,
  SmsNotFoundError,
  PushSendError,
  PushNotFoundError,
  AnnouncementAcknowledgeError,
  ThreadNotFoundError,
  ThreadLockedError,
  MessagePinnedError,
  MessageEditExpiredError,
  GroupInviteError,
} from '@educi/errors';
import { logger } from '@educi/logger';

export function createCommunicationRepository(supabase: ReturnType<typeof createClient>): CommunicationRepositoryExtended {
  return {
    // ─── Conversations ────────────────────────────────────────────────────────
    async getConversations(schoolId: string, userId: string, filters?: Record<string, unknown>): Promise<Conversation[]> {
      try {
        let query = supabase.from('conversations').select('*').eq('school_id', schoolId);
        if (filters?.type) query = query.eq('type', filters.type);
        if (filters?.status) query = query.eq('status', filters.status);
        if (filters?.isArchived !== undefined) query = query.eq('is_archived', filters.isArchived);
        query = query.order('updated_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new CommConversationError(error.message);
        return (data || []) as unknown as Conversation[];
      } catch (error) {
        logger.error('Failed to get conversations', { schoolId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationError('Failed to retrieve conversations');
      }
    },

    async getConversation(conversationId: string): Promise<Conversation> {
      try {
        const { data, error } = await supabase.from('conversations').select('*').eq('id', conversationId).single();
        if (error || !data) throw new CommConversationNotFoundError(conversationId);
        return data as unknown as Conversation;
      } catch (error) {
        logger.error('Failed to get conversation', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationNotFoundError(conversationId);
      }
    },

    async createConversation(data: Partial<Conversation>, schoolId: string): Promise<Conversation> {
      try {
        if (!data.type) throw new ValidationError('Conversation type is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: conversation, error } = await supabase.from('conversations').insert(payload).select().single();
        if (error) throw new CommConversationError(error.message);
        logger.info('Conversation created', { conversationId: conversation.id }, 'communication');
        return conversation as unknown as Conversation;
      } catch (error) {
        logger.error('Failed to create conversation', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationError('Failed to create conversation');
      }
    },

    async updateConversation(conversationId: string, data: Partial<Conversation>): Promise<Conversation> {
      try {
        const { data: existing } = await supabase.from('conversations').select('id').eq('id', conversationId).single();
        if (!existing) throw new CommConversationNotFoundError(conversationId);
        const payload = { ...data, updated_at: new Date().toISOString() };
        const { data: conversation, error } = await supabase.from('conversations').update(payload).eq('id', conversationId).select().single();
        if (error) throw new CommConversationError(error.message);
        return conversation as unknown as Conversation;
      } catch (error) {
        logger.error('Failed to update conversation', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationError('Failed to update conversation');
      }
    },

    async deleteConversation(conversationId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('conversations').select('id').eq('id', conversationId).single();
        if (!existing) throw new CommConversationNotFoundError(conversationId);
        const { error } = await supabase.from('conversations').delete().eq('id', conversationId);
        if (error) throw new CommConversationError(error.message);
        logger.info('Conversation deleted', { conversationId }, 'communication');
      } catch (error) {
        logger.error('Failed to delete conversation', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationError('Failed to delete conversation');
      }
    },

    async archiveConversation(conversationId: string): Promise<Conversation> {
      try {
        const { data: conversation, error } = await supabase.from('conversations').update({ is_archived: true, updated_at: new Date().toISOString() }).eq('id', conversationId).select().single();
        if (error || !conversation) throw new CommConversationNotFoundError(conversationId);
        return conversation as unknown as Conversation;
      } catch (error) {
        logger.error('Failed to archive conversation', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationArchivedError(conversationId);
      }
    },

    async muteConversation(conversationId: string, muted: boolean): Promise<Conversation> {
      try {
        const { data: conversation, error } = await supabase.from('conversations').update({ is_muted: muted, updated_at: new Date().toISOString() }).eq('id', conversationId).select().single();
        if (error || !conversation) throw new CommConversationNotFoundError(conversationId);
        return conversation as unknown as Conversation;
      } catch (error) {
        logger.error('Failed to mute conversation', { conversationId, muted, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationMutedError(conversationId);
      }
    },

    async pinConversation(conversationId: string, pinned: boolean): Promise<Conversation> {
      try {
        const { data: conversation, error } = await supabase.from('conversations').update({ is_pinned: pinned, updated_at: new Date().toISOString() }).eq('id', conversationId).select().single();
        if (error || !conversation) throw new CommConversationNotFoundError(conversationId);
        return conversation as unknown as Conversation;
      } catch (error) {
        logger.error('Failed to pin conversation', { conversationId, pinned, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationError('Failed to pin conversation');
      }
    },

    async addParticipant(conversationId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('conversation_participants').select('id').eq('conversation_id', conversationId).eq('user_id', userId).single();
        if (existing) throw new CommConversationAlreadyExistsError(userId);
        const { error } = await supabase.from('conversation_participants').insert({ conversation_id: conversationId, user_id: userId, joined_at: new Date().toISOString() });
        if (error) throw new CommConversationError(error.message);
        logger.info('Participant added', { conversationId, userId }, 'communication');
      } catch (error) {
        logger.error('Failed to add participant', { conversationId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationError('Failed to add participant');
      }
    },

    async removeParticipant(conversationId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('conversation_participants').select('id').eq('conversation_id', conversationId).eq('user_id', userId).single();
        if (!existing) throw new CommGroupMemberNotFoundError(userId);
        const { error } = await supabase.from('conversation_participants').delete().eq('conversation_id', conversationId).eq('user_id', userId);
        if (error) throw new CommConversationError(error.message);
        logger.info('Participant removed', { conversationId, userId }, 'communication');
      } catch (error) {
        logger.error('Failed to remove participant', { conversationId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationError('Failed to remove participant');
      }
    },

    async searchConversations(schoolId: string, query: string, userId: string): Promise<Conversation[]> {
      try {
        if (!query || query.trim().length < 2) throw new CommSearchQueryTooShortError(2);
        const { data, error } = await supabase.from('conversations').select('*').eq('school_id', schoolId).ilike('name', `%${query}%`).order('updated_at', { ascending: false });
        if (error) throw new CommSearchError(error.message);
        return (data || []) as unknown as Conversation[];
      } catch (error) {
        logger.error('Failed to search conversations', { schoolId, query, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommSearchError('Failed to search conversations');
      }
    },

    async getConversationStats(conversationId: string): Promise<ConversationStats> {
      try {
        const { data: messages } = await supabase.from('messages').select('id, created_at').eq('conversation_id', conversationId);
        const msgs = messages || [];
        const now = new Date();
        const dayAgo = new Date(now.getTime() - 86400000).toISOString();
        const weekAgo = new Date(now.getTime() - 604800000).toISOString();
        const monthAgo = new Date(now.getTime() - 2592000000).toISOString();
        return {
          totalConversations: 1, activeConversations: 1, archivedConversations: 0,
          directConversations: 0, groupConversations: 0, channelConversations: 0,
          messagesLast24h: msgs.filter((m: any) => m.created_at >= dayAgo).length,
          messagesLast7d: msgs.filter((m: any) => m.created_at >= weekAgo).length,
          messagesLast30d: msgs.filter((m: any) => m.created_at >= monthAgo).length,
          averageResponseTimeMinutes: 0, peakHour: 0,
        };
      } catch (error) {
        logger.error('Failed to get conversation stats', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommConversationError('Failed to get conversation stats');
      }
    },

    // ─── Messages ─────────────────────────────────────────────────────────────
    async getMessages(conversationId: string, pagination?: { before?: string; after?: string; limit?: number }): Promise<Message[]> {
      try {
        let query = supabase.from('messages').select('*').eq('conversation_id', conversationId);
        if (pagination?.before) query = query.lt('created_at', pagination.before);
        if (pagination?.after) query = query.gt('created_at', pagination.after);
        query = query.order('created_at', { ascending: false }).limit(pagination?.limit || 50);
        const { data, error } = await query;
        if (error) throw new CommMessageError(error.message);
        return (data || []) as unknown as Message[];
      } catch (error) {
        logger.error('Failed to get messages', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to retrieve messages');
      }
    },

    async getMessage(messageId: string): Promise<Message> {
      try {
        const { data, error } = await supabase.from('messages').select('*').eq('id', messageId).single();
        if (error || !data) throw new CommMessageNotFoundError(messageId);
        return data as unknown as Message;
      } catch (error) {
        logger.error('Failed to get message', { messageId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageNotFoundError(messageId);
      }
    },

    async sendMessage(data: Partial<Message>, conversationId: string): Promise<Message> {
      try {
        if (!data.content) throw new ValidationError('Message content is required');
        const payload = { ...data, conversation_id: conversationId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: message, error } = await supabase.from('messages').insert(payload).select().single();
        if (error) throw new CommMessageError(error.message);
        await supabase.from('conversations').update({ updated_at: new Date().toISOString() }).eq('id', conversationId);
        return message as unknown as Message;
      } catch (error) {
        logger.error('Failed to send message', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to send message');
      }
    },

    async updateMessage(messageId: string, data: Partial<Message>): Promise<Message> {
      try {
        const { data: existing } = await supabase.from('messages').select('*').eq('id', messageId).single();
        if (!existing) throw new CommMessageNotFoundError(messageId);
        const msg = existing as any;
        const created = new Date(msg.created_at).getTime();
        const now = Date.now();
        const diffMin = (now - created) / 60000;
        if (diffMin > 15) throw new MessageEditExpiredError();
        const { data: message, error } = await supabase.from('messages').update({ ...data, is_edited: true, updated_at: new Date().toISOString() }).eq('id', messageId).select().single();
        if (error) throw new CommMessageError(error.message);
        return message as unknown as Message;
      } catch (error) {
        logger.error('Failed to update message', { messageId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to update message');
      }
    },

    async deleteMessage(messageId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('messages').select('id').eq('id', messageId).single();
        if (!existing) throw new CommMessageNotFoundError(messageId);
        const { error } = await supabase.from('messages').delete().eq('id', messageId);
        if (error) throw new CommMessageError(error.message);
      } catch (error) {
        logger.error('Failed to delete message', { messageId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to delete message');
      }
    },

    async pinMessage(messageId: string, pinned: boolean): Promise<Message> {
      try {
        const { data: message, error } = await supabase.from('messages').update({ is_pinned: pinned, updated_at: new Date().toISOString() }).eq('id', messageId).select().single();
        if (error || !message) throw new CommMessageNotFoundError(messageId);
        return message as unknown as Message;
      } catch (error) {
        logger.error('Failed to pin message', { messageId, pinned, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new MessagePinnedError(messageId);
      }
    },

    async reactToMessage(messageId: string, userId: string, emoji: string): Promise<Message> {
      try {
        const { data: existing } = await supabase.from('messages').select('reactions').eq('id', messageId).single();
        if (!existing) throw new CommMessageNotFoundError(messageId);
        const reactions = (existing as any).reactions || {};
        if (!reactions[emoji]) reactions[emoji] = [];
        if (!reactions[emoji].includes(userId)) reactions[emoji].push(userId);
        const { data: message, error } = await supabase.from('messages').update({ reactions, updated_at: new Date().toISOString() }).eq('id', messageId).select().single();
        if (error) throw new CommMessageError(error.message);
        return message as unknown as Message;
      } catch (error) {
        logger.error('Failed to react to message', { messageId, userId, emoji, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to react to message');
      }
    },

    async removeReaction(messageId: string, userId: string, emoji: string): Promise<Message> {
      try {
        const { data: existing } = await supabase.from('messages').select('reactions').eq('id', messageId).single();
        if (!existing) throw new CommMessageNotFoundError(messageId);
        const reactions = (existing as any).reactions || {};
        if (reactions[emoji]) {
          reactions[emoji] = reactions[emoji].filter((u: string) => u !== userId);
          if (reactions[emoji].length === 0) delete reactions[emoji];
        }
        const { data: message, error } = await supabase.from('messages').update({ reactions, updated_at: new Date().toISOString() }).eq('id', messageId).select().single();
        if (error) throw new CommMessageError(error.message);
        return message as unknown as Message;
      } catch (error) {
        logger.error('Failed to remove reaction', { messageId, userId, emoji, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to remove reaction');
      }
    },

    async markMessageAsRead(messageId: string, userId: string): Promise<void> {
      try {
        const { error } = await supabase.from('message_reads').upsert({ message_id: messageId, user_id: userId, read_at: new Date().toISOString() });
        if (error) throw new CommMessageError(error.message);
      } catch (error) {
        logger.error('Failed to mark message as read', { messageId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to mark message as read');
      }
    },

    async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
      try {
        const { error } = await supabase.from('conversation_participants').update({ last_read_at: new Date().toISOString() }).eq('conversation_id', conversationId).eq('user_id', userId);
        if (error) throw new CommMessageError(error.message);
      } catch (error) {
        logger.error('Failed to mark conversation as read', { conversationId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to mark conversation as read');
      }
    },

    async getMessageStats(conversationId: string): Promise<MessageStats> {
      try {
        const { data: messages } = await supabase.from('messages').select('id, created_at, sender_id').eq('conversation_id', conversationId);
        const msgs = (messages || []) as any[];
        const now = new Date();
        const dayAgo = new Date(now.getTime() - 86400000).toISOString();
        const weekAgo = new Date(now.getTime() - 604800000).toISOString();
        const monthAgo = new Date(now.getTime() - 2592000000).toISOString();
        return {
          totalMessages: msgs.length,
          messagesLast24h: msgs.filter(m => m.created_at >= dayAgo).length,
          messagesLast7d: msgs.filter(m => m.created_at >= weekAgo).length,
          messagesLast30d: msgs.filter(m => m.created_at >= monthAgo).length,
          averageMessageLength: msgs.length > 0 ? Math.round(msgs.reduce((sum: number) => sum + 100, 0) / msgs.length) : 0,
          uniqueSenders: new Set(msgs.map(m => m.sender_id)).size,
        };
      } catch (error) {
        logger.error('Failed to get message stats', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to get message stats');
      }
    },

    async searchMessages(schoolId: string, query: string, conversationId?: string): Promise<Message[]> {
      try {
        if (!query || query.trim().length < 2) throw new CommSearchQueryTooShortError(2);
        let dbQuery = supabase.from('messages').select('*').eq('school_id', schoolId).ilike('content', `%${query}%`);
        if (conversationId) dbQuery = dbQuery.eq('conversation_id', conversationId);
        dbQuery = dbQuery.order('created_at', { ascending: false }).limit(50);
        const { data, error } = await dbQuery;
        if (error) throw new CommSearchError(error.message);
        return (data || []) as unknown as Message[];
      } catch (error) {
        logger.error('Failed to search messages', { schoolId, query, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommSearchError('Failed to search messages');
      }
    },

    async forwardMessage(messageId: string, targetConversationId: string): Promise<Message> {
      try {
        const { data: original } = await supabase.from('messages').select('*').eq('id', messageId).single();
        if (!original) throw new CommMessageNotFoundError(messageId);
        const payload = { conversation_id: targetConversationId, content: (original as any).content, sender_id: (original as any).sender_id, type: (original as any).type, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: message, error } = await supabase.from('messages').insert(payload).select().single();
        if (error) throw new CommMessageError(error.message);
        return message as unknown as Message;
      } catch (error) {
        logger.error('Failed to forward message', { messageId, targetConversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to forward message');
      }
    },

    async replyToMessage(messageId: string, data: Partial<Message>): Promise<Message> {
      try {
        const { data: original } = await supabase.from('messages').select('*').eq('id', messageId).single();
        if (!original) throw new CommMessageNotFoundError(messageId);
        const payload = { ...data, conversation_id: (original as any).conversation_id, reply_to: messageId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: message, error } = await supabase.from('messages').insert(payload).select().single();
        if (error) throw new CommMessageError(error.message);
        return message as unknown as Message;
      } catch (error) {
        logger.error('Failed to reply to message', { messageId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to reply to message');
      }
    },

    async getThread(messageId: string): Promise<MessageThread> {
      try {
        const { data: original } = await supabase.from('messages').select('*').eq('id', messageId).single();
        if (!original) throw new ThreadNotFoundError(messageId);
        const { data: replies } = await supabase.from('messages').select('*').eq('reply_to', messageId).order('created_at', { ascending: true });
        return { message: original as unknown as Message, replies: (replies || []) as unknown as Message[], totalReplies: (replies || []).length } as unknown as MessageThread;
      } catch (error) {
        logger.error('Failed to get thread', { messageId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ThreadNotFoundError(messageId);
      }
    },

    async getThreads(conversationId: string): Promise<MessageThread[]> {
      try {
        const { data: roots } = await supabase.from('messages').select('*').eq('conversation_id', conversationId).is('reply_to', null).order('created_at', { ascending: false });
        const threads: MessageThread[] = [];
        for (const root of (roots || []) as any[]) {
          const { data: replies } = await supabase.from('messages').select('*').eq('reply_to', root.id).order('created_at', { ascending: true });
          threads.push({ message: root as unknown as Message, replies: (replies || []) as unknown as Message[], totalReplies: (replies || []).length } as unknown as MessageThread);
        }
        return threads;
      } catch (error) {
        logger.error('Failed to get threads', { conversationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to retrieve threads');
      }
    },

    async lockThread(messageId: string, locked: boolean): Promise<MessageThread> {
      try {
        const { data: existing } = await supabase.from('messages').select('*').eq('id', messageId).single();
        if (!existing) throw new ThreadNotFoundError(messageId);
        const { error } = await supabase.from('messages').update({ is_locked: locked }).eq('id', messageId);
        if (error) throw new CommMessageError(error.message);
        return { message: existing as unknown as Message, replies: [], totalReplies: 0 } as unknown as MessageThread;
      } catch (error) {
        logger.error('Failed to lock thread', { messageId, locked, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ThreadLockedError(messageId);
      }
    },

    async deleteThread(messageId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('messages').select('id').eq('id', messageId).single();
        if (!existing) throw new ThreadNotFoundError(messageId);
        await supabase.from('messages').delete().eq('reply_to', messageId);
        await supabase.from('messages').delete().eq('id', messageId);
      } catch (error) {
        logger.error('Failed to delete thread', { messageId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to delete thread');
      }
    },

    // ─── Groups ───────────────────────────────────────────────────────────────
    async getGroups(schoolId: string): Promise<Group[]> {
      try {
        const { data, error } = await supabase.from('groups').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new CommGroupError(error.message);
        return (data || []) as unknown as Group[];
      } catch (error) {
        logger.error('Failed to get groups', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to retrieve groups');
      }
    },

    async getGroup(groupId: string): Promise<Group> {
      try {
        const { data, error } = await supabase.from('groups').select('*').eq('id', groupId).single();
        if (error || !data) throw new CommGroupNotFoundError(groupId);
        return data as unknown as Group;
      } catch (error) {
        logger.error('Failed to get group', { groupId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupNotFoundError(groupId);
      }
    },

    async createGroup(data: Partial<Group>, schoolId: string): Promise<Group> {
      try {
        if (!data.name) throw new ValidationError('Group name is required');
        const { data: existing } = await supabase.from('groups').select('id').eq('school_id', schoolId).eq('name', data.name).single();
        if (existing) throw new CommGroupAlreadyExistsError(data.name);
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: group, error } = await supabase.from('groups').insert(payload).select().single();
        if (error) throw new CommGroupError(error.message);
        return group as unknown as Group;
      } catch (error) {
        logger.error('Failed to create group', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to create group');
      }
    },

    async updateGroup(groupId: string, data: Partial<Group>): Promise<Group> {
      try {
        const { data: existing } = await supabase.from('groups').select('id').eq('id', groupId).single();
        if (!existing) throw new CommGroupNotFoundError(groupId);
        const { data: group, error } = await supabase.from('groups').update({ ...data, updated_at: new Date().toISOString() }).eq('id', groupId).select().single();
        if (error) throw new CommGroupError(error.message);
        return group as unknown as Group;
      } catch (error) {
        logger.error('Failed to update group', { groupId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to update group');
      }
    },

    async deleteGroup(groupId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('groups').select('id').eq('id', groupId).single();
        if (!existing) throw new CommGroupNotFoundError(groupId);
        await supabase.from('group_members').delete().eq('group_id', groupId);
        const { error } = await supabase.from('groups').delete().eq('id', groupId);
        if (error) throw new CommGroupError(error.message);
      } catch (error) {
        logger.error('Failed to delete group', { groupId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to delete group');
      }
    },

    async getGroupMembers(groupId: string): Promise<GroupMember[]> {
      try {
        const { data, error } = await supabase.from('group_members').select('*').eq('group_id', groupId).order('joined_at', { ascending: true });
        if (error) throw new CommGroupError(error.message);
        return (data || []) as unknown as GroupMember[];
      } catch (error) {
        logger.error('Failed to get group members', { groupId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to retrieve group members');
      }
    },

    async addGroupMember(groupId: string, userId: string, role?: string): Promise<GroupMember> {
      try {
        const { data: existing } = await supabase.from('group_members').select('id').eq('group_id', groupId).eq('user_id', userId).single();
        if (existing) throw new CommGroupMemberNotFoundError(userId);
        const payload = { group_id: groupId, user_id: userId, role: role || 'member', joined_at: new Date().toISOString() };
        const { data: member, error } = await supabase.from('group_members').insert(payload).select().single();
        if (error) throw new CommGroupError(error.message);
        return member as unknown as GroupMember;
      } catch (error) {
        logger.error('Failed to add group member', { groupId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to add group member');
      }
    },

    async removeGroupMember(groupId: string, userId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('group_members').select('id').eq('group_id', groupId).eq('user_id', userId).single();
        if (!existing) throw new CommGroupMemberNotFoundError(userId);
        const { error } = await supabase.from('group_members').delete().eq('group_id', groupId).eq('user_id', userId);
        if (error) throw new CommGroupError(error.message);
      } catch (error) {
        logger.error('Failed to remove group member', { groupId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to remove group member');
      }
    },

    async getGroupInvites(groupId: string): Promise<GroupInvite[]> {
      try {
        const { data, error } = await supabase.from('group_invites').select('*').eq('group_id', groupId);
        if (error) throw new CommGroupError(error.message);
        return (data || []) as unknown as GroupInvite[];
      } catch (error) {
        logger.error('Failed to get group invites', { groupId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to retrieve group invites');
      }
    },

    async inviteToGroup(groupId: string, email: string, invitedBy: string): Promise<GroupInvite> {
      try {
        const payload = { group_id: groupId, email, invited_by: invitedBy, status: 'pending', created_at: new Date().toISOString() };
        const { data: invite, error } = await supabase.from('group_invites').insert(payload).select().single();
        if (error) throw new GroupInviteError(error.message);
        return invite as unknown as GroupInvite;
      } catch (error) {
        logger.error('Failed to invite to group', { groupId, email, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new GroupInviteError('Failed to send group invite');
      }
    },

    async getGroupStats(groupId: string): Promise<GroupStats> {
      try {
        const { data: members } = await supabase.from('group_members').select('id, joined_at').eq('group_id', groupId);
        const { data: group } = await supabase.from('groups').select('*').eq('id', groupId).single();
        const mems = (members || []) as any[];
        return {
          totalMembers: mems.length, activeMembers: mems.length, newMembersThisWeek: mems.filter(m => new Date(m.joined_at) >= new Date(Date.now() - 604800000)).length,
          newMembersThisMonth: mems.filter(m => new Date(m.joined_at) >= new Date(Date.now() - 2592000000)).length,
          averageMemberTenureDays: 30, totalGroups: 1, activeGroups: 1,
        };
      } catch (error) {
        logger.error('Failed to get group stats', { groupId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommGroupError('Failed to get group stats');
      }
    },

    // ─── Calls ────────────────────────────────────────────────────────────────
    async getCalls(schoolId: string, filters?: Record<string, unknown>): Promise<Call[]> {
      try {
        let query = supabase.from('calls').select('*').eq('school_id', schoolId);
        if (filters?.status) query = query.eq('status', filters.status);
        if (filters?.type) query = query.eq('type', filters.type);
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new CallError(error.message);
        return (data || []) as unknown as Call[];
      } catch (error) {
        logger.error('Failed to get calls', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallError('Failed to retrieve calls');
      }
    },

    async getCall(callId: string): Promise<Call> {
      try {
        const { data, error } = await supabase.from('calls').select('*').eq('id', callId).single();
        if (error || !data) throw new CallNotFoundError(callId);
        return data as unknown as Call;
      } catch (error) {
        logger.error('Failed to get call', { callId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallNotFoundError(callId);
      }
    },

    async initiateCall(data: Partial<Call>, schoolId: string): Promise<Call> {
      try {
        const existingCall = await supabase.from('calls').select('id').eq('school_id', schoolId).eq('initiated_by', data.initiatedBy).eq('status', 'active').single();
        if (existingCall.data) throw new CallAlreadyActiveError(data.initiatedBy || '');
        const payload = { ...data, school_id: schoolId, status: 'initiating', started_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: call, error } = await supabase.from('calls').insert(payload).select().single();
        if (error) throw new CallError(error.message);
        return call as unknown as Call;
      } catch (error) {
        logger.error('Failed to initiate call', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallError('Failed to initiate call');
      }
    },

    async answerCall(callId: string, userId: string): Promise<Call> {
      try {
        const { data: call } = await supabase.from('calls').select('*').eq('id', callId).single();
        if (!call) throw new CallNotFoundError(callId);
        if ((call as any).status === 'ended') throw new CallNotActiveError(callId);
        const { data: updated, error } = await supabase.from('calls').update({ status: 'active', answered_at: new Date().toISOString() }).eq('id', callId).select().single();
        if (error) throw new CallError(error.message);
        return updated as unknown as Call;
      } catch (error) {
        logger.error('Failed to answer call', { callId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallError('Failed to answer call');
      }
    },

    async endCall(callId: string): Promise<Call> {
      try {
        const { data: call } = await supabase.from('calls').select('*').eq('id', callId).single();
        if (!call) throw new CallNotFoundError(callId);
        const started = new Date((call as any).started_at || (call as any).created_at).getTime();
        const durationSeconds = Math.round((Date.now() - started) / 1000);
        const { data: updated, error } = await supabase.from('calls').update({ status: 'ended', ended_at: new Date().toISOString(), duration_seconds: durationSeconds }).eq('id', callId).select().single();
        if (error) throw new CallError(error.message);
        return updated as unknown as Call;
      } catch (error) {
        logger.error('Failed to end call', { callId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallError('Failed to end call');
      }
    },

    async cancelCall(callId: string): Promise<Call> {
      try {
        const { data: updated, error } = await supabase.from('calls').update({ status: 'cancelled', ended_at: new Date().toISOString() }).eq('id', callId).select().single();
        if (error || !updated) throw new CallNotFoundError(callId);
        return updated as unknown as Call;
      } catch (error) {
        logger.error('Failed to cancel call', { callId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallError('Failed to cancel call');
      }
    },

    async getCallRecordings(callId: string): Promise<CallRecording[]> {
      try {
        const { data, error } = await supabase.from('call_recordings').select('*').eq('call_id', callId).order('created_at', { ascending: false });
        if (error) throw new CallRecordingError(error.message);
        return (data || []) as unknown as CallRecording[];
      } catch (error) {
        logger.error('Failed to get call recordings', { callId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallRecordingError('Failed to retrieve call recordings');
      }
    },

    async startRecording(callId: string): Promise<CallRecording> {
      try {
        const payload = { call_id: callId, status: 'recording', started_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: recording, error } = await supabase.from('call_recordings').insert(payload).select().single();
        if (error) throw new CallRecordingError(error.message);
        return recording as unknown as CallRecording;
      } catch (error) {
        logger.error('Failed to start recording', { callId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallRecordingError('Failed to start recording');
      }
    },

    async stopRecording(recordingId: string): Promise<CallRecording> {
      try {
        const { data: recording } = await supabase.from('call_recordings').select('*').eq('id', recordingId).single();
        if (!recording) throw new CallRecordingError('Recording not found');
        const { data: updated, error } = await supabase.from('call_recordings').update({ status: 'completed', ended_at: new Date().toISOString() }).eq('id', recordingId).select().single();
        if (error) throw new CallRecordingError(error.message);
        return updated as unknown as CallRecording;
      } catch (error) {
        logger.error('Failed to stop recording', { recordingId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallRecordingError('Failed to stop recording');
      }
    },

    async deleteRecording(recordingId: string): Promise<void> {
      try {
        const { error } = await supabase.from('call_recordings').delete().eq('id', recordingId);
        if (error) throw new CallRecordingError(error.message);
      } catch (error) {
        logger.error('Failed to delete recording', { recordingId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallRecordingError('Failed to delete recording');
      }
    },

    async getCallStats(schoolId: string): Promise<CallStats> {
      try {
        const { data: calls } = await supabase.from('calls').select('id, status, started_at, ended_at, duration_seconds').eq('school_id', schoolId);
        const callsList = (calls || []) as any[];
        const now = new Date();
        const dayAgo = new Date(now.getTime() - 86400000).toISOString();
        return {
          totalCalls: callsList.length, activeCalls: callsList.filter(c => c.status === 'active').length,
          missedCalls: callsList.filter(c => c.status === 'missed').length,
          callsLast24h: callsList.filter(c => c.started_at >= dayAgo).length,
          averageDurationSeconds: callsList.length > 0 ? Math.round(callsList.reduce((s: number, c: any) => s + (c.duration_seconds || 0), 0) / callsList.length) : 0,
          totalDurationSeconds: callsList.reduce((s: number, c: any) => s + (c.duration_seconds || 0), 0),
        };
      } catch (error) {
        logger.error('Failed to get call stats', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallError('Failed to get call stats');
      }
    },

    async endAllActiveCalls(schoolId: string): Promise<void> {
      try {
        await supabase.from('calls').update({ status: 'ended', ended_at: new Date().toISOString() }).eq('school_id', schoolId).eq('status', 'active');
      } catch (error) {
        logger.error('Failed to end all active calls', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CallError('Failed to end active calls');
      }
    },

    // ─── Email ────────────────────────────────────────────────────────────────
    async sendEmail(data: Partial<Email>, schoolId: string): Promise<Email> {
      try {
        if (!data.to || data.to.length === 0) throw new ValidationError('Email recipients are required');
        if (!data.subject) throw new ValidationError('Email subject is required');
        const payload = { ...data, school_id: schoolId, status: 'sent', sent_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: email, error } = await supabase.from('emails').insert(payload).select().single();
        if (error) throw new EmailSendError(error.message);
        return email as unknown as Email;
      } catch (error) {
        logger.error('Failed to send email', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailSendError('Failed to send email');
      }
    },

    async getEmails(schoolId: string, filters?: Record<string, unknown>): Promise<Email[]> {
      try {
        let query = supabase.from('emails').select('*').eq('school_id', schoolId);
        if (filters?.status) query = query.eq('status', filters.status);
        if (filters?.folder) query = query.eq('folder', filters.folder);
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new EmailNotFoundError(error.message);
        return (data || []) as unknown as Email[];
      } catch (error) {
        logger.error('Failed to get emails', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailNotFoundError('Failed to retrieve emails');
      }
    },

    async getEmail(emailId: string): Promise<Email> {
      try {
        const { data, error } = await supabase.from('emails').select('*').eq('id', emailId).single();
        if (error || !data) throw new EmailNotFoundError(emailId);
        return data as unknown as Email;
      } catch (error) {
        logger.error('Failed to get email', { emailId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailNotFoundError(emailId);
      }
    },

    async updateEmail(emailId: string, data: Partial<Email>): Promise<Email> {
      try {
        const { data: existing } = await supabase.from('emails').select('id').eq('id', emailId).single();
        if (!existing) throw new EmailNotFoundError(emailId);
        const { data: email, error } = await supabase.from('emails').update(data).eq('id', emailId).select().single();
        if (error) throw new EmailNotFoundError(error.message);
        return email as unknown as Email;
      } catch (error) {
        logger.error('Failed to update email', { emailId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailNotFoundError('Failed to update email');
      }
    },

    async deleteEmail(emailId: string): Promise<void> {
      try {
        const { error } = await supabase.from('emails').delete().eq('id', emailId);
        if (error) throw new EmailNotFoundError(error.message);
      } catch (error) {
        logger.error('Failed to delete email', { emailId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailNotFoundError('Failed to delete email');
      }
    },

    async getTemplates(schoolId: string): Promise<EmailTemplate[]> {
      try {
        const { data, error } = await supabase.from('email_templates').select('*').eq('school_id', schoolId).order('name', { ascending: true });
        if (error) throw new EmailTemplateNotFoundError(error.message);
        return (data || []) as unknown as EmailTemplate[];
      } catch (error) {
        logger.error('Failed to get email templates', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailTemplateNotFoundError('Failed to retrieve templates');
      }
    },

    async createTemplate(data: Partial<EmailTemplate>, schoolId: string): Promise<EmailTemplate> {
      try {
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: template, error } = await supabase.from('email_templates').insert(payload).select().single();
        if (error) throw new EmailTemplateNotFoundError(error.message);
        return template as unknown as EmailTemplate;
      } catch (error) {
        logger.error('Failed to create email template', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailTemplateNotFoundError('Failed to create template');
      }
    },

    async updateTemplate(templateId: string, data: Partial<EmailTemplate>): Promise<EmailTemplate> {
      try {
        const { data: template, error } = await supabase.from('email_templates').update({ ...data, updated_at: new Date().toISOString() }).eq('id', templateId).select().single();
        if (error || !template) throw new EmailTemplateNotFoundError(templateId);
        return template as unknown as EmailTemplate;
      } catch (error) {
        logger.error('Failed to update email template', { templateId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailTemplateNotFoundError('Failed to update template');
      }
    },

    async deleteTemplate(templateId: string): Promise<void> {
      try {
        const { error } = await supabase.from('email_templates').delete().eq('id', templateId);
        if (error) throw new EmailTemplateNotFoundError(error.message);
      } catch (error) {
        logger.error('Failed to delete email template', { templateId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailTemplateNotFoundError('Failed to delete template');
      }
    },

    async getCampaigns(schoolId: string): Promise<EmailCampaign[]> {
      try {
        const { data, error } = await supabase.from('email_campaigns').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new EmailTemplateNotFoundError(error.message);
        return (data || []) as unknown as EmailCampaign[];
      } catch (error) {
        logger.error('Failed to get email campaigns', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailTemplateNotFoundError('Failed to retrieve campaigns');
      }
    },

    async createCampaign(data: Partial<EmailCampaign>, schoolId: string): Promise<EmailCampaign> {
      try {
        const payload = { ...data, school_id: schoolId, status: 'draft', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: campaign, error } = await supabase.from('email_campaigns').insert(payload).select().single();
        if (error) throw new EmailTemplateNotFoundError(error.message);
        return campaign as unknown as EmailCampaign;
      } catch (error) {
        logger.error('Failed to create email campaign', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailTemplateNotFoundError('Failed to create campaign');
      }
    },

    async getSignatures(schoolId: string): Promise<EmailSignature[]> {
      try {
        const { data, error } = await supabase.from('email_signatures').select('*').eq('school_id', schoolId);
        if (error) throw new EmailTemplateNotFoundError(error.message);
        return (data || []) as unknown as EmailSignature[];
      } catch (error) {
        logger.error('Failed to get email signatures', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailTemplateNotFoundError('Failed to retrieve signatures');
      }
    },

    async getEmailStats(schoolId: string): Promise<EmailStats> {
      try {
        const { data: emails } = await supabase.from('emails').select('id, status, created_at, opened_at, clicked_at').eq('school_id', schoolId);
        const list = (emails || []) as any[];
        return {
          totalEmails: list.length, sentEmails: list.filter(e => e.status === 'sent').length,
          deliveredEmails: list.filter(e => e.status === 'delivered').length,
          openedEmails: list.filter(e => e.opened_at).length, clickedEmails: list.filter(e => e.clicked_at).length,
          bouncedEmails: list.filter(e => e.status === 'bounced').length,
          openRate: list.length > 0 ? (list.filter(e => e.opened_at).length / list.length) * 100 : 0,
          clickRate: list.length > 0 ? (list.filter(e => e.clicked_at).length / list.length) * 100 : 0,
        };
      } catch (error) {
        logger.error('Failed to get email stats', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new EmailTemplateNotFoundError('Failed to get email stats');
      }
    },

    // ─── SMS ──────────────────────────────────────────────────────────────────
    async sendSms(data: Partial<SmsMessage>, schoolId: string): Promise<SmsMessage> {
      try {
        if (!data.to) throw new ValidationError('SMS recipient is required');
        if (!data.body) throw new ValidationError('SMS body is required');
        const payload = { ...data, school_id: schoolId, status: 'sent', sent_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: sms, error } = await supabase.from('sms_messages').insert(payload).select().single();
        if (error) throw new SmsSendError(error.message);
        return sms as unknown as SmsMessage;
      } catch (error) {
        logger.error('Failed to send SMS', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new SmsSendError('Failed to send SMS');
      }
    },

    async getSmsMessages(schoolId: string, filters?: Record<string, unknown>): Promise<SmsMessage[]> {
      try {
        let query = supabase.from('sms_messages').select('*').eq('school_id', schoolId);
        if (filters?.status) query = query.eq('status', filters.status);
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new SmsNotFoundError(error.message);
        return (data || []) as unknown as SmsMessage[];
      } catch (error) {
        logger.error('Failed to get SMS messages', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new SmsNotFoundError('Failed to retrieve SMS messages');
      }
    },

    async getSms(smsId: string): Promise<SmsMessage> {
      try {
        const { data, error } = await supabase.from('sms_messages').select('*').eq('id', smsId).single();
        if (error || !data) throw new SmsNotFoundError(smsId);
        return data as unknown as SmsMessage;
      } catch (error) {
        logger.error('Failed to get SMS', { smsId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new SmsNotFoundError(smsId);
      }
    },

    async getSmsTemplates(schoolId: string): Promise<SmsTemplate[]> {
      try {
        const { data, error } = await supabase.from('sms_templates').select('*').eq('school_id', schoolId).order('name', { ascending: true });
        if (error) throw new SmsNotFoundError(error.message);
        return (data || []) as unknown as SmsTemplate[];
      } catch (error) {
        logger.error('Failed to get SMS templates', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new SmsNotFoundError('Failed to retrieve SMS templates');
      }
    },

    async createSmsTemplate(data: Partial<SmsTemplate>, schoolId: string): Promise<SmsTemplate> {
      try {
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: template, error } = await supabase.from('sms_templates').insert(payload).select().single();
        if (error) throw new SmsNotFoundError(error.message);
        return template as unknown as SmsTemplate;
      } catch (error) {
        logger.error('Failed to create SMS template', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new SmsNotFoundError('Failed to create SMS template');
      }
    },

    async sendBulkSms(data: Partial<SmsBulk>, schoolId: string): Promise<SmsBulk> {
      try {
        if (!data.recipients || data.recipients.length === 0) throw new ValidationError('SMS recipients are required');
        const payload = { ...data, school_id: schoolId, status: 'processing', total_recipients: data.recipients.length, sent_count: 0, created_at: new Date().toISOString() };
        const { data: bulk, error } = await supabase.from('sms_bulks').insert(payload).select().single();
        if (error) throw new SmsSendError(error.message);
        return bulk as unknown as SmsBulk;
      } catch (error) {
        logger.error('Failed to send bulk SMS', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new SmsSendError('Failed to send bulk SMS');
      }
    },

    async getSmsBulk(bulkId: string): Promise<SmsBulk> {
      try {
        const { data, error } = await supabase.from('sms_bulks').select('*').eq('id', bulkId).single();
        if (error || !data) throw new SmsNotFoundError(bulkId);
        return data as unknown as SmsBulk;
      } catch (error) {
        logger.error('Failed to get SMS bulk', { bulkId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new SmsNotFoundError('Failed to retrieve SMS bulk');
      }
    },

    async getSmsStats(schoolId: string): Promise<SmsStats> {
      try {
        const { data: sms } = await supabase.from('sms_messages').select('id, status, created_at').eq('school_id', schoolId);
        const list = (sms || []) as any[];
        return {
          totalSms: list.length, sentSms: list.filter(s => s.status === 'sent').length,
          deliveredSms: list.filter(s => s.status === 'delivered').length, failedSms: list.filter(s => s.status === 'failed').length,
          smsLast24h: list.filter(s => s.created_at >= new Date(Date.now() - 86400000).toISOString()).length,
          smsLast7d: list.filter(s => s.created_at >= new Date(Date.now() - 604800000).toISOString()).length,
          smsLast30d: list.filter(s => s.created_at >= new Date(Date.now() - 2592000000).toISOString()).length,
          deliveryRate: list.length > 0 ? (list.filter(s => s.status === 'delivered').length / list.length) * 100 : 0,
        };
      } catch (error) {
        logger.error('Failed to get SMS stats', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new SmsNotFoundError('Failed to get SMS stats');
      }
    },

    // ─── Push Notifications ───────────────────────────────────────────────────
    async sendPushNotification(data: Partial<PushNotification>, schoolId: string): Promise<PushNotification> {
      try {
        if (!data.title) throw new ValidationError('Push notification title is required');
        const payload = { ...data, school_id: schoolId, status: 'sent', sent_at: new Date().toISOString(), created_at: new Date().toISOString() };
        const { data: notification, error } = await supabase.from('push_notifications').insert(payload).select().single();
        if (error) throw new PushSendError(error.message);
        return notification as unknown as PushNotification;
      } catch (error) {
        logger.error('Failed to send push notification', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PushSendError('Failed to send push notification');
      }
    },

    async getPushNotifications(schoolId: string): Promise<PushNotification[]> {
      try {
        const { data, error } = await supabase.from('push_notifications').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new PushNotFoundError(error.message);
        return (data || []) as unknown as PushNotification[];
      } catch (error) {
        logger.error('Failed to get push notifications', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PushNotFoundError('Failed to retrieve push notifications');
      }
    },

    async getPushSubscription(userId: string): Promise<PushSubscription[]> {
      try {
        const { data, error } = await supabase.from('push_subscriptions').select('*').eq('user_id', userId);
        if (error) throw new PushNotFoundError(error.message);
        return (data || []) as unknown as PushSubscription[];
      } catch (error) {
        logger.error('Failed to get push subscription', { userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PushNotFoundError('Failed to retrieve push subscriptions');
      }
    },

    async subscribePush(data: Partial<PushSubscription>): Promise<PushSubscription> {
      try {
        if (!data.endpoint) throw new ValidationError('Push endpoint is required');
        const payload = { ...data, created_at: new Date().toISOString() };
        const { data: subscription, error } = await supabase.from('push_subscriptions').upsert(payload).select().single();
        if (error) throw new PushSendError(error.message);
        return subscription as unknown as PushSubscription;
      } catch (error) {
        logger.error('Failed to subscribe push', { error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PushSendError('Failed to subscribe push');
      }
    },

    async unsubscribePush(userId: string, endpoint: string): Promise<void> {
      try {
        const { error } = await supabase.from('push_subscriptions').delete().eq('user_id', userId).eq('endpoint', endpoint);
        if (error) throw new PushSendError(error.message);
      } catch (error) {
        logger.error('Failed to unsubscribe push', { userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PushSendError('Failed to unsubscribe push');
      }
    },

    async getPushTemplates(schoolId: string): Promise<PushTemplate[]> {
      try {
        const { data, error } = await supabase.from('push_templates').select('*').eq('school_id', schoolId);
        if (error) throw new PushNotFoundError(error.message);
        return (data || []) as unknown as PushTemplate[];
      } catch (error) {
        logger.error('Failed to get push templates', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PushNotFoundError('Failed to retrieve push templates');
      }
    },

    async createPushTemplate(data: Partial<PushTemplate>, schoolId: string): Promise<PushTemplate> {
      try {
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: template, error } = await supabase.from('push_templates').insert(payload).select().single();
        if (error) throw new PushNotFoundError(error.message);
        return template as unknown as PushTemplate;
      } catch (error) {
        logger.error('Failed to create push template', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PushNotFoundError('Failed to create push template');
      }
    },

    async getPushStats(schoolId: string): Promise<{ totalSent: number; delivered: number; failed: number; clicked: number }> {
      try {
        const { data: pushes } = await supabase.from('push_notifications').select('id, status, clicked_at').eq('school_id', schoolId);
        const list = (pushes || []) as any[];
        return {
          totalSent: list.length, delivered: list.filter(p => p.status === 'delivered').length,
          failed: list.filter(p => p.status === 'failed').length, clicked: list.filter(p => p.clicked_at).length,
        };
      } catch (error) {
        logger.error('Failed to get push stats', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PushNotFoundError('Failed to get push stats');
      }
    },

    // ─── Announcements ────────────────────────────────────────────────────────
    async getAnnouncements(schoolId: string, filters?: Record<string, unknown>): Promise<Announcement[]> {
      try {
        let query = supabase.from('announcements').select('*').eq('school_id', schoolId);
        if (filters?.status) query = query.eq('status', filters.status);
        if (filters?.priority) query = query.eq('priority', filters.priority);
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new CommAnnouncementNotFoundError(error.message);
        return (data || []) as unknown as Announcement[];
      } catch (error) {
        logger.error('Failed to get announcements', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAnnouncementNotFoundError('Failed to retrieve announcements');
      }
    },

    async getAnnouncement(announcementId: string): Promise<Announcement> {
      try {
        const { data, error } = await supabase.from('announcements').select('*').eq('id', announcementId).single();
        if (error || !data) throw new CommAnnouncementNotFoundError(announcementId);
        return data as unknown as Announcement;
      } catch (error) {
        logger.error('Failed to get announcement', { announcementId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAnnouncementNotFoundError(announcementId);
      }
    },

    async createAnnouncement(data: Partial<Announcement>, schoolId: string): Promise<Announcement> {
      try {
        if (!data.title) throw new ValidationError('Announcement title is required');
        const payload = { ...data, school_id: schoolId, status: 'draft', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: announcement, error } = await supabase.from('announcements').insert(payload).select().single();
        if (error) throw new CommAnnouncementNotFoundError(error.message);
        return announcement as unknown as Announcement;
      } catch (error) {
        logger.error('Failed to create announcement', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAnnouncementNotFoundError('Failed to create announcement');
      }
    },

    async updateAnnouncement(announcementId: string, data: Partial<Announcement>): Promise<Announcement> {
      try {
        const { data: existing } = await supabase.from('announcements').select('id').eq('id', announcementId).single();
        if (!existing) throw new CommAnnouncementNotFoundError(announcementId);
        const { data: announcement, error } = await supabase.from('announcements').update({ ...data, updated_at: new Date().toISOString() }).eq('id', announcementId).select().single();
        if (error) throw new CommAnnouncementNotFoundError(error.message);
        return announcement as unknown as Announcement;
      } catch (error) {
        logger.error('Failed to update announcement', { announcementId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAnnouncementNotFoundError('Failed to update announcement');
      }
    },

    async deleteAnnouncement(announcementId: string): Promise<void> {
      try {
        const { error } = await supabase.from('announcements').delete().eq('id', announcementId);
        if (error) throw new CommAnnouncementNotFoundError(error.message);
      } catch (error) {
        logger.error('Failed to delete announcement', { announcementId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAnnouncementNotFoundError('Failed to delete announcement');
      }
    },

    async publishAnnouncement(announcementId: string): Promise<Announcement> {
      try {
        const { data: announcement, error } = await supabase.from('announcements').update({ status: 'published', published_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', announcementId).select().single();
        if (error || !announcement) throw new CommAnnouncementNotFoundError(announcementId);
        return announcement as unknown as Announcement;
      } catch (error) {
        logger.error('Failed to publish announcement', { announcementId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAnnouncementNotFoundError('Failed to publish announcement');
      }
    },

    async acknowledgeAnnouncement(announcementId: string, userId: string): Promise<void> {
      try {
        const { error } = await supabase.from('announcement_acknowledgments').upsert({ announcement_id: announcementId, user_id: userId, acknowledged_at: new Date().toISOString() });
        if (error) throw new AnnouncementAcknowledgeError(error.message);
      } catch (error) {
        logger.error('Failed to acknowledge announcement', { announcementId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new AnnouncementAcknowledgeError('Failed to acknowledge announcement');
      }
    },

    async getAnnouncementStats(announcementId: string): Promise<AnnouncementStats> {
      try {
        const { data: announcement } = await supabase.from('announcements').select('*').eq('id', announcementId).single();
        const { data: acks } = await supabase.from('announcement_acknowledgments').select('id').eq('announcement_id', announcementId);
        const { data: views } = await supabase.from('announcement_views').select('id').eq('announcement_id', announcementId);
        return {
          totalAnnouncements: 1, publishedAnnouncements: (announcement as any)?.status === 'published' ? 1 : 0,
          draftAnnouncements: (announcement as any)?.status === 'draft' ? 1 : 0,
          totalViews: (views || []).length, totalAcknowledgments: (acks || []).length,
          acknowledgmentRate: (views || []).length > 0 ? ((acks || []).length / (views || []).length) * 100 : 0,
        };
      } catch (error) {
        logger.error('Failed to get announcement stats', { announcementId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAnnouncementNotFoundError('Failed to get announcement stats');
      }
    },

    // ─── Calendar ─────────────────────────────────────────────────────────────
    async getCalendarEvents(schoolId: string, filters?: Record<string, unknown>): Promise<CalendarEvent[]> {
      try {
        let query = supabase.from('calendar_events').select('*').eq('school_id', schoolId);
        if (filters?.from) query = query.gte('start_time', filters.from);
        if (filters?.to) query = query.lte('end_time', filters.to);
        query = query.order('start_time', { ascending: true });
        const { data, error } = await query;
        if (error) throw new CommCalendarError(error.message);
        return (data || []) as unknown as CalendarEvent[];
      } catch (error) {
        logger.error('Failed to get calendar events', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarError('Failed to retrieve calendar events');
      }
    },

    async getCalendarEvent(eventId: string): Promise<CalendarEvent> {
      try {
        const { data, error } = await supabase.from('calendar_events').select('*').eq('id', eventId).single();
        if (error || !data) throw new CommCalendarEventNotFoundError(eventId);
        return data as unknown as CalendarEvent;
      } catch (error) {
        logger.error('Failed to get calendar event', { eventId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarEventNotFoundError(eventId);
      }
    },

    async createCalendarEvent(data: Partial<CalendarEvent>, schoolId: string): Promise<CalendarEvent> {
      try {
        if (!data.title) throw new ValidationError('Event title is required');
        if (!data.startTime) throw new ValidationError('Event start time is required');
        const { data: conflict } = await supabase.from('calendar_events').select('id').eq('school_id', schoolId).gte('end_time', data.startTime).lte('start_time', data.endTime || data.startTime).single();
        if (conflict) throw new CommCalendarEventConflictError(data.startTime);
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: event, error } = await supabase.from('calendar_events').insert(payload).select().single();
        if (error) throw new CommCalendarError(error.message);
        return event as unknown as CalendarEvent;
      } catch (error) {
        logger.error('Failed to create calendar event', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarError('Failed to create calendar event');
      }
    },

    async updateCalendarEvent(eventId: string, data: Partial<CalendarEvent>): Promise<CalendarEvent> {
      try {
        const { data: existing } = await supabase.from('calendar_events').select('id').eq('id', eventId).single();
        if (!existing) throw new CommCalendarEventNotFoundError(eventId);
        const { data: event, error } = await supabase.from('calendar_events').update({ ...data, updated_at: new Date().toISOString() }).eq('id', eventId).select().single();
        if (error) throw new CommCalendarError(error.message);
        return event as unknown as CalendarEvent;
      } catch (error) {
        logger.error('Failed to update calendar event', { eventId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarError('Failed to update calendar event');
      }
    },

    async deleteCalendarEvent(eventId: string): Promise<void> {
      try {
        const { error } = await supabase.from('calendar_events').delete().eq('id', eventId);
        if (error) throw new CommCalendarEventNotFoundError(error.message);
      } catch (error) {
        logger.error('Failed to delete calendar event', { eventId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarEventNotFoundError('Failed to delete calendar event');
      }
    },

    async getCalendarSubscriptions(schoolId: string): Promise<CalendarSubscription[]> {
      try {
        const { data, error } = await supabase.from('calendar_subscriptions').select('*').eq('school_id', schoolId);
        if (error) throw new CommCalendarError(error.message);
        return (data || []) as unknown as CalendarSubscription[];
      } catch (error) {
        logger.error('Failed to get calendar subscriptions', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarError('Failed to retrieve calendar subscriptions');
      }
    },

    async subscribeCalendar(data: Partial<CalendarSubscription>, schoolId: string): Promise<CalendarSubscription> {
      try {
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString() };
        const { data: sub, error } = await supabase.from('calendar_subscriptions').insert(payload).select().single();
        if (error) throw new CommCalendarError(error.message);
        return sub as unknown as CalendarSubscription;
      } catch (error) {
        logger.error('Failed to subscribe calendar', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarError('Failed to subscribe calendar');
      }
    },

    async unsubscribeCalendar(subscriptionId: string): Promise<void> {
      try {
        const { error } = await supabase.from('calendar_subscriptions').delete().eq('id', subscriptionId);
        if (error) throw new CommCalendarError(error.message);
      } catch (error) {
        logger.error('Failed to unsubscribe calendar', { subscriptionId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarError('Failed to unsubscribe calendar');
      }
    },

    async getUpcomingEvents(schoolId: string, days?: number): Promise<CalendarEvent[]> {
      try {
        const limit = days || 7;
        const now = new Date().toISOString();
        const future = new Date(Date.now() + limit * 86400000).toISOString();
        const { data, error } = await supabase.from('calendar_events').select('*').eq('school_id', schoolId).gte('start_time', now).lte('start_time', future).order('start_time', { ascending: true });
        if (error) throw new CommCalendarError(error.message);
        return (data || []) as unknown as CalendarEvent[];
      } catch (error) {
        logger.error('Failed to get upcoming events', { schoolId, days, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarError('Failed to retrieve upcoming events');
      }
    },

    async rsvpCalendarEvent(eventId: string, userId: string, status: string): Promise<void> {
      try {
        const { error } = await supabase.from('calendar_event_rsvps').upsert({ event_id: eventId, user_id: userId, status, updated_at: new Date().toISOString() });
        if (error) throw new CommCalendarError(error.message);
      } catch (error) {
        logger.error('Failed to RSVP calendar event', { eventId, userId, status, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCalendarError('Failed to RSVP to event');
      }
    },

    // ─── Tasks ────────────────────────────────────────────────────────────────
    async getTasks(schoolId: string, filters?: Record<string, unknown>): Promise<Task[]> {
      try {
        let query = supabase.from('tasks').select('*').eq('school_id', schoolId);
        if (filters?.status) query = query.eq('status', filters.status);
        if (filters?.priority) query = query.eq('priority', filters.priority);
        if (filters?.assignedTo) query = query.eq('assigned_to', filters.assignedTo);
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new CommTaskError(error.message);
        return (data || []) as unknown as Task[];
      } catch (error) {
        logger.error('Failed to get tasks', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskError('Failed to retrieve tasks');
      }
    },

    async getTask(taskId: string): Promise<Task> {
      try {
        const { data, error } = await supabase.from('tasks').select('*').eq('id', taskId).single();
        if (error || !data) throw new CommTaskNotFoundError(taskId);
        return data as unknown as Task;
      } catch (error) {
        logger.error('Failed to get task', { taskId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskNotFoundError(taskId);
      }
    },

    async createTask(data: Partial<Task>, schoolId: string): Promise<Task> {
      try {
        if (!data.title) throw new ValidationError('Task title is required');
        const payload = { ...data, school_id: schoolId, status: 'todo', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: task, error } = await supabase.from('tasks').insert(payload).select().single();
        if (error) throw new CommTaskError(error.message);
        return task as unknown as Task;
      } catch (error) {
        logger.error('Failed to create task', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskError('Failed to create task');
      }
    },

    async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
      try {
        const { data: existing } = await supabase.from('tasks').select('id').eq('id', taskId).single();
        if (!existing) throw new CommTaskNotFoundError(taskId);
        const { data: task, error } = await supabase.from('tasks').update({ ...data, updated_at: new Date().toISOString() }).eq('id', taskId).select().single();
        if (error) throw new CommTaskError(error.message);
        return task as unknown as Task;
      } catch (error) {
        logger.error('Failed to update task', { taskId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskError('Failed to update task');
      }
    },

    async deleteTask(taskId: string): Promise<void> {
      try {
        await supabase.from('task_checklists').delete().eq('task_id', taskId);
        await supabase.from('task_comments').delete().eq('task_id', taskId);
        const { error } = await supabase.from('tasks').delete().eq('id', taskId);
        if (error) throw new CommTaskError(error.message);
      } catch (error) {
        logger.error('Failed to delete task', { taskId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskError('Failed to delete task');
      }
    },

    async completeTask(taskId: string): Promise<Task> {
      try {
        const { data: task, error } = await supabase.from('tasks').update({ status: 'completed', completed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', taskId).select().single();
        if (error || !task) throw new CommTaskNotFoundError(taskId);
        return task as unknown as Task;
      } catch (error) {
        logger.error('Failed to complete task', { taskId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskError('Failed to complete task');
      }
    },

    async getTaskComments(taskId: string): Promise<TaskComment[]> {
      try {
        const { data, error } = await supabase.from('task_comments').select('*').eq('task_id', taskId).order('created_at', { ascending: true });
        if (error) throw new CommTaskError(error.message);
        return (data || []) as unknown as TaskComment[];
      } catch (error) {
        logger.error('Failed to get task comments', { taskId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskError('Failed to retrieve task comments');
      }
    },

    async addTaskComment(taskId: string, data: Partial<TaskComment>): Promise<TaskComment> {
      try {
        const payload = { ...data, task_id: taskId, created_at: new Date().toISOString() };
        const { data: comment, error } = await supabase.from('task_comments').insert(payload).select().single();
        if (error) throw new CommTaskError(error.message);
        return comment as unknown as TaskComment;
      } catch (error) {
        logger.error('Failed to add task comment', { taskId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskError('Failed to add task comment');
      }
    },

    async getTaskChecklist(taskId: string): Promise<TaskChecklist[]> {
      try {
        const { data, error } = await supabase.from('task_checklists').select('*').eq('task_id', taskId).order('created_at', { ascending: true });
        if (error) throw new CommTaskChecklistError(error.message);
        return (data || []) as unknown as TaskChecklist[];
      } catch (error) {
        logger.error('Failed to get task checklist', { taskId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskChecklistError('Failed to retrieve task checklist');
      }
    },

    async addTaskChecklistItem(taskId: string, data: Partial<TaskChecklist>): Promise<TaskChecklist> {
      try {
        const payload = { ...data, task_id: taskId, is_completed: false, created_at: new Date().toISOString() };
        const { data: item, error } = await supabase.from('task_checklists').insert(payload).select().single();
        if (error) throw new CommTaskChecklistError(error.message);
        return item as unknown as TaskChecklist;
      } catch (error) {
        logger.error('Failed to add task checklist item', { taskId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskChecklistError('Failed to add checklist item');
      }
    },

    async toggleTaskChecklistItem(itemId: string): Promise<TaskChecklist> {
      try {
        const { data: existing } = await supabase.from('task_checklists').select('*').eq('id', itemId).single();
        if (!existing) throw new CommTaskChecklistError('Checklist item not found');
        const { data: item, error } = await supabase.from('task_checklists').update({ is_completed: !(existing as any).is_completed }).eq('id', itemId).select().single();
        if (error) throw new CommTaskChecklistError(error.message);
        return item as unknown as TaskChecklist;
      } catch (error) {
        logger.error('Failed to toggle task checklist item', { itemId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommTaskChecklistError('Failed to toggle checklist item');
      }
    },

    // ─── Documents ────────────────────────────────────────────────────────────
    async getDocuments(schoolId: string, filters?: Record<string, unknown>): Promise<Document[]> {
      try {
        let query = supabase.from('documents').select('*').eq('school_id', schoolId);
        if (filters?.folderId) query = query.eq('folder_id', filters.folderId);
        if (filters?.type) query = query.eq('type', filters.type);
        query = query.order('updated_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new CommDocumentError(error.message);
        return (data || []) as unknown as Document[];
      } catch (error) {
        logger.error('Failed to get documents', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentError('Failed to retrieve documents');
      }
    },

    async getDocument(documentId: string): Promise<Document> {
      try {
        const { data, error } = await supabase.from('documents').select('*').eq('id', documentId).single();
        if (error || !data) throw new CommDocumentNotFoundError(documentId);
        return data as unknown as Document;
      } catch (error) {
        logger.error('Failed to get document', { documentId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentNotFoundError(documentId);
      }
    },

    async createDocument(data: Partial<Document>, schoolId: string): Promise<Document> {
      try {
        if (!data.title) throw new ValidationError('Document title is required');
        const payload = { ...data, school_id: schoolId, version: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: doc, error } = await supabase.from('documents').insert(payload).select().single();
        if (error) throw new CommDocumentError(error.message);
        return doc as unknown as Document;
      } catch (error) {
        logger.error('Failed to create document', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentError('Failed to create document');
      }
    },

    async updateDocument(documentId: string, data: Partial<Document>): Promise<Document> {
      try {
        const { data: existing } = await supabase.from('documents').select('*').eq('id', documentId).single();
        if (!existing) throw new CommDocumentNotFoundError(documentId);
        const newVersion = ((existing as any).version || 0) + 1;
        const { data: doc, error } = await supabase.from('documents').update({ ...data, version: newVersion, updated_at: new Date().toISOString() }).eq('id', documentId).select().single();
        if (error) throw new CommDocumentError(error.message);
        await supabase.from('document_versions').insert({ document_id: documentId, version: newVersion, content: data.content || (existing as any).content, updated_by: data.updatedBy, created_at: new Date().toISOString() });
        return doc as unknown as Document;
      } catch (error) {
        logger.error('Failed to update document', { documentId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentError('Failed to update document');
      }
    },

    async deleteDocument(documentId: string): Promise<void> {
      try {
        await supabase.from('document_comments').delete().eq('document_id', documentId);
        await supabase.from('document_versions').delete().eq('document_id', documentId);
        const { error } = await supabase.from('documents').delete().eq('id', documentId);
        if (error) throw new CommDocumentError(error.message);
      } catch (error) {
        logger.error('Failed to delete document', { documentId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentError('Failed to delete document');
      }
    },

    async moveDocument(documentId: string, targetFolderId: string): Promise<Document> {
      try {
        const { data: existing } = await supabase.from('documents').select('*').eq('id', documentId).single();
        if (!existing) throw new CommDocumentNotFoundError(documentId);
        const { data: doc, error } = await supabase.from('documents').update({ folder_id: targetFolderId, updated_at: new Date().toISOString() }).eq('id', documentId).select().single();
        if (error) throw new CommDocumentMoveError(documentId);
        return doc as unknown as Document;
      } catch (error) {
        logger.error('Failed to move document', { documentId, targetFolderId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentMoveError(documentId);
      }
    },

    async shareDocument(documentId: string, userId: string, permission: string): Promise<void> {
      try {
        const { error } = await supabase.from('document_shares').upsert({ document_id: documentId, user_id: userId, permission, created_at: new Date().toISOString() });
        if (error) throw new CommDocumentShareError(error.message);
      } catch (error) {
        logger.error('Failed to share document', { documentId, userId, permission, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentShareError('Failed to share document');
      }
    },

    async getDocumentVersions(documentId: string): Promise<DocumentVersion[]> {
      try {
        const { data, error } = await supabase.from('document_versions').select('*').eq('document_id', documentId).order('version', { ascending: false });
        if (error) throw new CommDocumentVersionError(error.message);
        return (data || []) as unknown as DocumentVersion[];
      } catch (error) {
        logger.error('Failed to get document versions', { documentId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentVersionError('Failed to retrieve document versions');
      }
    },

    async restoreDocumentVersion(documentId: string, version: number): Promise<Document> {
      try {
        const { data: versionData } = await supabase.from('document_versions').select('*').eq('document_id', documentId).eq('version', version).single();
        if (!versionData) throw new CommDocumentVersionError('Version not found');
        const { data: doc, error } = await supabase.from('documents').update({ content: (versionData as any).content, updated_at: new Date().toISOString() }).eq('id', documentId).select().single();
        if (error) throw new CommDocumentError(error.message);
        return doc as unknown as Document;
      } catch (error) {
        logger.error('Failed to restore document version', { documentId, version, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentVersionError('Failed to restore version');
      }
    },

    async getDocumentComments(documentId: string): Promise<DocumentComment[]> {
      try {
        const { data, error } = await supabase.from('document_comments').select('*').eq('document_id', documentId).order('created_at', { ascending: true });
        if (error) throw new CommDocumentCommentError(error.message);
        return (data || []) as unknown as DocumentComment[];
      } catch (error) {
        logger.error('Failed to get document comments', { documentId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentCommentError('Failed to retrieve document comments');
      }
    },

    async addDocumentComment(documentId: string, data: Partial<DocumentComment>): Promise<DocumentComment> {
      try {
        const payload = { ...data, document_id: documentId, created_at: new Date().toISOString() };
        const { data: comment, error } = await supabase.from('document_comments').insert(payload).select().single();
        if (error) throw new CommDocumentCommentError(error.message);
        return comment as unknown as DocumentComment;
      } catch (error) {
        logger.error('Failed to add document comment', { documentId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommDocumentCommentError('Failed to add document comment');
      }
    },

    // ─── Collaboration ────────────────────────────────────────────────────────
    async getCollaborationSessions(schoolId: string): Promise<CollaborationSession[]> {
      try {
        const { data, error } = await supabase.from('collaboration_sessions').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new CommCollaborationError(error.message);
        return (data || []) as unknown as CollaborationSession[];
      } catch (error) {
        logger.error('Failed to get collaboration sessions', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCollaborationError('Failed to retrieve collaboration sessions');
      }
    },

    async startCollaborationSession(data: Partial<CollaborationSession>, schoolId: string): Promise<CollaborationSession> {
      try {
        const payload = { ...data, school_id: schoolId, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: session, error } = await supabase.from('collaboration_sessions').insert(payload).select().single();
        if (error) throw new CommCollaborationSessionError(error.message);
        return session as unknown as CollaborationSession;
      } catch (error) {
        logger.error('Failed to start collaboration session', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCollaborationSessionError('Failed to start collaboration session');
      }
    },

    async joinCollaborationSession(sessionId: string, userId: string): Promise<CollaborationPresence> {
      try {
        const payload = { session_id: sessionId, user_id: userId, status: 'active', joined_at: new Date().toISOString(), last_active: new Date().toISOString() };
        const { data: presence, error } = await supabase.from('collaboration_presence').upsert(payload).select().single();
        if (error) throw new CommCollaborationPresenceError(error.message);
        return presence as unknown as CollaborationPresence;
      } catch (error) {
        logger.error('Failed to join collaboration session', { sessionId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCollaborationPresenceError('Failed to join collaboration session');
      }
    },

    async leaveCollaborationSession(sessionId: string, userId: string): Promise<void> {
      try {
        const { error } = await supabase.from('collaboration_presence').update({ status: 'left', left_at: new Date().toISOString() }).eq('session_id', sessionId).eq('user_id', userId);
        if (error) throw new CommCollaborationPresenceError(error.message);
      } catch (error) {
        logger.error('Failed to leave collaboration session', { sessionId, userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCollaborationPresenceError('Failed to leave collaboration session');
      }
    },

    async getCollaborationPresence(sessionId: string): Promise<CollaborationPresence[]> {
      try {
        const { data, error } = await supabase.from('collaboration_presence').select('*').eq('session_id', sessionId).eq('status', 'active');
        if (error) throw new CommCollaborationPresenceError(error.message);
        return (data || []) as unknown as CollaborationPresence[];
      } catch (error) {
        logger.error('Failed to get collaboration presence', { sessionId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCollaborationPresenceError('Failed to retrieve collaboration presence');
      }
    },

    // ─── AI ───────────────────────────────────────────────────────────────────
    async generateSummary(content: string, schoolId: string): Promise<AISummary> {
      try {
        if (!content || content.trim().length < 10) throw new CommAIError('Content too short for summarization');
        const payload = { original_content: content, summary: content.substring(0, 200), school_id: schoolId, model: 'default', created_at: new Date().toISOString() };
        const { data: summary, error } = await supabase.from('ai_summaries').insert(payload).select().single();
        if (error) throw new CommAIError(error.message);
        return summary as unknown as AISummary;
      } catch (error) {
        logger.error('Failed to generate summary', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAIError('Failed to generate summary');
      }
    },

    async getSummaries(schoolId: string): Promise<AISummary[]> {
      try {
        const { data, error } = await supabase.from('ai_summaries').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new CommAIError(error.message);
        return (data || []) as unknown as AISummary[];
      } catch (error) {
        logger.error('Failed to get summaries', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAIError('Failed to retrieve summaries');
      }
    },

    async translateMessage(messageId: string, targetLanguage: string): Promise<AITranslation> {
      try {
        const { data: message } = await supabase.from('messages').select('*').eq('id', messageId).single();
        if (!message) throw new CommMessageNotFoundError(messageId);
        const payload = { message_id: messageId, target_language: targetLanguage, original_text: (message as any).content, translated_text: (message as any).content, model: 'default', created_at: new Date().toISOString() };
        const { data: translation, error } = await supabase.from('ai_translations').insert(payload).select().single();
        if (error) throw new CommAIError(error.message);
        return translation as unknown as AITranslation;
      } catch (error) {
        logger.error('Failed to translate message', { messageId, targetLanguage, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAIError('Failed to translate message');
      }
    },

    async correctText(text: string, schoolId: string): Promise<AICorrection> {
      try {
        if (!text || text.trim().length < 5) throw new CommAIError('Text too short for correction');
        const payload = { original_text: text, corrected_text: text, school_id: schoolId, model: 'default', created_at: new Date().toISOString() };
        const { data: correction, error } = await supabase.from('ai_corrections').insert(payload).select().single();
        if (error) throw new CommAIError(error.message);
        return correction as unknown as AICorrection;
      } catch (error) {
        logger.error('Failed to correct text', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAIError('Failed to correct text');
      }
    },

    async generateResponse(context: string, schoolId: string): Promise<AIResponse> {
      try {
        if (!context || context.trim().length < 10) throw new CommAIError('Context too short for response generation');
        const payload = { context, response: 'AI generated response', school_id: schoolId, model: 'default', created_at: new Date().toISOString() };
        const { data: response, error } = await supabase.from('ai_responses').insert(payload).select().single();
        if (error) throw new CommAIError(error.message);
        return response as unknown as AIResponse;
      } catch (error) {
        logger.error('Failed to generate response', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAIError('Failed to generate response');
      }
    },

    async generateMeetingSummary(transcript: string, schoolId: string): Promise<AIMeetingSummary> {
      try {
        if (!transcript || transcript.trim().length < 50) throw new CommAIError('Transcript too short for meeting summary');
        const payload = { transcript, summary: transcript.substring(0, 300), school_id: schoolId, model: 'default', created_at: new Date().toISOString() };
        const { data: summary, error } = await supabase.from('ai_meeting_summaries').insert(payload).select().single();
        if (error) throw new CommAIError(error.message);
        return summary as unknown as AIMeetingSummary;
      } catch (error) {
        logger.error('Failed to generate meeting summary', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAIError('Failed to generate meeting summary');
      }
    },

    async detectSpam(content: string, schoolId: string): Promise<AISpamDetection> {
      try {
        if (!content || content.trim().length < 5) throw new CommAIError('Content too short for spam detection');
        const payload = { content, is_spam: false, confidence: 0.0, school_id: schoolId, model: 'default', created_at: new Date().toISOString() };
        const { data: detection, error } = await supabase.from('ai_spam_detections').insert(payload).select().single();
        if (error) throw new CommAIError(error.message);
        return detection as unknown as AISpamDetection;
      } catch (error) {
        logger.error('Failed to detect spam', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAIError('Failed to detect spam');
      }
    },

    // ─── Notifications ────────────────────────────────────────────────────────
    async getNotifications(userId: string, filters?: Record<string, unknown>): Promise<Notification[]> {
      try {
        let query = supabase.from('notifications').select('*').eq('user_id', userId);
        if (filters?.read !== undefined) query = query.eq('is_read', filters.read);
        if (filters?.type) query = query.eq('type', filters.type);
        query = query.order('created_at', { ascending: false });
        const { data, error } = await query;
        if (error) throw new CommNotificationError(error.message);
        return (data || []) as unknown as Notification[];
      } catch (error) {
        logger.error('Failed to get notifications', { userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommNotificationError('Failed to retrieve notifications');
      }
    },

    async markNotificationAsRead(notificationId: string): Promise<Notification> {
      try {
        const { data: notification, error } = await supabase.from('notifications').update({ is_read: true, read_at: new Date().toISOString() }).eq('id', notificationId).select().single();
        if (error || !notification) throw new CommNotificationNotFoundError(notificationId);
        return notification as unknown as Notification;
      } catch (error) {
        logger.error('Failed to mark notification as read', { notificationId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommNotificationNotFoundError(notificationId);
      }
    },

    async markAllNotificationsAsRead(userId: string): Promise<void> {
      try {
        const { error } = await supabase.from('notifications').update({ is_read: true, read_at: new Date().toISOString() }).eq('user_id', userId).eq('is_read', false);
        if (error) throw new CommNotificationError(error.message);
      } catch (error) {
        logger.error('Failed to mark all notifications as read', { userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommNotificationError('Failed to mark all as read');
      }
    },

    async getNotificationPreferences(userId: string): Promise<NotificationPreference> {
      try {
        const { data, error } = await supabase.from('notification_preferences').select('*').eq('user_id', userId).single();
        if (error || !data) {
          const defaults = { user_id: userId, email_enabled: true, push_enabled: true, sms_enabled: false, in_app_enabled: true, created_at: new Date().toISOString() };
          const { data: created, error: createErr } = await supabase.from('notification_preferences').insert(defaults).select().single();
          if (createErr) throw new CommNotificationPreferenceError(createErr.message);
          return created as unknown as NotificationPreference;
        }
        return data as unknown as NotificationPreference;
      } catch (error) {
        logger.error('Failed to get notification preferences', { userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommNotificationPreferenceError('Failed to retrieve notification preferences');
      }
    },

    async updateNotificationPreferences(userId: string, data: Partial<NotificationPreference>): Promise<NotificationPreference> {
      try {
        const { data: existing } = await supabase.from('notification_preferences').select('id').eq('user_id', userId).single();
        if (existing) {
          const { data: prefs, error } = await supabase.from('notification_preferences').update({ ...data, updated_at: new Date().toISOString() }).eq('user_id', userId).select().single();
          if (error) throw new CommNotificationPreferenceError(error.message);
          return prefs as unknown as NotificationPreference;
        }
        const { data: prefs, error } = await supabase.from('notification_preferences').insert({ ...data, user_id: userId, created_at: new Date().toISOString() }).select().single();
        if (error) throw new CommNotificationPreferenceError(error.message);
        return prefs as unknown as NotificationPreference;
      } catch (error) {
        logger.error('Failed to update notification preferences', { userId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommNotificationPreferenceError('Failed to update notification preferences');
      }
    },

    async sendBatchNotifications(data: Partial<NotificationBatch>, schoolId: string): Promise<NotificationBatch> {
      try {
        const payload = { ...data, school_id: schoolId, status: 'processing', created_at: new Date().toISOString() };
        const { data: batch, error } = await supabase.from('notification_batches').insert(payload).select().single();
        if (error) throw new CommNotificationError(error.message);
        return batch as unknown as NotificationBatch;
      } catch (error) {
        logger.error('Failed to send batch notifications', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommNotificationError('Failed to send batch notifications');
      }
    },

    async getNotificationStats(schoolId: string): Promise<NotificationStats> {
      try {
        const { data: notifs } = await supabase.from('notifications').select('id, is_read, type, created_at').eq('school_id', schoolId);
        const list = (notifs || []) as any[];
        return {
          totalNotifications: list.length, unreadNotifications: list.filter(n => !n.is_read).length,
          notificationsLast24h: list.filter(n => n.created_at >= new Date(Date.now() - 86400000).toISOString()).length,
          notificationsLast7d: list.filter(n => n.created_at >= new Date(Date.now() - 604800000).toISOString()).length,
          readRate: list.length > 0 ? (list.filter(n => n.is_read).length / list.length) * 100 : 0,
        };
      } catch (error) {
        logger.error('Failed to get notification stats', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommNotificationError('Failed to get notification stats');
      }
    },

    // ─── Contacts ─────────────────────────────────────────────────────────────
    async getContacts(schoolId: string, filters?: Record<string, unknown>): Promise<Contact[]> {
      try {
        let query = supabase.from('contacts').select('*').eq('school_id', schoolId);
        if (filters?.groupId) query = query.eq('group_id', filters.groupId);
        if (filters?.search) query = query.ilike('name', `%${filters.search}%`);
        query = query.order('name', { ascending: true });
        const { data, error } = await query;
        if (error) throw new ContactError(error.message);
        return (data || []) as unknown as Contact[];
      } catch (error) {
        logger.error('Failed to get contacts', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ContactError('Failed to retrieve contacts');
      }
    },

    async getContact(contactId: string): Promise<Contact> {
      try {
        const { data, error } = await supabase.from('contacts').select('*').eq('id', contactId).single();
        if (error || !data) throw new ContactNotFoundError(contactId);
        return data as unknown as Contact;
      } catch (error) {
        logger.error('Failed to get contact', { contactId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ContactNotFoundError(contactId);
      }
    },

    async createContact(data: Partial<Contact>, schoolId: string): Promise<Contact> {
      try {
        if (!data.name) throw new ValidationError('Contact name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: contact, error } = await supabase.from('contacts').insert(payload).select().single();
        if (error) throw new ContactError(error.message);
        return contact as unknown as Contact;
      } catch (error) {
        logger.error('Failed to create contact', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ContactError('Failed to create contact');
      }
    },

    async updateContact(contactId: string, data: Partial<Contact>): Promise<Contact> {
      try {
        const { data: existing } = await supabase.from('contacts').select('id').eq('id', contactId).single();
        if (!existing) throw new ContactNotFoundError(contactId);
        const { data: contact, error } = await supabase.from('contacts').update({ ...data, updated_at: new Date().toISOString() }).eq('id', contactId).select().single();
        if (error) throw new ContactError(error.message);
        return contact as unknown as Contact;
      } catch (error) {
        logger.error('Failed to update contact', { contactId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ContactError('Failed to update contact');
      }
    },

    async deleteContact(contactId: string): Promise<void> {
      try {
        const { error } = await supabase.from('contacts').delete().eq('id', contactId);
        if (error) throw new ContactError(error.message);
      } catch (error) {
        logger.error('Failed to delete contact', { contactId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ContactError('Failed to delete contact');
      }
    },

    async getContactGroups(schoolId: string): Promise<ContactGroup[]> {
      try {
        const { data, error } = await supabase.from('contact_groups').select('*').eq('school_id', schoolId).order('name', { ascending: true });
        if (error) throw new ContactError(error.message);
        return (data || []) as unknown as ContactGroup[];
      } catch (error) {
        logger.error('Failed to get contact groups', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ContactError('Failed to retrieve contact groups');
      }
    },

    async createContactGroup(data: Partial<ContactGroup>, schoolId: string): Promise<ContactGroup> {
      try {
        if (!data.name) throw new ValidationError('Contact group name is required');
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: group, error } = await supabase.from('contact_groups').insert(payload).select().single();
        if (error) throw new ContactError(error.message);
        return group as unknown as ContactGroup;
      } catch (error) {
        logger.error('Failed to create contact group', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ContactError('Failed to create contact group');
      }
    },

    // ─── Polls ────────────────────────────────────────────────────────────────
    async getPolls(schoolId: string): Promise<Poll[]> {
      try {
        const { data, error } = await supabase.from('polls').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new PollError(error.message);
        return (data || []) as unknown as Poll[];
      } catch (error) {
        logger.error('Failed to get polls', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PollError('Failed to retrieve polls');
      }
    },

    async getPoll(pollId: string): Promise<Poll> {
      try {
        const { data, error } = await supabase.from('polls').select('*').eq('id', pollId).single();
        if (error || !data) throw new PollNotFoundError(pollId);
        return data as unknown as Poll;
      } catch (error) {
        logger.error('Failed to get poll', { pollId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PollNotFoundError(pollId);
      }
    },

    async createPoll(data: Partial<Poll>, schoolId: string): Promise<Poll> {
      try {
        if (!data.question) throw new ValidationError('Poll question is required');
        if (!data.options || data.options.length < 2) throw new ValidationError('At least two options are required');
        const payload = { ...data, school_id: schoolId, status: 'active', total_votes: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: poll, error } = await supabase.from('polls').insert(payload).select().single();
        if (error) throw new PollError(error.message);
        return poll as unknown as Poll;
      } catch (error) {
        logger.error('Failed to create poll', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PollError('Failed to create poll');
      }
    },

    async votePoll(pollId: string, userId: string, optionIndex: number): Promise<PollVote> {
      try {
        const { data: poll } = await supabase.from('polls').select('*').eq('id', pollId).single();
        if (!poll) throw new PollNotFoundError(pollId);
        if ((poll as any).status === 'closed') throw new PollClosedError(pollId);
        const { data: existing } = await supabase.from('poll_votes').select('id').eq('poll_id', pollId).eq('user_id', userId).single();
        if (existing) throw new PollAlreadyVotedError(pollId);
        const payload = { poll_id: pollId, user_id: userId, option_index: optionIndex, created_at: new Date().toISOString() };
        const { data: vote, error } = await supabase.from('poll_votes').insert(payload).select().single();
        if (error) throw new PollError(error.message);
        await supabase.from('polls').update({ total_votes: ((poll as any).total_votes || 0) + 1, updated_at: new Date().toISOString() }).eq('id', pollId);
        return vote as unknown as PollVote;
      } catch (error) {
        logger.error('Failed to vote poll', { pollId, userId, optionIndex, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PollError('Failed to vote on poll');
      }
    },

    async closePoll(pollId: string): Promise<Poll> {
      try {
        const { data: poll, error } = await supabase.from('polls').update({ status: 'closed', closed_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('id', pollId).select().single();
        if (error || !poll) throw new PollNotFoundError(pollId);
        return poll as unknown as Poll;
      } catch (error) {
        logger.error('Failed to close poll', { pollId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PollError('Failed to close poll');
      }
    },

    async getPollResults(pollId: string): Promise<{ poll: Poll; votes: PollVote[]; results: Record<number, number> }> {
      try {
        const { data: poll } = await supabase.from('polls').select('*').eq('id', pollId).single();
        if (!poll) throw new PollNotFoundError(pollId);
        const { data: votes } = await supabase.from('poll_votes').select('*').eq('poll_id', pollId);
        const results: Record<number, number> = {};
        for (const vote of (votes || []) as any[]) {
          results[vote.option_index] = (results[vote.option_index] || 0) + 1;
        }
        return { poll: poll as unknown as Poll, votes: (votes || []) as unknown as PollVote[], results };
      } catch (error) {
        logger.error('Failed to get poll results', { pollId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new PollError('Failed to get poll results');
      }
    },

    // ─── Webhooks ─────────────────────────────────────────────────────────────
    async getWebhooks(schoolId: string): Promise<Webhook[]> {
      try {
        const { data, error } = await supabase.from('webhooks').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new WebhookError(error.message);
        return (data || []) as unknown as Webhook[];
      } catch (error) {
        logger.error('Failed to get webhooks', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new WebhookError('Failed to retrieve webhooks');
      }
    },

    async getWebhook(webhookId: string): Promise<Webhook> {
      try {
        const { data, error } = await supabase.from('webhooks').select('*').eq('id', webhookId).single();
        if (error || !data) throw new WebhookNotFoundError(webhookId);
        return data as unknown as Webhook;
      } catch (error) {
        logger.error('Failed to get webhook', { webhookId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new WebhookNotFoundError(webhookId);
      }
    },

    async createWebhook(data: Partial<Webhook>, schoolId: string): Promise<Webhook> {
      try {
        if (!data.url) throw new ValidationError('Webhook URL is required');
        if (!data.events || data.events.length === 0) throw new ValidationError('At least one event is required');
        const payload = { ...data, school_id: schoolId, status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: webhook, error } = await supabase.from('webhooks').insert(payload).select().single();
        if (error) throw new WebhookError(error.message);
        return webhook as unknown as Webhook;
      } catch (error) {
        logger.error('Failed to create webhook', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new WebhookError('Failed to create webhook');
      }
    },

    async updateWebhook(webhookId: string, data: Partial<Webhook>): Promise<Webhook> {
      try {
        const { data: existing } = await supabase.from('webhooks').select('id').eq('id', webhookId).single();
        if (!existing) throw new WebhookNotFoundError(webhookId);
        const { data: webhook, error } = await supabase.from('webhooks').update({ ...data, updated_at: new Date().toISOString() }).eq('id', webhookId).select().single();
        if (error) throw new WebhookError(error.message);
        return webhook as unknown as Webhook;
      } catch (error) {
        logger.error('Failed to update webhook', { webhookId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new WebhookError('Failed to update webhook');
      }
    },

    async deleteWebhook(webhookId: string): Promise<void> {
      try {
        const { error } = await supabase.from('webhooks').delete().eq('id', webhookId);
        if (error) throw new WebhookError(error.message);
      } catch (error) {
        logger.error('Failed to delete webhook', { webhookId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new WebhookError('Failed to delete webhook');
      }
    },

    // ─── Channels ─────────────────────────────────────────────────────────────
    async getChannels(schoolId: string): Promise<Channel[]> {
      try {
        const { data, error } = await supabase.from('channels').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new ChannelError(error.message);
        return (data || []) as unknown as Channel[];
      } catch (error) {
        logger.error('Failed to get channels', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ChannelError('Failed to retrieve channels');
      }
    },

    async getChannel(channelId: string): Promise<Channel> {
      try {
        const { data, error } = await supabase.from('channels').select('*').eq('id', channelId).single();
        if (error || !data) throw new ChannelNotFoundError(channelId);
        return data as unknown as Channel;
      } catch (error) {
        logger.error('Failed to get channel', { channelId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ChannelNotFoundError(channelId);
      }
    },

    async createChannel(data: Partial<Channel>, schoolId: string): Promise<Channel> {
      try {
        if (!data.name) throw new ValidationError('Channel name is required');
        const { data: existing } = await supabase.from('channels').select('id').eq('school_id', schoolId).eq('name', data.name).single();
        if (existing) throw new ChannelAlreadyExistsError(data.name);
        const payload = { ...data, school_id: schoolId, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: channel, error } = await supabase.from('channels').insert(payload).select().single();
        if (error) throw new ChannelError(error.message);
        return channel as unknown as Channel;
      } catch (error) {
        logger.error('Failed to create channel', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ChannelError('Failed to create channel');
      }
    },

    async updateChannel(channelId: string, data: Partial<Channel>): Promise<Channel> {
      try {
        const { data: existing } = await supabase.from('channels').select('id').eq('id', channelId).single();
        if (!existing) throw new ChannelNotFoundError(channelId);
        const { data: channel, error } = await supabase.from('channels').update({ ...data, updated_at: new Date().toISOString() }).eq('id', channelId).select().single();
        if (error) throw new ChannelError(error.message);
        return channel as unknown as Channel;
      } catch (error) {
        logger.error('Failed to update channel', { channelId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ChannelError('Failed to update channel');
      }
    },

    async deleteChannel(channelId: string): Promise<void> {
      try {
        const { error } = await supabase.from('channels').delete().eq('id', channelId);
        if (error) throw new ChannelError(error.message);
      } catch (error) {
        logger.error('Failed to delete channel', { channelId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new ChannelError('Failed to delete channel');
      }
    },

    // ─── Presence ─────────────────────────────────────────────────────────────
    async getOnlineUsers(schoolId: string): Promise<PresenceStats> {
      try {
        const { data: presences } = await supabase.from('user_presence').select('*').eq('school_id', schoolId).eq('status', 'online');
        const list = (presences || []) as any[];
        return {
          onlineUsers: list.length, idleUsers: 0, offlineUsers: 0,
          lastUpdated: new Date().toISOString(),
        };
      } catch (error) {
        logger.error('Failed to get online users', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCollaborationPresenceError('Failed to get online users');
      }
    },

    async updatePresence(userId: string, status: string): Promise<void> {
      try {
        const { error } = await supabase.from('user_presence').upsert({ user_id: userId, status, last_active: new Date().toISOString(), updated_at: new Date().toISOString() });
        if (error) throw new CommCollaborationPresenceError(error.message);
      } catch (error) {
        logger.error('Failed to update presence', { userId, status, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCollaborationPresenceError('Failed to update presence');
      }
    },

    async getPresence(schoolId: string): Promise<PresenceStats> {
      try {
        const { data: all } = await supabase.from('user_presence').select('status').eq('school_id', schoolId);
        const list = (all || []) as any[];
        return {
          onlineUsers: list.filter(p => p.status === 'online').length,
          idleUsers: list.filter(p => p.status === 'idle').length,
          offlineUsers: list.filter(p => p.status === 'offline').length,
          lastUpdated: new Date().toISOString(),
        };
      } catch (error) {
        logger.error('Failed to get presence', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommCollaborationPresenceError('Failed to get presence');
      }
    },

    // ─── Auto Response ────────────────────────────────────────────────────────
    async getAutoResponses(schoolId: string): Promise<AutoResponse[]> {
      try {
        const { data, error } = await supabase.from('auto_responses').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (error) throw new CommMessageError(error.message);
        return (data || []) as unknown as AutoResponse[];
      } catch (error) {
        logger.error('Failed to get auto responses', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to retrieve auto responses');
      }
    },

    async createAutoResponse(data: Partial<AutoResponse>, schoolId: string): Promise<AutoResponse> {
      try {
        if (!data.name) throw new ValidationError('Auto response name is required');
        const payload = { ...data, school_id: schoolId, is_active: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: response, error } = await supabase.from('auto_responses').insert(payload).select().single();
        if (error) throw new CommMessageError(error.message);
        return response as unknown as AutoResponse;
      } catch (error) {
        logger.error('Failed to create auto response', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to create auto response');
      }
    },

    async updateAutoResponse(autoResponseId: string, data: Partial<AutoResponse>): Promise<AutoResponse> {
      try {
        const { data: existing } = await supabase.from('auto_responses').select('id').eq('id', autoResponseId).single();
        if (!existing) throw new CommMessageNotFoundError(autoResponseId);
        const { data: response, error } = await supabase.from('auto_responses').update({ ...data, updated_at: new Date().toISOString() }).eq('id', autoResponseId).select().single();
        if (error) throw new CommMessageError(error.message);
        return response as unknown as AutoResponse;
      } catch (error) {
        logger.error('Failed to update auto response', { autoResponseId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to update auto response');
      }
    },

    async deleteAutoResponse(autoResponseId: string): Promise<void> {
      try {
        const { error } = await supabase.from('auto_responses').delete().eq('id', autoResponseId);
        if (error) throw new CommMessageError(error.message);
      } catch (error) {
        logger.error('Failed to delete auto response', { autoResponseId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to delete auto response');
      }
    },

    // ─── Search ───────────────────────────────────────────────────────────────
    async globalSearch(schoolId: string, query: string, filters?: Record<string, unknown>): Promise<{ messages: Message[]; conversations: Conversation[]; documents: Document[] }> {
      try {
        if (!query || query.trim().length < 2) throw new CommSearchQueryTooShortError(2);
        const [msgResult, convResult, docResult] = await Promise.all([
          supabase.from('messages').select('*').eq('school_id', schoolId).ilike('content', `%${query}%`).limit(20),
          supabase.from('conversations').select('*').eq('school_id', schoolId).ilike('name', `%${query}%`).limit(20),
          supabase.from('documents').select('*').eq('school_id', schoolId).ilike('title', `%${query}%`).limit(20),
        ]);
        if (msgResult.error) throw new CommSearchError(msgResult.error.message);
        if (convResult.error) throw new CommSearchError(convResult.error.message);
        if (docResult.error) throw new CommSearchError(docResult.error.message);
        return {
          messages: (msgResult.data || []) as unknown as Message[],
          conversations: (convResult.data || []) as unknown as Conversation[],
          documents: (docResult.data || []) as unknown as Document[],
        };
      } catch (error) {
        logger.error('Failed to global search', { schoolId, query, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommSearchError('Failed to perform global search');
      }
    },

    async searchContacts(schoolId: string, query: string): Promise<Contact[]> {
      try {
        if (!query || query.trim().length < 2) throw new CommSearchQueryTooShortError(2);
        const { data, error } = await supabase.from('contacts').select('*').eq('school_id', schoolId).or(`name.ilike.%${query}%,email.ilike.%${query}%`).order('name', { ascending: true });
        if (error) throw new CommSearchError(error.message);
        return (data || []) as unknown as Contact[];
      } catch (error) {
        logger.error('Failed to search contacts', { schoolId, query, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommSearchError('Failed to search contacts');
      }
    },

    // ─── Export ───────────────────────────────────────────────────────────────
    async exportConversation(conversationId: string, format: string): Promise<{ url: string; expiresAt: string }> {
      try {
        const { data: messages } = await supabase.from('messages').select('*').eq('conversation_id', conversationId).order('created_at', { ascending: true });
        if (!messages || messages.length === 0) throw new CommMessageError('No messages to export');
        const expiresAt = new Date(Date.now() + 86400000).toISOString();
        return { url: `/api/exports/conversation/${conversationId}.${format}`, expiresAt };
      } catch (error) {
        logger.error('Failed to export conversation', { conversationId, format, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to export conversation');
      }
    },

    async exportMessages(conversationId: string, format: string, dateRange?: { from: string; to: string }): Promise<{ url: string; expiresAt: string }> {
      try {
        let query = supabase.from('messages').select('*').eq('conversation_id', conversationId);
        if (dateRange?.from) query = query.gte('created_at', dateRange.from);
        if (dateRange?.to) query = query.lte('created_at', dateRange.to);
        query = query.order('created_at', { ascending: true });
        const { data } = await query;
        if (!data || data.length === 0) throw new CommMessageError('No messages in specified range');
        const expiresAt = new Date(Date.now() + 86400000).toISOString();
        return { url: `/api/exports/messages/${conversationId}.${format}`, expiresAt };
      } catch (error) {
        logger.error('Failed to export messages', { conversationId, format, dateRange, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to export messages');
      }
    },

    async exportAnnouncements(schoolId: string, format: string): Promise<{ url: string; expiresAt: string }> {
      try {
        const { data } = await supabase.from('announcements').select('*').eq('school_id', schoolId).order('created_at', { ascending: false });
        if (!data || data.length === 0) throw new CommAnnouncementNotFoundError('No announcements to export');
        const expiresAt = new Date(Date.now() + 86400000).toISOString();
        return { url: `/api/exports/announcements/${schoolId}.${format}`, expiresAt };
      } catch (error) {
        logger.error('Failed to export announcements', { schoolId, format, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommAnnouncementNotFoundError('Failed to export announcements');
      }
    },

    // ─── Scheduled Messages ──────────────────────────────────────────────────
    async scheduleMessage(data: Partial<ScheduledMessage>, schoolId: string): Promise<ScheduledMessage> {
      try {
        if (!data.scheduledFor) throw new ValidationError('Scheduled time is required');
        const scheduledDate = new Date(data.scheduledFor);
        if (scheduledDate <= new Date()) throw new ValidationError('Scheduled time must be in the future');
        const payload = { ...data, school_id: schoolId, status: 'scheduled', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        const { data: msg, error } = await supabase.from('scheduled_messages').insert(payload).select().single();
        if (error) throw new CommMessageError(error.message);
        return msg as unknown as ScheduledMessage;
      } catch (error) {
        logger.error('Failed to schedule message', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to schedule message');
      }
    },

    async getScheduledMessages(schoolId: string): Promise<ScheduledMessage[]> {
      try {
        const { data, error } = await supabase.from('scheduled_messages').select('*').eq('school_id', schoolId).order('scheduled_for', { ascending: true });
        if (error) throw new CommMessageError(error.message);
        return (data || []) as unknown as ScheduledMessage[];
      } catch (error) {
        logger.error('Failed to get scheduled messages', { schoolId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to retrieve scheduled messages');
      }
    },

    async cancelScheduledMessage(messageId: string): Promise<void> {
      try {
        const { data: existing } = await supabase.from('scheduled_messages').select('id, status').eq('id', messageId).single();
        if (!existing) throw new CommMessageNotFoundError(messageId);
        if ((existing as any).status === 'sent') throw new CommMessageError('Cannot cancel a sent message');
        const { error } = await supabase.from('scheduled_messages').update({ status: 'cancelled', updated_at: new Date().toISOString() }).eq('id', messageId);
        if (error) throw new CommMessageError(error.message);
      } catch (error) {
        logger.error('Failed to cancel scheduled message', { messageId, error }, 'communication');
        if (error instanceof AppError) throw error;
        throw new CommMessageError('Failed to cancel scheduled message');
      }
    },
  };
}
