'use client';

import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { sbAuth } from '@/lib/api/supabase-client';
import { sbEmailTrigger } from '@/lib/api/domains/email-trigger.service';
import { authAudit } from '@/lib/api/auth-audit.service';
import { sessionManager } from '@/lib/auth/session-manager';
import { ROLE_DASHBOARDS } from '@/lib/roles';
import type { User } from '@/types';
import type { AuthChangeEvent, Session, SupabaseClient } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<User>;
  logout: () => void;
  isAuthenticated: boolean;
  checkRegistrationStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabaseRef = useRef<SupabaseClient>(createClient());
  const supabase = supabaseRef.current;

  const enrichUserData = useCallback(async (userData: User): Promise<User> => {
    try {
      const { data: dbUser } = await supabase
        .from('users')
        .select('school_id, role, is_active')
        .eq('id', userData.id)
        .single();
      if (dbUser) {
        return {
          ...userData,
          schoolId: dbUser.school_id || userData.schoolId,
          role: dbUser.role || userData.role,
          isActive: dbUser.is_active ?? userData.isActive,
        };
      }
    } catch {} // Safe to ignore: enrichment is best-effort
    return userData;
  }, [supabase]);

  useEffect(() => {
    let mounted = true;

    const getUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser && mounted) {
          let userData: User = {
            id: authUser.id,
            name: authUser.user_metadata?.name || authUser.email || '',
            email: authUser.email || '',
            // SECURITY: Initial fallback only — enrichUserData will override from DB
            role: 'STUDENT',
            schoolId: undefined,
            phone: authUser.user_metadata?.phone,
            photoUrl: authUser.user_metadata?.photo_url,
            isActive: true,
            createdAt: authUser.created_at,
          };
          userData = await enrichUserData(userData);
          if (mounted) {
            setUser(userData);
            try { localStorage.setItem('user', JSON.stringify(userData)); } catch {} // SSR-safe
          }
        }
      } catch {
        // Session invalid or expired — clear stale data
        if (mounted) {
          setUser(null);
          try { localStorage.removeItem('user'); } catch {} // SSR-safe
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') && session?.user) {
          const authUser = session.user;
          let userData: User = {
            id: authUser.id,
            name: authUser.user_metadata?.name || authUser.email || '',
            email: authUser.email || '',
            // SECURITY: Initial fallback only — enrichUserData will override from DB
            role: 'STUDENT',
            schoolId: undefined,
            phone: authUser.user_metadata?.phone,
            photoUrl: authUser.user_metadata?.photo_url,
            isActive: true,
            createdAt: authUser.created_at,
          };
          userData = await enrichUserData(userData);
          if (mounted) {
            setUser(userData);
            setLoading(false);
            try { localStorage.setItem('user', JSON.stringify(userData)); } catch {} // SSR-safe
          }
        } else if (event === 'SIGNED_OUT') {
          if (mounted) {
            setUser(null);
            setLoading(false);
            try { localStorage.removeItem('user'); } catch {} // SSR-safe
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [enrichUserData]);

  const login = async (identifier: string, password: string): Promise<User> => {
    let result;
    try {
      result = await sbAuth.login(identifier, password);
    } catch (error: any) {
      try {
        const schoolId = user?.schoolId || null;
        await authAudit.logFailedLogin(schoolId, identifier, error.message || 'Unknown error');
      } catch {} // Best-effort: audit logging is non-critical
      throw error;
    }

    const isFirstLogin = (result.user as any).isFirstLogin === true;

    const userData: User = {
      id: result.user.id,
      name: result.user.name,
      email: result.user.email,
      role: result.user.role || 'STUDENT',
      schoolId: result.user.schoolId,
      phone: result.user.phone,
      photoUrl: result.user.photoUrl,
      isActive: result.user.isActive ?? true,
      createdAt: result.user.createdAt,
    };

    setUser(userData);

    if (isFirstLogin) {
      try {
        sbEmailTrigger.onLoginConfirmation(
          userData.email,
          userData.name,
          typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
        );
      } catch {}
    }

    if (userData.schoolId) {
      try {
        authAudit.logLogin(
          userData.schoolId,
          userData.id,
          typeof navigator !== 'undefined' ? navigator.userAgent : undefined
        );
      } catch {} // Best-effort: audit logging is non-critical
    }

    try { sessionManager.trackSession(); } catch {} // Best-effort: non-critical tracking

    try { localStorage.setItem('user', JSON.stringify(userData)); } catch {} // SSR-safe

    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect');
    if (redirectTo) {
      try {
        const url = new URL(redirectTo, window.location.origin);
        if (url.origin === window.location.origin && url.pathname.startsWith('/')) {
          router.push(url.pathname + url.search);
          return userData;
        }
      } catch {} // Safe to ignore: invalid URL falls through to default redirect
    }

    const emailConfirmed = (result.user as any).emailConfirmedAt;
    if (!emailConfirmed) {
      router.push('/verification');
      return userData;
    }

    if (isFirstLogin) {
      router.push('/first-login');
      return userData;
    }

    const dashboard = ROLE_DASHBOARDS[userData.role] || '/dashboard';
    router.push(dashboard);
    return userData;
  };

  const logout = async () => {
    if (user?.schoolId) {
      try { authAudit.logLogout(user.schoolId, user.id); } catch {} // Best-effort: audit logging is non-critical
    }
    await supabase.auth.signOut();
    setUser(null);
    try { localStorage.removeItem('user'); } catch {} // SSR-safe
    router.push('/');
  };

  const checkRegistrationStatus = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.push('/login');
        return;
      }

      // SECURITY: Read school_id and role from DB, never from client-writable metadata
      const { data: dbUser } = await supabase
        .from('users')
        .select('school_id, role')
        .eq('id', authUser.id)
        .single();

      if (dbUser?.school_id) {
        const dashboard = ROLE_DASHBOARDS[dbUser.role || 'STUDENT'] || '/dashboard';
        router.push(dashboard);
        return;
      }

      const { data: drafts } = await supabase
        .from('onboarding_drafts')
        .select('id')
        .eq('user_id', authUser.id)
        .eq('completed', false)
        .limit(1);

      if (drafts && drafts.length > 0) {
        router.push('/onboarding?resume=true');
      } else {
        router.push('/onboarding');
      }
    } catch (err) {
      console.error('[checkRegistrationStatus] Error:', err);
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, checkRegistrationStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
