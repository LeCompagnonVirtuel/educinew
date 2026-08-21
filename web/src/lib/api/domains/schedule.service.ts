import { getSupabase, camel } from '../shared';
import { getAuthenticatedSchoolId } from '../secure';

export const sbSchedule = {
  async list(schoolId?: string) {
    const supabase = getSupabase();
    const sid = schoolId || await getAuthenticatedSchoolId();
    let query = supabase
      .from('timetable_slots')
      .select('*, subject:subjects(*), class:classes(*), teacher:teachers(*, user:users(*))');
    if (sid) query = query.eq('school_id', sid);
    const { data, error } = await query.order('day_of_week').order('start_time');
    if (error) throw error;
    return camel(data);
  },

  async create(data: any) {
    const supabase = getSupabase();
    const schoolId = data.schoolId || data.school_id || await getAuthenticatedSchoolId();
    if (!schoolId) throw new Error('Établissement non identifié');

    const { data: slot, error } = await supabase
      .from('timetable_slots')
      .insert({
        school_id: schoolId,
        class_id: data.classId || data.class_id,
        subject_id: data.subjectId || data.subject_id,
        teacher_id: data.teacherId || data.teacher_id || null,
        day_of_week: data.dayOfWeek || data.day_of_week,
        start_time: data.startTime || data.start_time,
        end_time: data.endTime || data.end_time,
        room: data.room || null,
      })
      .select()
      .single();
    if (error) throw new Error(`Erreur création créneau: ${error.message}`);
    return slot;
  },

  async update(id: string, data: any) {
    const supabase = getSupabase();
    const updateData: any = {};
    if (data.classId || data.class_id) updateData.class_id = data.classId || data.class_id;
    if (data.subjectId || data.subject_id) updateData.subject_id = data.subjectId || data.subject_id;
    if (data.teacherId || data.teacher_id) updateData.teacher_id = data.teacherId || data.teacher_id;
    if (data.dayOfWeek || data.day_of_week) updateData.day_of_week = data.dayOfWeek || data.day_of_week;
    if (data.startTime || data.start_time) updateData.start_time = data.startTime || data.start_time;
    if (data.endTime || data.end_time) updateData.end_time = data.endTime || data.end_time;
    if (data.room !== undefined) updateData.room = data.room;

    const { data: slot, error } = await supabase
      .from('timetable_slots')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return slot;
  },

  async remove(id: string) {
    const supabase = getSupabase();
    const { error } = await supabase.from('timetable_slots').delete().eq('id', id);
    if (error) throw error;
  },

  async checkConflicts(conflictData: any) {
    const supabase = getSupabase();
    const schoolId = await getAuthenticatedSchoolId();
    const { dayOfWeek, startTime, endTime, teacherId, classId, excludeId } = conflictData;

    let query = supabase
      .from('timetable_slots')
      .select('id, start_time, end_time')
      .eq('school_id', schoolId)
      .eq('day_of_week', dayOfWeek)
      .lt('start_time', endTime)
      .gt('end_time', startTime);

    if (teacherId) query = query.or(`teacher_id.eq.${teacherId}`);
    if (classId) query = query.or(`class_id.eq.${classId}`);
    if (excludeId) query = query.neq('id', excludeId);

    const { data: conflicts, error } = await query;
    if (error) throw error;
    return conflicts.length > 0;
  },
};