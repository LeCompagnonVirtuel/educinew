import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface NotificationPayload {
  title: string;
  body: string;
  targetUserId?: string;
  targetRole?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
}

interface NotificationRecord {
  id: string;
  title: string;
  body: string;
  category: string;
  priority: string;
  read: boolean;
  created_at: string;
}

export class ScNotificationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async sendNotification(schoolId: string, payload: NotificationPayload): Promise<NotificationRecord> {
    const { data, error } = await this.supabase
      .from('sc_notifications')
      .insert({
        school_id: schoolId,
        title: payload.title,
        body: payload.body,
        target_user_id: payload.targetUserId,
        target_role: payload.targetRole,
        priority: payload.priority,
        category: payload.category,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async getNotifications(schoolId: string, userId: string): Promise<NotificationRecord[]> {
    const { data, error } = await this.supabase
      .from('sc_notifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  async markAsRead(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async markAllAsRead(schoolId: string, userId: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_notifications')
      .update({ read: true })
      .eq('school_id', schoolId)
      .eq('target_user_id', userId)
      .eq('read', false);
    if (error) throw error;
  }

  async getUnreadCount(schoolId: string, userId: string): Promise<number> {
    const { count, error } = await this.supabase
      .from('sc_notifications')
      .select('*', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .eq('target_user_id', userId)
      .eq('read', false);
    if (error) throw error;
    return count ?? 0;
  }

  async deleteNotification(schoolId: string, id: string): Promise<void> {
    const { error } = await this.supabase
      .from('sc_notifications')
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw error;
  }

  async getByCategory(schoolId: string, userId: string, category: string): Promise<NotificationRecord[]> {
    const { data, error } = await this.supabase
      .from('sc_notifications')
      .select('*')
      .eq('school_id', schoolId)
      .eq('target_user_id', userId)
      .eq('category', category)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }
}
