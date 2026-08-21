import { createClient } from '@supabase/supabase-js';

export class MobileMessageRepository {
  private readonly client;

  constructor(url: string, key: string) {
    this.client = createClient(url, key);
  }

  async findConversation(id: string) {
    const { data, error } = await this.client
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  async findAllConversations(schoolId: string, params?: Record<string, unknown>) {
    let query = this.client
      .from('conversations')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .order('updated_at', { ascending: false });
    if (params?.limit) query = query.limit(params.limit as number);
    if (params?.offset) query = query.range(params.offset as number, (params.offset as number) + (params.limit as number) - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, total: count ?? 0 };
  }

  async createConversation(payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('conversations')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateConversation(id: string, payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('conversations')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteConversation(id: string) {
    const { error } = await this.client
      .from('conversations')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  async archiveConversation(id: string) {
    const { data, error } = await this.client
      .from('conversations')
      .update({ archived: true, archived_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findMessages(conversationId: string, params?: Record<string, unknown>) {
    let query = this.client
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    if (params?.limit) query = query.limit(params.limit as number);
    if (params?.offset) query = query.range(params.offset as number, (params.offset as number) + (params.limit as number) - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, total: count ?? 0 };
  }

  async createMessage(payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('messages')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async updateMessage(id: string, payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('messages')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async deleteMessage(id: string) {
    const { error } = await this.client
      .from('messages')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }

  async softDeleteMessage(id: string) {
    const { data, error } = await this.client
      .from('messages')
      .update({ deleted: true, deleted_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async searchMessages(schoolId: string, query: string, params?: Record<string, unknown>) {
    let dbQuery = this.client
      .from('messages')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .textSearch('content', query)
      .order('created_at', { ascending: false });
    if (params?.limit) dbQuery = dbQuery.limit(params.limit as number);
    const { data, error, count } = await dbQuery;
    if (error) throw error;
    return { data, total: count ?? 0 };
  }

  async findMessageReactions(messageId: string) {
    const { data, error } = await this.client
      .from('message_reactions')
      .select('*')
      .eq('message_id', messageId);
    if (error) throw error;
    return data;
  }

  async addReaction(messageId: string, userId: string, emoji: string) {
    const { data, error } = await this.client
      .from('message_reactions')
      .upsert({ message_id: messageId, user_id: userId, emoji })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async removeReaction(messageId: string, userId: string, emoji: string) {
    const { error } = await this.client
      .from('message_reactions')
      .delete()
      .eq('message_id', messageId)
      .eq('user_id', userId)
      .eq('emoji', emoji);
    if (error) throw error;
  }

  async markAsRead(messageId: string, userId: string) {
    const { data, error } = await this.client
      .from('message_reads')
      .upsert({ message_id: messageId, user_id: userId, read_at: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async markConversationAsRead(conversationId: string, userId: string) {
    const { data: unreadMessages } = await this.client
      .from('messages')
      .select('id')
      .eq('conversation_id', conversationId)
      .not('id', 'in', this.client
        .from('message_reads')
        .select('message_id')
        .eq('user_id', userId));
    if (!unreadMessages?.length) return [];
    const inserts = unreadMessages.map((m: { id: string }) => ({
      message_id: m.id,
      user_id: userId,
      read_at: new Date().toISOString(),
    }));
    const { data, error } = await this.client
      .from('message_reads')
      .upsert(inserts)
      .select();
    if (error) throw error;
    return data;
  }

  async getUnreadCount(conversationId: string, userId: string) {
    const { count, error } = await this.client
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversationId)
      .not('id', 'in', this.client
        .from('message_reads')
        .select('message_id')
        .eq('user_id', userId));
    if (error) throw error;
    return count ?? 0;
  }

  async getTotalUnreadCount(userId: string, schoolId: string) {
    const { count, error } = await this.client
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .not('id', 'in', this.client
        .from('message_reads')
        .select('message_id')
        .eq('user_id', userId));
    if (error) throw error;
    return count ?? 0;
  }

  async findNotifications(userId: string, params?: Record<string, unknown>) {
    let query = this.client
      .from('notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (params?.limit) query = query.limit(params.limit as number);
    if (params?.offset) query = query.range(params.offset as number, (params.offset as number) + (params.limit as number) - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, total: count ?? 0 };
  }

  async createNotification(payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('notifications')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async markNotificationAsRead(id: string) {
    const { data, error } = await this.client
      .from('notifications')
      .update({ read: true, read_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findGroups(schoolId: string) {
    const { data, error } = await this.client
      .from('message_groups')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async createGroup(payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('message_groups')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findAnnouncements(schoolId: string, params?: Record<string, unknown>) {
    let query = this.client
      .from('announcements')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });
    if (params?.limit) query = query.limit(params.limit as number);
    if (params?.offset) query = query.range(params.offset as number, (params.offset as number) + (params.limit as number) - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, total: count ?? 0 };
  }

  async createAnnouncement(payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('announcements')
      .insert({ ...payload, status: 'draft' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async publishAnnouncement(id: string) {
    const { data, error } = await this.client
      .from('announcements')
      .update({ status: 'published', published_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async findBroadcasts(schoolId: string, params?: Record<string, unknown>) {
    let query = this.client
      .from('broadcasts')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false });
    if (params?.limit) query = query.limit(params.limit as number);
    if (params?.offset) query = query.range(params.offset as number, (params.offset as number) + (params.limit as number) - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, total: count ?? 0 };
  }

  async createBroadcast(payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('broadcasts')
      .insert({ ...payload, status: 'draft' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async sendBroadcast(id: string) {
    const { data, error } = await this.client
      .from('broadcasts')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getMessageStatistics(schoolId: string) {
    const { data: totalMessages, error: e1 } = await this.client
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    const { data: totalConversations, error: e2 } = await this.client
      .from('conversations')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    const { data: totalNotifications, error: e3 } = await this.client
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId);
    if (e1) throw e1;
    if (e2) throw e2;
    if (e3) throw e3;
    return {
      totalMessages: totalMessages ?? 0,
      totalConversations: totalConversations ?? 0,
      totalNotifications: totalNotifications ?? 0,
    };
  }

  async getDashboard(schoolId: string) {
    const stats = await this.getMessageStatistics(schoolId);
    const { data: recentMessages } = await this.client
      .from('messages')
      .select('*')
      .eq('school_id', schoolId)
      .order('created_at', { ascending: false })
      .limit(10);
    const { data: recentConversations } = await this.client
      .from('conversations')
      .select('*')
      .eq('school_id', schoolId)
      .order('updated_at', { ascending: false })
      .limit(10);
    return { ...stats, recentMessages, recentConversations };
  }

  async logAudit(payload: Record<string, unknown>) {
    const { data, error } = await this.client
      .from('message_audit_log')
      .insert({ ...payload, timestamp: new Date().toISOString() })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getAuditLog(schoolId: string, params?: Record<string, unknown>) {
    let query = this.client
      .from('message_audit_log')
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .order('timestamp', { ascending: false });
    if (params?.limit) query = query.limit(params.limit as number);
    if (params?.offset) query = query.range(params.offset as number, (params.offset as number) + (params.limit as number) - 1);
    const { data, error, count } = await query;
    if (error) throw error;
    return { data, total: count ?? 0 };
  }
}
