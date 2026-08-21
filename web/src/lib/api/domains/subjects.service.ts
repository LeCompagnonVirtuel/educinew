import { getSupabase } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbSubjects = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('subjects')
      .select('*');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async get(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    let query = supabase
      .from('subjects')
      .select('*')
      .eq('id', id);
    if (schoolId) query = query.eq('school_id', schoolId);
    const { data, error } = await query.single();
    if (error) throw error;
    return data;
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!data.name) throw new Error('Le nom de la matière est requis');

    const { data: subject, error } = await supabase
      .from('subjects')
      .insert({
        name: data.name,
        coefficient: data.coefficient || 1,
        school_id: schoolId,
      })
      .select()
      .single();
    if (error) {
      if (error.message.includes('duplicate') || error.code === '23505') {
        throw new Error('Cette matière existe déjà');
      }
      throw new Error(`Erreur création matière: ${error.message}`);
    }
    return subject;
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (schoolId) {
      const { data: existing } = await supabase.from('subjects').select('school_id').eq('id', id).single();
      if (existing && existing.school_id !== schoolId) throw new Error('Accès non autorisé à cette matière');
    }
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.coefficient !== undefined) updateData.coefficient = data.coefficient;

    const { data: subject, error } = await supabase
      .from('subjects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return subject;
  },

  async remove(id: string) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    if (schoolId) {
      const { data: existing } = await supabase.from('subjects').select('school_id').eq('id', id).single();
      if (existing && existing.school_id !== schoolId) throw new Error('Accès non autorisé à cette matière');
    }
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);
    if (error) {
      if (error.message.includes('foreign key') || error.code === '23503') {
        throw new Error('Impossible de supprimer cette matière : elle est utilisée dans des notes ou des emplois du temps');
      }
      throw error;
    }
  },
};
