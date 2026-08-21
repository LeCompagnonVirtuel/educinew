import type { NextRequest } from 'next/server';
import type { AuthUser } from '@educi/types';

export interface AuthMiddlewareResult {
  user: AuthUser | null;
  dbUser: { school_id: string | null; role: string | null; is_first_login: boolean; activation_token: string | null } | null;
  error?: string;
}

export async function getAuthContext(
  supabase: { auth: { getUser: () => Promise<{ data: { user: { id: string; email_confirmed_at: string | null } | null } }> }; from: (table: string) => { select: (cols: string) => { eq: (col: string, val: string) => { single: () => Promise<{ data: Record<string, unknown> | null }> } } }
}): Promise<AuthMiddlewareResult> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { user: null, dbUser: null };

  const { data: dbUser } = await supabase
    .from('users')
    .select('school_id, role, is_first_login, activation_token')
    .eq('id', user.id)
    .single();

  return {
    user: {
      id: user.id,
      email: user.email || '',
      name: (dbUser?.name as string) || user.email || '',
      role: (dbUser?.role as AuthUser['role']) || 'STUDENT',
      schoolId: (dbUser?.school_id as string) || undefined,
      isActive: true,
      isFirstLogin: (dbUser?.is_first_login as boolean) ?? false,
      createdAt: user.created_at,
    },
    dbUser: dbUser as AuthMiddlewareResult['dbUser'],
  };
}

export function shouldRedirectToVerification(user: { email_confirmed_at: string | null } | null, dbUser: { school_id: string | null; role: string | null } | null): boolean {
  if (user?.email_confirmed_at) return false;
  if (dbUser?.school_id && dbUser?.role) return false;
  return true;
}

export function shouldRedirectToFirstLogin(dbUser: { is_first_login: boolean; activation_token: string | null } | null): boolean {
  return (dbUser?.is_first_login === true && !!dbUser?.activation_token);
}

export function shouldRedirectToRegister(dbUser: { school_id: string | null; role: string | null } | null): boolean {
  return dbUser?.role === 'ADMIN' && !dbUser?.school_id;
}
