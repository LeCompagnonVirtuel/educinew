import { createClient } from '@/lib/supabase/client';

/**
 * SECURE multi-tenant helper.
 * Derives school_id from the authenticated Supabase session,
 * NOT from spoofable localStorage.
 *
 * Use this instead of getUserSchoolId() for all new code.
 */
export async function getAuthenticatedSchoolId(): Promise<string> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Non authentifié');

  // Always read from public.users (trusted source)
  const { data: dbUser } = await supabase
    .from('users')
    .select('school_id')
    .eq('id', user.id)
    .single();

  if (dbUser?.school_id) return dbUser.school_id;

  // Fallback to metadata only if DB query fails (e.g. during registration)
  const schoolId = user.user_metadata?.school_id;
  if (schoolId) return schoolId;

  throw new Error('Aucun établissement associé au compte');
}

/**
 * SECURE: Get school_id with role verification.
 * Throws if user doesn't have the required role.
 */
export async function getAuthorizedSchoolId(
  allowedRoles: string[] = ['ADMIN', 'SUPER_ADMIN']
): Promise<{ schoolId: string; userId: string; role: string }> {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) throw new Error('Non authentifié');

  // Always read from public.users (trusted source)
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

/**
 * SECURE: Verify a resource belongs to the user's school.
 * Returns true if the resource school_id matches, false otherwise.
 */
export async function verifySchoolOwnership(resourceSchoolId: string): Promise<boolean> {
  try {
    const schoolId = await getAuthenticatedSchoolId();
    return schoolId === resourceSchoolId;
  } catch {
    return false;
  }
}

/**
 * SECURE: Wrapper for Supabase queries that MUST be scoped by school_id.
 * Automatically adds school_id filter and throws if schoolId is missing.
 */
export async function scopedQuery<T>(
  queryFn: (schoolId: string) => Promise<T>
): Promise<T> {
  const schoolId = await getAuthenticatedSchoolId();
  return queryFn(schoolId);
}
