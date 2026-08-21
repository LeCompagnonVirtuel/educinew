import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { Platform } from 'react-native';
import type { AuthUser, AuthSession } from '@educi/types';
import { ROLE_DASHBOARDS } from '@educi/config';
import { createMobileAuthRepository } from '../repositories';
import { MobileSessionService, createMobileAuditService, createSecureTokenStorage } from '../services';
import { logger } from '@educi/logger';

interface MobileAuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isFirstLogin: boolean;
  login: (identifier: string, password: string) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  isAuthenticated: boolean;
  token: string | null;
}

const MobileAuthContext = createContext<MobileAuthContextType>({} as MobileAuthContextType);

export function MobileAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const authRepo = useRef(createMobileAuthRepository());
  const sessionService = useRef(new MobileSessionService());
  const auditService = useRef(createMobileAuditService());
  const storage = useRef(createSecureTokenStorage());

  const doRefreshSession = useCallback(async () => {
    const session = await authRepo.current.refreshSession();
    await storage.current.setToken(session.accessToken);
    await storage.current.setRefreshToken(session.refreshToken);
    await storage.current.setUser(session.user);
    setUser(session.user);
    setToken(session.accessToken);
    sessionService.current.scheduleProactiveRefresh(session);
    return session;
  }, []);

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const storedToken = await storage.current.getToken();
        const storedUser = await storage.current.getUser();
        const storedRefreshToken = await storage.current.getRefreshToken();

        if (storedToken && storedUser) {
          const decoded = sessionService.current.decodePayload(storedToken);
          const isExpired = decoded && typeof decoded.exp === 'number' && decoded.exp * 1000 < Date.now();

          if (isExpired && storedRefreshToken) {
            const session = await doRefreshSession();
            if (mounted) {
              setIsFirstLogin(session.user.isFirstLogin);
            }
          } else if (!isExpired) {
            if (mounted) {
              setUser(storedUser);
              setToken(storedToken);
              sessionService.current.scheduleProactiveRefresh({
                accessToken: storedToken,
                refreshToken: storedRefreshToken || '',
                expiresAt: decoded?.exp as number || 0,
                user: storedUser,
              });
            }
          } else {
            await storage.current.clearAll();
          }
        }
      } catch (error) {
        logger.error('Mobile session init failed', { error: String(error) }, 'mobile-auth');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();
    return () => { mounted = false; };
  }, [doRefreshSession]);

  sessionService.current.setRefreshCallback(doRefreshSession);

  const login = async (identifier: string, password: string): Promise<AuthUser> => {
    const session = await authRepo.current.signIn(identifier, password);

    await storage.current.setToken(session.accessToken);
    await storage.current.setRefreshToken(session.refreshToken);
    await storage.current.setUser(session.user);

    setUser(session.user);
    setToken(session.accessToken);
    setIsFirstLogin(session.user.isFirstLogin);

    sessionService.current.scheduleProactiveRefresh(session);

    await auditService.current.log({
      action: 'LOGIN',
      entity: 'auth',
      userId: session.user.id,
      schoolId: session.user.schoolId,
    });

    return session.user;
  };

  const logout = async () => {
    sessionService.current.clearRefreshTimer();

    if (user) {
      await auditService.current.log({
        action: 'LOGOUT',
        entity: 'auth',
        userId: user.id,
        schoolId: user.schoolId,
      });
    }

    await authRepo.current.signOut();
    await storage.current.clearAll();

    setUser(null);
    setToken(null);
    setIsFirstLogin(false);
  };

  return (
    <MobileAuthContext.Provider value={{
      user,
      loading,
      isFirstLogin,
      login,
      logout,
      refreshSession: doRefreshSession,
      isAuthenticated: !!user,
      token,
    }}>
      {children}
    </MobileAuthContext.Provider>
  );
}

export const useMobileAuth = () => useContext(MobileAuthContext);
