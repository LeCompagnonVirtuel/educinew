import { getSupabase, camel } from '../shared';

export const sbNotifications = {
  async create({ userId, title, message, type }: { userId: string; title: string; message: string; type: string }) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('notifications')
      .insert({ user_id: userId, title, body: message, type, is_read: false });
    if (error) throw error;
  },

  async list() {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data);
  },

  async getUnreadCount() {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;
    const { count, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
    if (error) throw error;
    return count || 0;
  },

  async markRead(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    if (error) throw error;
  },

  async markAllRead() {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
    if (error) throw error;
  },
};
