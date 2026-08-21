import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbInvitations = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('invitations')
      .select('*, invited_by:users!invitations_invited_by_id_fkey(*)');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    return camel(data);
  },

  async validate(token: string) {
    const supabase = getSupabase();
    const { data: invitation } = await supabase
      .from('invitations')
      .select('*')
      .eq('token', token)
      .is('accepted_at', null)
      .gt('expires_at', new Date().toISOString())
      .single();
    if (invitation) return invitation;

    const { data: staffInvite } = await supabase
      .from('staff_invitations')
      .select('*')
      .eq('invitation_token', token)
      .eq('status', 'PENDING')
      .gt('expires_at', new Date().toISOString())
      .single();
    if (staffInvite) {
      return {
        email: staffInvite.email,
        role: staffInvite.role,
        token: staffInvite.invitation_token,
        expires_at: staffInvite.expires_at,
        school_id: staffInvite.school_id,
        is_staff_invitation: true,
        position: staffInvite.position,
        department: staffInvite.department,
      };
    }

    throw new Error('Invitation invalide ou expirée');
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');
    if (!data.email) throw new Error('L\'email est requis');
    if (!data.role) throw new Error('Le rôle est requis');

    const { data: { user } } = await supabase.auth.getUser();
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: invitation, error } = await supabase
      .from('invitations')
      .insert({
        school_id: schoolId,
        email: data.email,
        role: data.role,
        token,
        invited_by_id: user?.id,
        expires_at: expiresAt,
        is_active: true,
      })
      .select()
      .single();
    if (error) {
      if (error.message.includes('duplicate') || error.code === '23505') {
        throw new Error('Une invitation a déjà été envoyée à cet email pour ce rôle');
      }
      throw new Error(`Erreur création invitation: ${error.message}`);
    }
    return invitation;
  },
};
