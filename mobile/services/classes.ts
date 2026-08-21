import { supabase, camel, getUserSchoolId } from './supabase';
import { cached } from './base';
import { cacheManager } from './cacheManager';

export async function getClasses(schoolId?: string) {
  const sid = schoolId || await getUserSchoolId();
  return cached(`classes_${sid}`, 300000, async () => {
    let q = supabase.from('classes').select('*');
    if (sid) q = q.eq('school_id', sid);
    const { data, error } = await q;
    if (error) throw error;
    return camel(data);
  });
}

export async function getClass(id: string) {
  const { data, error } = await supabase.from('classes').select('*, students(*), class_subjects(*, subject:subjects(*), teacher:teachers(*, user:users(*)))').eq('id', id).single();
  if (error) throw error;
  return camel(data);
}

export async function createClass(classData: { name: string; level?: string; capacity?: number }) {
  await cacheManager.clear();
  const schoolId = await getUserSchoolId();
  const { data: cls, error } = await supabase.from('classes').insert({
    school_id: schoolId,
    name: classData.name,
    level: classData.level || null,
    capacity: classData.capacity || null,
  }).select().single();
  if (error) throw error;
  return camel(cls);
}

export async function updateClass(id: string, updates: { name?: string; level?: string; capacity?: number }) {
  await cacheManager.clear();
  const fields: any = {};
  if (updates.name) fields.name = updates.name;
  if (updates.level !== undefined) fields.level = updates.level;
  if (updates.capacity !== undefined) fields.capacity = updates.capacity;
  const { data: cls, error } = await supabase.from('classes').update(fields).eq('id', id).select().single();
  if (error) throw error;
  return camel(cls);
}

export async function deleteClass(id: string) {
  await cacheManager.clear();
  const { error } = await supabase.from('classes').delete().eq('id', id);
  if (error) throw error;
}

export async function getSubjects(schoolId?: string) {
  const sid = schoolId || await getUserSchoolId();
  return cached(`subjects_${sid}`, 300000, async () => {
    let q = supabase.from('subjects').select('*');
    if (sid) q = q.eq('school_id', sid);
    const { data, error } = await q;
    if (error) throw error;
    return camel(data);
  });
}

export async function getCourses(classId?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data: student } = await supabase.from('students').select('class_id').eq('user_id', user.id).single();
  const cid = classId || student?.class_id;
  if (!cid) return [];
  const { data, error } = await supabase.from('timetable_slots').select('*, subject:subjects(name), teacher:teachers(first_name, last_name, user:users(name)), class:classes(name)').eq('class_id', cid);
  if (error) throw error;
  return (data || []).map((s: any) => ({
    id: s.id,
    dayOfWeek: s.day_of_week || s.day,
    startTime: s.start_time,
    endTime: s.end_time,
    subject: s.subject?.name || 'Cours',
    teacherName: s.teacher?.user?.name || (s.teacher ? `${s.teacher.first_name || ''} ${s.teacher.last_name || ''}`.trim() : ''),
    className: s.class?.name || '',
    room: s.room,
  }));
}
