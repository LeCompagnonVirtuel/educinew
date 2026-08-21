import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbMessaging = {
  async getInbox() {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!messages_sender_id_fkey(*), receiver:users!messages_receiver_id_fkey(*)')
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data);
  },

  async getConversation(userId: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:users!messages_sender_id_fkey(*)')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${user.id})`)
      .order('created_at');
    if (error) throw error;
    return camel(data);
  },

  async send(receiverId: string, content: string) {
    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Non authentifié');
    if (!content || !content.trim()) throw new Error('Le message ne peut pas être vide');
    if (!receiverId) throw new Error('Destinataire requis');

    const schoolId = await getAuthenticatedSchoolId();
    const { data, error } = await supabase
      .from('messages')
      .insert({ sender_id: user.id, receiver_id: receiverId, content: content.trim(), school_id: schoolId, is_read: false })
      .select()
      .single();
    if (error) throw new Error(`Erreur envoi message: ${error.message}`);
    return data;
  },

  async createAnnouncement(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');
    if (!data.title) throw new Error('Le titre est requis');
    if (!data.message && !data.content) throw new Error('Le contenu est requis');

    const { data: announcement, error } = await supabase
      .from('announcements')
      .insert({
        school_id: schoolId,
        title: data.title,
        message: data.message || data.content,
        target_role: data.targetRole || data.target_role || null,
      })
      .select()
      .single();
    if (error) throw new Error(`Erreur création annonce: ${error.message}`);
    return announcement;
  },

  async removeAnnouncement(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (schoolId) {
      const { data: existing } = await supabase.from('announcements').select('school_id').eq('id', id).single();
      if (existing && existing.school_id !== schoolId) throw new Error('Accès non autorisé à cette annonce');
    }
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) throw error;
  },

  async getAnnouncements(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase.from('announcements').select('*');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },
};
