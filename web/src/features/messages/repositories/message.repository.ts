import type { Conversation, ConversationMember, Message, MessageRead, Reaction, Attachment, Notification, NotificationPreference, NotificationSettings, Group, GroupMember, Announcement, Broadcast, MessageSearch, MessageFilters, CreateConversationRequest, SendMessageRequest, EditMessageRequest, CreateGroupRequest, CreateAnnouncementRequest, CreateBroadcastRequest, MessageStatistics, CommunicationDashboard, MessageAudit } from '@educi/types';
import { logger } from '@educi/logger';
import type { SupabaseClient } from '@supabase/supabase-js';

export class SupabaseMessageRepository {
  private readonly supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async findConversation(id: string): Promise<Conversation | null> {
    const { data, error } = await this.supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapConversation(data);
  }

  async findAllConversations(schoolId: string, filters?: MessageFilters): Promise<{ data: Conversation[]; total: number }> {
    const limit = filters?.limit || 20;
    const offset = filters?.offset || 0;

    let query = this.supabase
      .from('conversations')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId);

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    if (filters?.isArchived !== undefined) {
      query = query.eq('is_archived', filters.isArchived);
    }
    if (filters?.isPinned !== undefined) {
      query = query.eq('is_pinned', filters.isPinned);
    }

    const sortBy = filters?.sortBy || 'last_message_at';
    const sortOrder = filters?.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) {
      logger.error('Failed to list conversations', { schoolId, error: error.message }, 'messages');
      return { data: [], total: 0 };
    }

    return {
      data: (data || []).map((c: Record<string, unknown>) => this.mapConversation(c)),
      total: count || 0,
    };
  }

  async createConversation(data: CreateConversationRequest, schoolId: string): Promise<Conversation> {
    const { data: conversation, error } = await this.supabase
      .from('conversations')
      .insert({
        school_id: schoolId,
        type: data.type,
        title: data.title,
        description: data.description || null,
        is_archived: false,
        is_pinned: false,
        is_muted: false,
        created_by: null,
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to create conversation', { error: error.message }, 'messages');
      throw error;
    }

    if (data.memberIds && data.memberIds.length > 0) {
      const members = data.memberIds.map((userId) => ({
        conversation_id: conversation.id,
        user_id: userId,
        role: 'MEMBER',
        is_muted: false,
        joined_at: new Date().toISOString(),
      }));

      const { error: memberError } = await this.supabase
        .from('conversation_members')
        .insert(members);

      if (memberError) {
        logger.error('Failed to add conversation members', { error: memberError.message }, 'messages');
      }
    }

    logger.info('Conversation created', { conversationId: conversation.id }, 'messages');
    return this.mapConversation(conversation);
  }

  async updateConversation(id: string, data: Partial<Conversation>): Promise<Conversation> {
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;
    if (data.isArchived !== undefined) updateData.is_archived = data.isArchived;
    if (data.isPinned !== undefined) updateData.is_pinned = data.isPinned;
    if (data.isMuted !== undefined) updateData.is_muted = data.isMuted;

    updateData.updated_at = new Date().toISOString();

    const { data: conversation, error } = await this.supabase
      .from('conversations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to update conversation', { conversationId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapConversation(conversation);
  }

  async deleteConversation(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('conversations')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Failed to delete conversation', { conversationId: id, error: error.message }, 'messages');
      throw error;
    }

    logger.info('Conversation deleted', { conversationId: id }, 'messages');
  }

  async archiveConversation(id: string): Promise<Conversation> {
    const { data, error } = await this.supabase
      .from('conversations')
      .update({ is_archived: true, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to archive conversation', { conversationId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapConversation(data);
  }

  async restoreConversation(id: string): Promise<Conversation> {
    const { data, error } = await this.supabase
      .from('conversations')
      .update({ is_archived: false, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to restore conversation', { conversationId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapConversation(data);
  }

  async pinConversation(id: string): Promise<Conversation> {
    const { data: existing } = await this.supabase
      .from('conversations')
      .select('is_pinned')
      .eq('id', id)
      .single();

    const { data, error } = await this.supabase
      .from('conversations')
      .update({ is_pinned: !existing?.is_pinned, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to pin conversation', { conversationId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapConversation(data);
  }

  async muteConversation(id: string, muted: boolean): Promise<Conversation> {
    const { data, error } = await this.supabase
      .from('conversations')
      .update({ is_muted: muted, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to mute conversation', { conversationId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapConversation(data);
  }

  async findConversationMembers(conversationId: string): Promise<ConversationMember[]> {
    const { data, error } = await this.supabase
      .from('conversation_members')
      .select('*')
      .eq('conversation_id', conversationId)
      .is('left_at', null);

    if (error || !data) return [];
    return data.map((m: Record<string, unknown>) => this.mapConversationMember(m));
  }

  async addConversationMember(conversationId: string, userId: string, role?: string): Promise<ConversationMember> {
    const { data, error } = await this.supabase
      .from('conversation_members')
      .insert({
        conversation_id: conversationId,
        user_id: userId,
        role: role || 'MEMBER',
        is_muted: false,
        joined_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to add conversation member', { conversationId, userId, error: error.message }, 'messages');
      throw error;
    }

    return this.mapConversationMember(data);
  }

  async removeConversationMember(conversationId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('conversation_members')
      .update({ left_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId)
      .is('left_at', null);

    if (error) {
      logger.error('Failed to remove conversation member', { conversationId, userId, error: error.message }, 'messages');
      throw error;
    }
  }

  async updateMemberRole(conversationId: string, userId: string, role: string): Promise<ConversationMember> {
    const { data, error } = await this.supabase
      .from('conversation_members')
      .update({ role })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId)
      .is('left_at', null)
      .select()
      .single();

    if (error) {
      logger.error('Failed to update member role', { conversationId, userId, error: error.message }, 'messages');
      throw error;
    }

    return this.mapConversationMember(data);
  }

  async muteMember(conversationId: string, userId: string, muted: boolean): Promise<ConversationMember> {
    const { data, error } = await this.supabase
      .from('conversation_members')
      .update({ is_muted: muted })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId)
      .is('left_at', null)
      .select()
      .single();

    if (error) {
      logger.error('Failed to mute member', { conversationId, userId, error: error.message }, 'messages');
      throw error;
    }

    return this.mapConversationMember(data);
  }

  async updateLastRead(conversationId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('conversation_members')
      .update({ last_read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('user_id', userId)
      .is('left_at', null);

    if (error) {
      logger.error('Failed to update last read', { conversationId, userId, error: error.message }, 'messages');
    }
  }

  async findMessage(id: string): Promise<Message | null> {
    const { data, error } = await this.supabase
      .from('messages')
      .select('*, attachments:message_attachments(*), reactions:message_reactions(*), readBy:message_reads(*)')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapMessage(data);
  }

  async findMessages(conversationId: string, filters?: MessageFilters): Promise<{ data: Message[]; total: number }> {
    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;

    let query = this.supabase
      .from('messages')
      .select('*, attachments:message_attachments(*), reactions:message_reactions(*), readBy:message_reads(*)', { count: 'exact' })
      .eq('conversation_id', conversationId);

    if (filters?.senderId) {
      query = query.eq('sender_id', filters.senderId);
    }
    if (filters?.type) {
      query = query.eq('type', filters.type);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    if (filters?.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }
    if (filters?.hasAttachment) {
      query = query.not('id', 'is', null);
    }
    if (filters?.isPinned !== undefined) {
      query = query.eq('is_pinned', filters.isPinned);
    }
    if (filters?.search) {
      query = query.ilike('content', `%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) {
      logger.error('Failed to list messages', { conversationId, error: error.message }, 'messages');
      return { data: [], total: 0 };
    }

    return {
      data: (data || []).map((m: Record<string, unknown>) => this.mapMessage(m)),
      total: count || 0,
    };
  }

  async createMessage(data: SendMessageRequest, senderId: string, schoolId: string): Promise<Message> {
    const { data: message, error } = await this.supabase
      .from('messages')
      .insert({
        school_id: schoolId,
        conversation_id: data.conversationId,
        sender_id: senderId,
        content: data.content,
        type: data.type || 'TEXT',
        status: 'SENT',
        reply_to_id: data.replyToId || null,
        is_edited: false,
        is_deleted: false,
        is_pinned: false,
        is_forwarded: false,
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to create message', { conversationId: data.conversationId, error: error.message }, 'messages');
      throw error;
    }

    await this.supabase
      .from('conversations')
      .update({
        last_message_at: new Date().toISOString(),
        last_message_preview: data.content.substring(0, 100),
        updated_at: new Date().toISOString(),
      })
      .eq('id', data.conversationId);

    if (data.attachmentIds && data.attachmentIds.length > 0) {
      await this.supabase
        .from('message_attachments')
        .update({ message_id: message.id })
        .in('id', data.attachmentIds);
    }

    logger.info('Message created', { messageId: message.id, conversationId: data.conversationId }, 'messages');
    return this.mapMessage(message);
  }

  async updateMessage(id: string, data: EditMessageRequest): Promise<Message> {
    const { data: message, error } = await this.supabase
      .from('messages')
      .update({
        content: data.content,
        is_edited: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to update message', { messageId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapMessage(message);
  }

  async deleteMessage(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Failed to delete message', { messageId: id, error: error.message }, 'messages');
      throw error;
    }

    logger.info('Message deleted', { messageId: id }, 'messages');
  }

  async softDeleteMessage(id: string): Promise<Message> {
    const { data, error } = await this.supabase
      .from('messages')
      .update({
        content: 'Message supprimé',
        is_deleted: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to soft delete message', { messageId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapMessage(data);
  }

  async pinMessage(id: string): Promise<Message> {
    const { data: existing } = await this.supabase
      .from('messages')
      .select('is_pinned')
      .eq('id', id)
      .single();

    const { data, error } = await this.supabase
      .from('messages')
      .update({ is_pinned: !existing?.is_pinned, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to pin message', { messageId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapMessage(data);
  }

  async forwardMessage(id: string, targetConversationIds: string[], userId: string): Promise<Message[]> {
    const { data: original } = await this.supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();

    if (!original) throw new Error('Message not found');

    const forwardedMessages: Message[] = [];

    for (const targetId of targetConversationIds) {
      const { data: msg, error } = await this.supabase
        .from('messages')
        .insert({
          school_id: original.school_id,
          conversation_id: targetId,
          sender_id: userId,
          content: original.content,
          type: original.type,
          status: 'SENT',
          is_edited: false,
          is_deleted: false,
          is_pinned: false,
          is_forwarded: true,
          forwarded_from_id: id,
        })
        .select()
        .single();

      if (!error && msg) {
        forwardedMessages.push(this.mapMessage(msg));
      }
    }

    logger.info('Message forwarded', { messageId: id, targets: targetConversationIds.length }, 'messages');
    return forwardedMessages;
  }

  async searchMessages(schoolId: string, search: MessageSearch): Promise<{ data: Message[]; total: number }> {
    const limit = search.limit || 20;
    const offset = search.offset || 0;

    let query = this.supabase
      .from('messages')
      .select('*, attachments:message_attachments(*), reactions:message_reactions(*), readBy:message_reads(*)', { count: 'exact' })
      .eq('school_id', schoolId)
      .ilike('content', `%${search.query}%`);

    if (search.conversationId) {
      query = query.eq('conversation_id', search.conversationId);
    }
    if (search.senderId) {
      query = query.eq('sender_id', search.senderId);
    }
    if (search.type) {
      query = query.eq('type', search.type);
    }
    if (search.dateFrom) {
      query = query.gte('created_at', search.dateFrom);
    }
    if (search.dateTo) {
      query = query.lte('created_at', search.dateTo);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) {
      logger.error('Failed to search messages', { schoolId, error: error.message }, 'messages');
      return { data: [], total: 0 };
    }

    return {
      data: (data || []).map((m: Record<string, unknown>) => this.mapMessage(m)),
      total: count || 0,
    };
  }

  async findMessageReactions(messageId: string): Promise<Reaction[]> {
    const { data, error } = await this.supabase
      .from('message_reactions')
      .select('*')
      .eq('message_id', messageId);

    if (error || !data) return [];
    return data.map((r: Record<string, unknown>) => this.mapReaction(r));
  }

  async addReaction(messageId: string, userId: string, type: string): Promise<Reaction> {
    const { data, error } = await this.supabase
      .from('message_reactions')
      .upsert({
        message_id: messageId,
        user_id: userId,
        type,
      }, { onConflict: 'message_id,user_id' })
      .select()
      .single();

    if (error) {
      logger.error('Failed to add reaction', { messageId, userId, error: error.message }, 'messages');
      throw error;
    }

    return this.mapReaction(data);
  }

  async removeReaction(messageId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('message_reactions')
      .delete()
      .eq('message_id', messageId)
      .eq('user_id', userId);

    if (error) {
      logger.error('Failed to remove reaction', { messageId, userId, error: error.message }, 'messages');
      throw error;
    }
  }

  async markAsRead(messageId: string, userId: string): Promise<MessageRead> {
    const { data, error } = await this.supabase
      .from('message_reads')
      .upsert({
        message_id: messageId,
        user_id: userId,
        read_at: new Date().toISOString(),
      }, { onConflict: 'message_id,user_id' })
      .select()
      .single();

    if (error) {
      logger.error('Failed to mark message as read', { messageId, userId, error: error.message }, 'messages');
      throw error;
    }

    return this.mapMessageRead(data);
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    const { data: unreadMessages } = await this.supabase
      .from('messages')
      .select('id')
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId);

    if (unreadMessages && unreadMessages.length > 0) {
      const reads = unreadMessages.map((m: { id: string }) => ({
        message_id: m.id,
        user_id: userId,
        read_at: new Date().toISOString(),
      }));

      await this.supabase
        .from('message_reads')
        .upsert(reads, { onConflict: 'message_id,user_id' });
    }

    await this.updateLastRead(conversationId, userId);
  }

  async getUnreadCount(conversationId: string, userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .not('id', 'in', (await this.supabase.from('message_reads').select('message_id').eq('user_id', userId)).data?.map((r: { message_id: string }) => r.message_id) || []);

    if (error) return 0;
    return count || 0;
  }

  async getTotalUnreadCount(userId: string, schoolId: string): Promise<number> {
    const { data: memberConversations } = await this.supabase
      .from('conversation_members')
      .select('conversation_id')
      .eq('user_id', userId)
      .is('left_at', null);

    if (!memberConversations || memberConversations.length === 0) return 0;

    const conversationIds = memberConversations.map((m: { conversation_id: string }) => m.conversation_id);

    const { count, error } = await this.supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .in('conversation_id', conversationIds)
      .neq('sender_id', userId)
      .eq('school_id', schoolId);

    if (error) return 0;
    return count || 0;
  }

  async findAttachment(id: string): Promise<Attachment | null> {
    const { data, error } = await this.supabase
      .from('message_attachments')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapAttachment(data);
  }

  async createAttachment(data: { messageId: string; fileName: string; fileType: string; fileSize: number; fileUrl: string; mimeType: string; type: string; uploadedBy: string }): Promise<Attachment> {
    const { data: attachment, error } = await this.supabase
      .from('message_attachments')
      .insert({
        message_id: data.messageId,
        file_name: data.fileName,
        file_type: data.fileType,
        file_size: data.fileSize,
        file_url: data.fileUrl,
        mime_type: data.mimeType,
        type: data.type,
        uploaded_by: data.uploadedBy,
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to create attachment', { error: error.message }, 'messages');
      throw error;
    }

    return this.mapAttachment(attachment);
  }

  async deleteAttachment(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('message_attachments')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Failed to delete attachment', { attachmentId: id, error: error.message }, 'messages');
      throw error;
    }
  }

  async getAttachments(messageId: string): Promise<Attachment[]> {
    const { data, error } = await this.supabase
      .from('message_attachments')
      .select('*')
      .eq('message_id', messageId);

    if (error || !data) return [];
    return data.map((a: Record<string, unknown>) => this.mapAttachment(a));
  }

  async findNotification(id: string): Promise<Notification | null> {
    const { data, error } = await this.supabase
      .from('notifications')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapNotification(data);
  }

  async findNotifications(userId: string, schoolId: string, filters?: MessageFilters): Promise<{ data: Notification[]; total: number }> {
    const limit = filters?.limit || 20;
    const offset = filters?.offset || 0;

    let query = this.supabase
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .eq('school_id', schoolId)
      .eq('is_deleted', false);

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) {
      logger.error('Failed to list notifications', { userId, error: error.message }, 'messages');
      return { data: [], total: 0 };
    }

    return {
      data: (data || []).map((n: Record<string, unknown>) => this.mapNotification(n)),
      total: count || 0,
    };
  }

  async createNotification(data: { userId: string; schoolId: string; type: string; title: string; body: string; data?: Record<string, unknown>; channels?: string[] }): Promise<Notification> {
    const { data: notification, error } = await this.supabase
      .from('notifications')
      .insert({
        user_id: data.userId,
        school_id: data.schoolId,
        type: data.type,
        title: data.title,
        body: data.body,
        data: data.data || null,
        is_read: false,
        is_deleted: false,
        channels: data.channels || ['IN_APP'],
        sent_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to create notification', { error: error.message }, 'messages');
      throw error;
    }

    return this.mapNotification(notification);
  }

  async markNotificationAsRead(id: string): Promise<Notification> {
    const { data, error } = await this.supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to mark notification as read', { notificationId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapNotification(data);
  }

  async markAllNotificationsAsRead(userId: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('user_id', userId)
      .eq('school_id', schoolId)
      .eq('is_read', false);

    if (error) {
      logger.error('Failed to mark all notifications as read', { userId, error: error.message }, 'messages');
    }
  }

  async deleteNotification(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('notifications')
      .update({ is_deleted: true })
      .eq('id', id);

    if (error) {
      logger.error('Failed to delete notification', { notificationId: id, error: error.message }, 'messages');
      throw error;
    }
  }

  async deleteAllNotifications(userId: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from('notifications')
      .update({ is_deleted: true })
      .eq('user_id', userId)
      .eq('school_id', schoolId);

    if (error) {
      logger.error('Failed to delete all notifications', { userId, error: error.message }, 'messages');
    }
  }

  async findNotificationPreferences(userId: string, schoolId: string): Promise<NotificationPreference[]> {
    const { data, error } = await this.supabase
      .from('notification_preferences')
      .select('*')
      .eq('user_id', userId)
      .eq('school_id', schoolId);

    if (error || !data) return [];
    return data.map((p: Record<string, unknown>) => this.mapNotificationPreference(p));
  }

  async updateNotificationPreference(userId: string, schoolId: string, channel: string, type: string, isEnabled: boolean): Promise<NotificationPreference> {
    const { data, error } = await this.supabase
      .from('notification_preferences')
      .upsert({
        user_id: userId,
        school_id: schoolId,
        channel,
        type,
        is_enabled: isEnabled,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,school_id,channel,type' })
      .select()
      .single();

    if (error) {
      logger.error('Failed to update notification preference', { userId, error: error.message }, 'messages');
      throw error;
    }

    return this.mapNotificationPreference(data);
  }

  async findNotificationSettings(userId: string, schoolId: string): Promise<NotificationSettings | null> {
    const { data, error } = await this.supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', userId)
      .eq('school_id', schoolId)
      .single();

    if (error || !data) return null;
    return this.mapNotificationSettings(data);
  }

  async updateNotificationSettings(userId: string, schoolId: string, data: Partial<NotificationSettings>): Promise<NotificationSettings> {
    const updateData: Record<string, unknown> = {};
    if (data.emailEnabled !== undefined) updateData.email_enabled = data.emailEnabled;
    if (data.pushEnabled !== undefined) updateData.push_enabled = data.pushEnabled;
    if (data.smsEnabled !== undefined) updateData.sms_enabled = data.smsEnabled;
    if (data.whatsappEnabled !== undefined) updateData.whatsapp_enabled = data.whatsappEnabled;
    if (data.messageNotifications !== undefined) updateData.message_notifications = data.messageNotifications;
    if (data.announcementNotifications !== undefined) updateData.announcement_notifications = data.announcementNotifications;
    if (data.broadcastNotifications !== undefined) updateData.broadcast_notifications = data.broadcastNotifications;
    if (data.mentionNotifications !== undefined) updateData.mention_notifications = data.mentionNotifications;
    if (data.reactionNotifications !== undefined) updateData.reaction_notifications = data.reactionNotifications;
    if (data.systemNotifications !== undefined) updateData.system_notifications = data.systemNotifications;
    if (data.quietHoursStart !== undefined) updateData.quiet_hours_start = data.quietHoursStart;
    if (data.quietHoursEnd !== undefined) updateData.quiet_hours_end = data.quietHoursEnd;

    updateData.updated_at = new Date().toISOString();

    const { data: settings, error } = await this.supabase
      .from('notification_settings')
      .upsert({
        user_id: userId,
        school_id: schoolId,
        ...updateData,
      }, { onConflict: 'user_id,school_id' })
      .select()
      .single();

    if (error) {
      logger.error('Failed to update notification settings', { userId, error: error.message }, 'messages');
      throw error;
    }

    return this.mapNotificationSettings(settings);
  }

  async findGroup(id: string): Promise<Group | null> {
    const { data, error } = await this.supabase
      .from('groups')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapGroup(data);
  }

  async findAllGroups(schoolId: string, filters?: MessageFilters): Promise<{ data: Group[]; total: number }> {
    const limit = filters?.limit || 20;
    const offset = filters?.offset || 0;

    let query = this.supabase
      .from('groups')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId);

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) {
      logger.error('Failed to list groups', { schoolId, error: error.message }, 'messages');
      return { data: [], total: 0 };
    }

    return {
      data: (data || []).map((g: Record<string, unknown>) => this.mapGroup(g)),
      total: count || 0,
    };
  }

  async createGroup(data: CreateGroupRequest, schoolId: string, createdBy: string): Promise<Group> {
    const { data: group, error } = await this.supabase
      .from('groups')
      .insert({
        school_id: schoolId,
        name: data.name,
        description: data.description || null,
        type: data.type,
        created_by: createdBy,
        is_archived: false,
        member_count: 0,
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to create group', { error: error.message }, 'messages');
      throw error;
    }

    if (data.memberIds && data.memberIds.length > 0) {
      const members = data.memberIds.map((userId) => ({
        group_id: group.id,
        user_id: userId,
        role: 'MEMBER',
        joined_at: new Date().toISOString(),
      }));

      await this.supabase.from('group_members').insert(members);
      await this.supabase
        .from('groups')
        .update({ member_count: data.memberIds.length })
        .eq('id', group.id);
    }

    logger.info('Group created', { groupId: group.id }, 'messages');
    return this.mapGroup(group);
  }

  async updateGroup(id: string, data: Partial<Group>): Promise<Group> {
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;
    if (data.isArchived !== undefined) updateData.is_archived = data.isArchived;

    updateData.updated_at = new Date().toISOString();

    const { data: group, error } = await this.supabase
      .from('groups')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to update group', { groupId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapGroup(group);
  }

  async deleteGroup(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('groups')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Failed to delete group', { groupId: id, error: error.message }, 'messages');
      throw error;
    }

    logger.info('Group deleted', { groupId: id }, 'messages');
  }

  async archiveGroup(id: string): Promise<Group> {
    const { data, error } = await this.supabase
      .from('groups')
      .update({ is_archived: true, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to archive group', { groupId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapGroup(data);
  }

  async findGroupMembers(groupId: string): Promise<GroupMember[]> {
    const { data, error } = await this.supabase
      .from('group_members')
      .select('*')
      .eq('group_id', groupId)
      .is('left_at', null);

    if (error || !data) return [];
    return data.map((m: Record<string, unknown>) => this.mapGroupMember(m));
  }

  async addGroupMember(groupId: string, userId: string, role?: string): Promise<GroupMember> {
    const { data, error } = await this.supabase
      .from('group_members')
      .insert({
        group_id: groupId,
        user_id: userId,
        role: role || 'MEMBER',
        joined_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to add group member', { groupId, userId, error: error.message }, 'messages');
      throw error;
    }

    await this.supabase.rpc('increment_group_member_count', { p_group_id: groupId });

    return this.mapGroupMember(data);
  }

  async removeGroupMember(groupId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('group_members')
      .update({ left_at: new Date().toISOString() })
      .eq('group_id', groupId)
      .eq('user_id', userId)
      .is('left_at', null);

    if (error) {
      logger.error('Failed to remove group member', { groupId, userId, error: error.message }, 'messages');
      throw error;
    }

    await this.supabase.rpc('decrement_group_member_count', { p_group_id: groupId });
  }

  async findAnnouncement(id: string): Promise<Announcement | null> {
    const { data, error } = await this.supabase
      .from('announcements')
      .select('*, attachments:message_attachments(*)')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapAnnouncement(data);
  }

  async findAnnouncements(schoolId: string, filters?: MessageFilters): Promise<{ data: Announcement[]; total: number }> {
    const limit = filters?.limit || 20;
    const offset = filters?.offset || 0;

    let query = this.supabase
      .from('announcements')
      .select('*, attachments:message_attachments(*)', { count: 'exact' })
      .eq('school_id', schoolId);

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
    }
    if (filters?.isArchived !== undefined) {
      query = query.eq('is_published', !filters.isArchived);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) {
      logger.error('Failed to list announcements', { schoolId, error: error.message }, 'messages');
      return { data: [], total: 0 };
    }

    return {
      data: (data || []).map((a: Record<string, unknown>) => this.mapAnnouncement(a)),
      total: count || 0,
    };
  }

  async createAnnouncement(data: CreateAnnouncementRequest, schoolId: string, publishedBy: string): Promise<Announcement> {
    const { data: announcement, error } = await this.supabase
      .from('announcements')
      .insert({
        school_id: schoolId,
        title: data.title,
        content: data.content,
        type: data.type,
        priority: data.priority,
        target_audience: data.targetAudience,
        target_ids: data.targetIds || [],
        published_by: publishedBy,
        is_published: false,
        view_count: 0,
        expires_at: data.expiresAt || null,
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to create announcement', { error: error.message }, 'messages');
      throw error;
    }

    logger.info('Announcement created', { announcementId: announcement.id }, 'messages');
    return this.mapAnnouncement(announcement);
  }

  async updateAnnouncement(id: string, data: Partial<Announcement>): Promise<Announcement> {
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.targetAudience !== undefined) updateData.target_audience = data.targetAudience;
    if (data.targetIds !== undefined) updateData.target_ids = data.targetIds;
    if (data.expiresAt !== undefined) updateData.expires_at = data.expiresAt;
    if (data.isPublished !== undefined) updateData.is_published = data.isPublished;

    updateData.updated_at = new Date().toISOString();

    const { data: announcement, error } = await this.supabase
      .from('announcements')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to update announcement', { announcementId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapAnnouncement(announcement);
  }

  async deleteAnnouncement(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('announcements')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Failed to delete announcement', { announcementId: id, error: error.message }, 'messages');
      throw error;
    }

    logger.info('Announcement deleted', { announcementId: id }, 'messages');
  }

  async publishAnnouncement(id: string): Promise<Announcement> {
    const { data, error } = await this.supabase
      .from('announcements')
      .update({
        is_published: true,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to publish announcement', { announcementId: id, error: error.message }, 'messages');
      throw error;
    }

    logger.info('Announcement published', { announcementId: id }, 'messages');
    return this.mapAnnouncement(data);
  }

  async incrementViewCount(id: string): Promise<void> {
    const { error } = await this.supabase.rpc('increment_announcement_views', { p_announcement_id: id });

    if (error) {
      logger.error('Failed to increment view count', { announcementId: id, error: error.message }, 'messages');
    }
  }

  async findBroadcast(id: string): Promise<Broadcast | null> {
    const { data, error } = await this.supabase
      .from('broadcasts')
      .select('*, attachments:message_attachments(*)')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return this.mapBroadcast(data);
  }

  async findBroadcasts(schoolId: string, filters?: MessageFilters): Promise<{ data: Broadcast[]; total: number }> {
    const limit = filters?.limit || 20;
    const offset = filters?.offset || 0;

    let query = this.supabase
      .from('broadcasts')
      .select('*, attachments:message_attachments(*)', { count: 'exact' })
      .eq('school_id', schoolId);

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) {
      logger.error('Failed to list broadcasts', { schoolId, error: error.message }, 'messages');
      return { data: [], total: 0 };
    }

    return {
      data: (data || []).map((b: Record<string, unknown>) => this.mapBroadcast(b)),
      total: count || 0,
    };
  }

  async createBroadcast(data: CreateBroadcastRequest, schoolId: string, sentBy: string): Promise<Broadcast> {
    const { data: broadcast, error } = await this.supabase
      .from('broadcasts')
      .insert({
        school_id: schoolId,
        title: data.title,
        content: data.content,
        scope: data.scope,
        target_ids: data.targetIds || [],
        channels: data.channels,
        sent_by: sentBy,
        is_scheduled: !!data.scheduledAt,
        scheduled_at: data.scheduledAt || null,
        recipient_count: 0,
        delivered_count: 0,
        read_count: 0,
        status: data.scheduledAt ? 'SCHEDULED' : 'DRAFT',
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to create broadcast', { error: error.message }, 'messages');
      throw error;
    }

    logger.info('Broadcast created', { broadcastId: broadcast.id }, 'messages');
    return this.mapBroadcast(broadcast);
  }

  async updateBroadcast(id: string, data: Partial<Broadcast>): Promise<Broadcast> {
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.scope !== undefined) updateData.scope = data.scope;
    if (data.targetIds !== undefined) updateData.target_ids = data.targetIds;
    if (data.channels !== undefined) updateData.channels = data.channels;
    if (data.isScheduled !== undefined) updateData.is_scheduled = data.isScheduled;
    if (data.scheduledAt !== undefined) updateData.scheduled_at = data.scheduledAt;
    if (data.status !== undefined) updateData.status = data.status;

    updateData.updated_at = new Date().toISOString();

    const { data: broadcast, error } = await this.supabase
      .from('broadcasts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to update broadcast', { broadcastId: id, error: error.message }, 'messages');
      throw error;
    }

    return this.mapBroadcast(broadcast);
  }

  async deleteBroadcast(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('broadcasts')
      .delete()
      .eq('id', id);

    if (error) {
      logger.error('Failed to delete broadcast', { broadcastId: id, error: error.message }, 'messages');
      throw error;
    }

    logger.info('Broadcast deleted', { broadcastId: id }, 'messages');
  }

  async sendBroadcast(id: string): Promise<Broadcast> {
    const { data, error } = await this.supabase
      .from('broadcasts')
      .update({
        status: 'SENT',
        sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to send broadcast', { broadcastId: id, error: error.message }, 'messages');
      throw error;
    }

    logger.info('Broadcast sent', { broadcastId: id }, 'messages');
    return this.mapBroadcast(data);
  }

  async scheduleBroadcast(id: string, scheduledAt: string): Promise<Broadcast> {
    const { data, error } = await this.supabase
      .from('broadcasts')
      .update({
        status: 'SCHEDULED',
        is_scheduled: true,
        scheduled_at: scheduledAt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      logger.error('Failed to schedule broadcast', { broadcastId: id, error: error.message }, 'messages');
      throw error;
    }

    logger.info('Broadcast scheduled', { broadcastId: id, scheduledAt }, 'messages');
    return this.mapBroadcast(data);
  }

  async getMessageStatistics(schoolId: string, filters?: MessageFilters): Promise<MessageStatistics> {
    const { data: messages } = await this.supabase
      .from('messages')
      .select('type, created_at, sender_id')
      .eq('school_id', schoolId);

    const list = (messages as Array<Record<string, unknown>>) || [];
    const byType: Record<string, number> = {};
    const byDay: Record<string, number> = {};
    const senderCounts: Record<string, number> = {};

    for (const msg of list) {
      const type = (msg.type as string) || 'TEXT';
      byType[type] = (byType[type] || 0) + 1;

      const day = (msg.created_at as string)?.substring(0, 10) || '';
      byDay[day] = (byDay[day] || 0) + 1;

      const sender = (msg.sender_id as string) || '';
      senderCounts[sender] = (senderCounts[sender] || 0) + 1;
    }

    const { count: activeConversations } = await this.supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('is_archived', false);

    const uniqueSenders = new Set(list.map((m) => m.sender_id));
    const daysCount = Object.keys(byDay).length || 1;

    return {
      totalMessages: list.length,
      messagesByType: byType,
      messagesByDay: Object.entries(byDay).map(([date, count]) => ({ date, count })),
      activeConversations: activeConversations || 0,
      activeUsers: uniqueSenders.size,
      averageMessagesPerDay: Math.round(list.length / daysCount),
      topSenders: Object.entries(senderCounts)
        .map(([userId, count]) => ({ userId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    };
  }

  async getDashboard(schoolId: string): Promise<CommunicationDashboard> {
    const { count: totalConversations } = await this.supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);

    const { count: activeConversations } = await this.supabase
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('is_archived', false);

    const { count: totalMessages } = await this.supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);

    const { count: totalNotifications } = await this.supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);

    const { count: unreadNotifications } = await this.supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('is_read', false);

    const { count: totalAnnouncements } = await this.supabase
      .from('announcements')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('is_published', true);

    const { count: totalBroadcasts } = await this.supabase
      .from('broadcasts')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);

    const { data: recentMessagesData } = await this.supabase
      .from('messages')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
      .limit(10);

    const { data: recentAnnouncementsData } = await this.supabase
      .from('announcements')
      .select('*')
      .eq('school_id', schoolId)
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(10);

    return {
      totalConversations: totalConversations || 0,
      activeConversations: activeConversations || 0,
      totalMessages: totalMessages || 0,
      unreadMessages: 0,
      totalNotifications: totalNotifications || 0,
      unreadNotifications: unreadNotifications || 0,
      totalAnnouncements: totalAnnouncements || 0,
      totalBroadcasts: totalBroadcasts || 0,
      activeUsers: 0,
      recentMessages: (recentMessagesData || []).map((m: Record<string, unknown>) => this.mapMessage(m)),
      recentAnnouncements: (recentAnnouncementsData || []).map((a: Record<string, unknown>) => this.mapAnnouncement(a)),
    };
  }

  async logAudit(schoolId: string, userId: string, action: string, entityType: string, entityId: string, previousValue?: Record<string, unknown>, newValue?: Record<string, unknown>): Promise<void> {
    const { error } = await this.supabase
      .from('message_audit_logs')
      .insert({
        school_id: schoolId,
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        previous_value: previousValue || null,
        new_value: newValue || null,
      });

    if (error) {
      logger.error('Failed to log audit', { schoolId, action, entityType, entityId, error: error.message }, 'messages');
    }
  }

  async getAuditLog(schoolId: string, filters?: MessageFilters): Promise<MessageAudit[]> {
    const limit = filters?.limit || 50;
    const offset = filters?.offset || 0;

    let query = this.supabase
      .from('message_audit_logs')
      .select('*')
      .eq('school_id', schoolId);

    query = query.order('created_at', { ascending: false });
    query = query.range(offset, offset + limit - 1);

    const { data, error } = await query;
    if (error || !data) return [];

    return data.map((a: Record<string, unknown>) => this.mapAuditLog(a));
  }

  private mapConversation(data: Record<string, unknown>): Conversation {
    return {
      id: data.id as string,
      schoolId: data.school_id as string,
      type: data.type as Conversation['type'],
      title: data.title as string,
      description: (data.description as string) || undefined,
      avatarUrl: (data.avatar_url as string) || undefined,
      isArchived: data.is_archived as boolean,
      isPinned: data.is_pinned as boolean,
      isMuted: data.is_muted as boolean,
      lastMessageAt: (data.last_message_at as string) || undefined,
      lastMessagePreview: (data.last_message_preview as string) || undefined,
      createdBy: data.created_by as string,
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string,
    };
  }

  private mapConversationMember(data: Record<string, unknown>): ConversationMember {
    return {
      id: data.id as string,
      conversationId: data.conversation_id as string,
      userId: data.user_id as string,
      role: data.role as ConversationMember['role'],
      isMuted: data.is_muted as boolean,
      lastReadAt: (data.last_read_at as string) || undefined,
      joinedAt: data.joined_at as string,
      leftAt: (data.left_at as string) || undefined,
    };
  }

  private mapMessage(data: Record<string, unknown>): Message {
    return {
      id: data.id as string,
      schoolId: data.school_id as string,
      conversationId: data.conversation_id as string,
      senderId: data.sender_id as string,
      content: data.content as string,
      type: data.type as Message['type'],
      status: data.status as Message['status'],
      replyToId: (data.reply_to_id as string) || undefined,
      isEdited: data.is_edited as boolean,
      isDeleted: data.is_deleted as boolean,
      isPinned: data.is_pinned as boolean,
      isForwarded: data.is_forwarded as boolean,
      forwardedFromId: (data.forwarded_from_id as string) || undefined,
      attachments: (data.attachments as Attachment[]) || [],
      reactions: (data.reactions as Reaction[]) || [],
      readBy: (data.readBy as MessageRead[]) || [],
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string,
    };
  }

  private mapMessageRead(data: Record<string, unknown>): MessageRead {
    return {
      id: data.id as string,
      messageId: data.message_id as string,
      userId: data.user_id as string,
      readAt: data.read_at as string,
    };
  }

  private mapReaction(data: Record<string, unknown>): Reaction {
    return {
      id: data.id as string,
      messageId: data.message_id as string,
      userId: data.user_id as string,
      type: data.type as Reaction['type'],
      createdAt: data.created_at as string,
    };
  }

  private mapAttachment(data: Record<string, unknown>): Attachment {
    return {
      id: data.id as string,
      messageId: data.message_id as string,
      fileName: data.file_name as string,
      fileType: data.file_type as string,
      fileSize: data.file_size as number,
      fileUrl: data.file_url as string,
      thumbnailUrl: (data.thumbnail_url as string) || undefined,
      mimeType: data.mime_type as string,
      type: data.type as Attachment['type'],
      uploadedBy: data.uploaded_by as string,
      createdAt: data.created_at as string,
    };
  }

  private mapNotification(data: Record<string, unknown>): Notification {
    return {
      id: data.id as string,
      schoolId: data.school_id as string,
      userId: data.user_id as string,
      type: data.type as Notification['type'],
      title: data.title as string,
      body: data.body as string,
      data: (data.data as Record<string, unknown>) || undefined,
      isRead: data.is_read as boolean,
      isDeleted: data.is_deleted as boolean,
      channels: (data.channels as Notification['channels']) || ['IN_APP'],
      sentAt: data.sent_at as string,
      readAt: (data.read_at as string) || undefined,
      createdAt: data.created_at as string,
    };
  }

  private mapNotificationPreference(data: Record<string, unknown>): NotificationPreference {
    return {
      id: data.id as string,
      userId: data.user_id as string,
      schoolId: data.school_id as string,
      channel: data.channel as NotificationPreference['channel'],
      type: data.type as NotificationPreference['type'],
      isEnabled: data.is_enabled as boolean,
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string,
    };
  }

  private mapNotificationSettings(data: Record<string, unknown>): NotificationSettings {
    return {
      userId: data.user_id as string,
      schoolId: data.school_id as string,
      emailEnabled: data.email_enabled as boolean,
      pushEnabled: data.push_enabled as boolean,
      smsEnabled: data.sms_enabled as boolean,
      whatsappEnabled: data.whatsapp_enabled as boolean,
      messageNotifications: data.message_notifications as boolean,
      announcementNotifications: data.announcement_notifications as boolean,
      broadcastNotifications: data.broadcast_notifications as boolean,
      mentionNotifications: data.mention_notifications as boolean,
      reactionNotifications: data.reaction_notifications as boolean,
      systemNotifications: data.system_notifications as boolean,
      quietHoursStart: (data.quiet_hours_start as string) || undefined,
      quietHoursEnd: (data.quiet_hours_end as string) || undefined,
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string,
    };
  }

  private mapGroup(data: Record<string, unknown>): Group {
    return {
      id: data.id as string,
      schoolId: data.school_id as string,
      name: data.name as string,
      description: (data.description as string) || undefined,
      avatarUrl: (data.avatar_url as string) || undefined,
      type: data.type as Group['type'],
      createdBy: data.created_by as string,
      isArchived: data.is_archived as boolean,
      memberCount: data.member_count as number,
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string,
    };
  }

  private mapGroupMember(data: Record<string, unknown>): GroupMember {
    return {
      id: data.id as string,
      groupId: data.group_id as string,
      userId: data.user_id as string,
      role: data.role as GroupMember['role'],
      joinedAt: data.joined_at as string,
      leftAt: (data.left_at as string) || undefined,
    };
  }

  private mapAnnouncement(data: Record<string, unknown>): Announcement {
    return {
      id: data.id as string,
      schoolId: data.school_id as string,
      title: data.title as string,
      content: data.content as string,
      type: data.type as Announcement['type'],
      priority: data.priority as Announcement['priority'],
      targetAudience: data.target_audience as Announcement['targetAudience'],
      targetIds: (data.target_ids as string[]) || [],
      attachments: (data.attachments as Attachment[]) || [],
      publishedBy: data.published_by as string,
      publishedAt: (data.published_at as string) || undefined,
      expiresAt: (data.expires_at as string) || undefined,
      isPublished: data.is_published as boolean,
      viewCount: data.view_count as number,
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string,
    };
  }

  private mapBroadcast(data: Record<string, unknown>): Broadcast {
    return {
      id: data.id as string,
      schoolId: data.school_id as string,
      title: data.title as string,
      content: data.content as string,
      scope: data.scope as Broadcast['scope'],
      targetIds: (data.target_ids as string[]) || [],
      channels: (data.channels as Broadcast['channels']) || [],
      attachments: (data.attachments as Attachment[]) || [],
      sentBy: data.sent_by as string,
      sentAt: (data.sent_at as string) || undefined,
      isScheduled: data.is_scheduled as boolean,
      scheduledAt: (data.scheduled_at as string) || undefined,
      recipientCount: data.recipient_count as number,
      deliveredCount: data.delivered_count as number,
      readCount: data.read_count as number,
      status: data.status as Broadcast['status'],
      createdAt: data.created_at as string,
      updatedAt: data.updated_at as string,
    };
  }

  private mapAuditLog(data: Record<string, unknown>): MessageAudit {
    return {
      id: data.id as string,
      schoolId: data.school_id as string,
      userId: data.user_id as string,
      action: data.action as string,
      entityType: data.entity_type as string,
      entityId: data.entity_id as string,
      previousValue: (data.previous_value as Record<string, unknown>) || undefined,
      newValue: (data.new_value as Record<string, unknown>) || undefined,
      ipAddress: (data.ip_address as string) || undefined,
      userAgent: (data.user_agent as string) || undefined,
      createdAt: data.created_at as string,
    };
  }
}
