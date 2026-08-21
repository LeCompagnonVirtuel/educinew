'use client';

import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthUser, AuthSession } from '@educi/types';
import { ROLE_DASHBOARDS } from '@educi/config';
import { createAuthRepository } from '../repositories';
import { createAuditRepository } from '../repositories';
import { AuthService, SessionService, PasswordService, PermissionService, TokenService, EmailVerificationService, AuditService, SecurityService } from '../services';
import { logger } from '@educi/logger';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  checkRegistrationStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function createAuthService() {
  const authRepo = createAuthRepository();
  const auditRepo = createAuditRepository();
  const passwordService = new PasswordService();
  const sessionService = new SessionService(authRepo);
  const auditService = new AuditService(auditRepo);
  const securityService = new SecurityService();
  const emailVerificationService = new EmailVerificationService();
  const tokenService = new TokenService();

  return new AuthService(
    authRepo,
    passwordService,
    sessionService,
    auditService,
    securityService,
    emailVerificationService,
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authServiceRef = useRef(createAuthService());
  const authService = authServiceRef.current;

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const session = await authService.refreshSession();
        if (mounted) {
          setUser(session.user);
          try { localStorage.setItem('educi_user', JSON.stringify(session.user)); } catch {}
        }
      } catch {
        if (mounted) {
          setUser(null);
          try { localStorage.removeItem('educi_user'); } catch {}
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();

    return () => { mounted = false; };
  }, [authService]);

  const login = async (identifier: string, password: string): Promise<AuthUser> => {
    const session = await authService.login(identifier, password);
    setUser(session.user);
    try { localStorage.setItem('educi_user', JSON.stringify(session.user)); } catch {}

    const urlParams = new URLSearchParams(window.location.search);
    const redirectTo = urlParams.get('redirect');
    if (redirectTo) {
      try {
        const url = new URL(redirectTo, window.location.origin);
        if (url.origin === window.location.origin && url.pathname.startsWith('/')) {
          router.push(url.pathname + url.search);
          return session.user;
        }
      } catch {}
    }

    if (!session.user.emailConfirmedAt) {
      router.push('/verification');
      return session.user;
    }

    if (session.user.isFirstLogin) {
      router.push('/first-login');
      return session.user;
    }

    const dashboard = ROLE_DASHBOARDS[session.user.role] || '/dashboard';
    router.push(dashboard);
    return session.user;
  };

  const logout = async () => {
    if (user) {
      await authService.logout(user.id, user.schoolId);
    }
    setUser(null);
    try { localStorage.removeItem('educi_user'); } catch {}
    router.push('/');
  };

  const checkRegistrationStatus = async () => {
    try {
      const profile = await authService.getProfile('');
      if (!profile) {
        router.push('/login');
        return;
      }
      if (profile.schoolId) {
        const dashboard = ROLE_DASHBOARDS[profile.role] || '/dashboard';
        router.push(dashboard);
      } else {
        router.push('/onboarding');
      }
    } catch {
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

export { PermissionService } from '../services';
export { TokenService } from '../services';
