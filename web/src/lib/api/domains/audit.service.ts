import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbAudit = {
  async list(filters?: { action?: string; entity?: string }) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement requis pour consulter les logs');
    let query = supabase
      .from('audit_logs')
      .select('*, user:users(*)')
      .eq('school_id', schoolId);
    if (filters?.action) query = query.eq('action', filters.action);
    if (filters?.entity) query = query.eq('entity', filters.entity);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return camel(data);
  },
};
