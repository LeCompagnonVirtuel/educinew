import { createClient } from '@/lib/supabase/server';

export async function getAuthenticatedSchoolId(): Promise<string> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Non authentifié');

  const { data: dbUser } = await supabase
    .from('users')
    .select('school_id')
    .eq('id', user.id)
    .single();

  if (dbUser?.school_id) return dbUser.school_id;

  const schoolId = user.user_metadata?.school_id;
  if (schoolId) return schoolId;

  throw new Error('Aucun établissement associé au compte');
}

export async function getAuthorizedSchoolId(
  allowedRoles: string[] = ['ADMIN', 'SUPER_ADMIN']
): Promise<{ schoolId: string; userId: string; role: string }> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Non authentifié');

  const { data: dbUser } = await supabase
    .from('users')
    .select('school_id, role')
    .eq('id', user.id)
    .single();

  const role = dbUser?.role || user.user_metadata?.role || 'STUDENT';
  const schoolId = dbUser?.school_id || user.user_metadata?.school_id;

  if (!schoolId) throw new Error('Aucun établissement associé');
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    throw new Error('Permissions insuffisantes');
  }

  return { schoolId, userId: user.id, role };
}

export async function verifySchoolOwnership(resourceSchoolId: string): Promise<boolean> {
  try {
    const schoolId = await getAuthenticatedSchoolId();
    return schoolId === resourceSchoolId;
  } catch {
    return false;
  }
}

export async function scopedQuery<T>(
  queryFn: (schoolId: string) => Promise<T>
): Promise<T> {
  const schoolId = await getAuthenticatedSchoolId();
  return queryFn(schoolId);
}
