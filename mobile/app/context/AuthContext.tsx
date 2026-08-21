import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import { api } from '../../services/api';
import { realtimeManager } from '../hooks/useRealtime';

const isWeb = Platform.OS === 'web';

let SecureStore: typeof import('expo-secure-store') | null = null;
if (!isWeb) {
  SecureStore = require('expo-secure-store');
}

const STORAGE_KEYS = {
  token: 'educi_token',
  user: 'educi_user',
  refreshToken: 'educi_refresh_token',
};

const BLOCKED_ROLES = ['SUPER_ADMIN', 'OWNER', 'ADMIN'];

async function getStoredItem(key: string): Promise<string | null> {
  if (isWeb) {
    return localStorage.getItem(key);
  }
  return SecureStore?.getItemAsync(key) ?? null;
}

async function setStoredItem(key: string, value: string): Promise<void> {
  if (isWeb) {
    localStorage.setItem(key, value);
    return;
  }
  await SecureStore?.setItemAsync(key, value);
}

async function deleteStoredItem(key: string): Promise<void> {
  if (isWeb) {
    localStorage.removeItem(key);
    return;
  }
  await SecureStore?.deleteItemAsync(key);
}

async function clearAllStored(): Promise<void> {
  for (const key of Object.values(STORAGE_KEYS)) {
    await deleteStoredItem(key);
  }
}

export interface StudentProfile {
  id: string;
  student_id: string;
  class_id?: string;
  class_name?: string;
  matricule?: string;
  school_id: string;
}

export interface TeacherProfile {
  id: string;
  teacher_id: string;
  department?: string;
  subjects?: string[];
  school_id: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  schoolId?: string;
  phone?: string;
  photoUrl?: string;
  isActive?: boolean;
  isFirstLogin?: boolean;
  is_first_login?: boolean;
  must_change_password?: boolean;
  identifier?: string;
  invitationCode?: string;
  studentProfile?: StudentProfile;
  teacherProfile?: TeacherProfile;
  school?: { id: string; name: string; code: string };
}

export interface AuthLoginData {
  token: string;
  refreshToken: string;
  user: User;
}

export interface JwtPayload {
  exp?: number;
  sub?: string;
  role?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (identifier: string, password: string, schoolCode?: string, directAuth?: AuthLoginData) => Promise<void>;
  loginWithQR: (qrData: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  isTokenExpired: () => boolean;
  isFirstLogin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

function base64Decode(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let output = '';
  let buffer = 0;
  let bits = 0;
  for (let i = 0; i < str.length; i++) {
    const idx = chars.indexOf(str[i]);
    if (idx === -1 || idx === 64) continue;
    buffer = (buffer << 6) | idx;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      output += String.fromCharCode((buffer >> bits) & 0xff);
    }
  }
  return output;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    return JSON.parse(base64Decode(padded));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoutRef = useRef<() => Promise<void>>(() => Promise.resolve());

  useEffect(() => {
    loadStoredAuth();
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  const loadStoredAuth = async () => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 10000);

    try {
      const storedToken = await getStoredItem(STORAGE_KEYS.token);
      const storedUser = await getStoredItem(STORAGE_KEYS.user);
      const storedRefresh = await getStoredItem(STORAGE_KEYS.refreshToken);

      if (storedToken && storedUser) {
        const decoded = decodeJwtPayload(storedToken);
        if (decoded && decoded.exp) {
          const expiresAt = decoded.exp * 1000;
          const now = Date.now();

          const parsedUser = JSON.parse(storedUser);

          if (BLOCKED_ROLES.includes(parsedUser.role)) {
            await clearAllStored();
            api.setToken(null);
            return;
          }

          if (expiresAt > now) {
            setToken(storedToken);
            setUser(parsedUser);
            setRefreshToken(storedRefresh);
            // Restore isFirstLogin from stored user data
            const firstLogin = parsedUser.isFirstLogin === true ||
              parsedUser.is_first_login === true ||
              parsedUser.must_change_password === true;
            setIsFirstLogin(firstLogin);
            api.setToken(storedToken);
            scheduleTokenRefresh(expiresAt - now);
          } else if (storedRefresh) {
            try {
              const refreshed = await api.refreshToken(storedRefresh);
              setToken(refreshed.token);
              setRefreshToken(refreshed.refreshToken);
              api.setToken(refreshed.token);
              await setStoredItem(STORAGE_KEYS.token, refreshed.token);
              await setStoredItem(STORAGE_KEYS.refreshToken, refreshed.refreshToken);

              const freshUser = await api.getProfile();
              if (BLOCKED_ROLES.includes(freshUser.role)) {
                await clearAllStored();
                api.setToken(null);
                return;
              }
              setUser(freshUser);
              await setStoredItem(STORAGE_KEYS.user, JSON.stringify(freshUser));

              const newDecoded = decodeJwtPayload(refreshed.token);
              if (newDecoded?.exp) {
                scheduleTokenRefresh(newDecoded.exp * 1000 - Date.now());
              }
            } catch {
              await clearAllStored();
              api.setToken(null);
            }
          } else {
            await clearAllStored();
            api.setToken(null);
          }
        }
      }
    } catch (err) {
      console.error('Failed to load auth:', err);
      try { await clearAllStored(); } catch {}
      api.setToken(null);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  const scheduleTokenRefresh = useCallback((msUntilExpiry: number) => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    const refreshIn = Math.max(msUntilExpiry - 5 * 60 * 1000, 30000);
    refreshTimerRef.current = setTimeout(async () => {
      try {
        const storedRefresh = await getStoredItem(STORAGE_KEYS.refreshToken);
        if (storedRefresh) {
          const refreshed = await api.refreshToken(storedRefresh);
          setToken(refreshed.token);
          setRefreshToken(refreshed.refreshToken);
          api.setToken(refreshed.token);
          await setStoredItem(STORAGE_KEYS.token, refreshed.token);
          await setStoredItem(STORAGE_KEYS.refreshToken, refreshed.refreshToken);

          const newDecoded = decodeJwtPayload(refreshed.token);
          if (newDecoded?.exp) {
            scheduleTokenRefresh(newDecoded.exp * 1000 - Date.now());
          }
        }
      } catch {
        Alert.alert(
          'Session expirée',
          'Votre session a expiré. Veuillez vous reconnecter.',
          [{ text: 'OK', onPress: () => logoutRef.current() }]
        );
      }
    }, refreshIn);
  }, []);

  const isTokenExpired = useCallback((): boolean => {
    if (!token) return true;
    const decoded = decodeJwtPayload(token);
    if (!decoded?.exp) return true;
    return decoded.exp * 1000 < Date.now();
  }, [token]);

  const login = async (identifier: string, password: string, schoolCode?: string, directAuth?: AuthLoginData) => {
    setError(null);
    try {
      let data: AuthLoginData;

      if (directAuth) {
        data = directAuth;
      } else {
        data = await api.login(identifier, password, schoolCode) as AuthLoginData;
      }

      if (BLOCKED_ROLES.includes(data.user.role)) {
        if (data.user.role === 'ADMIN') {
          throw new Error('ADMIN_USE_WEB');
        }
        throw new Error('OWNER_BLOCKED');
      }

      const firstLogin = data.user.isFirstLogin === true ||
        data.user.is_first_login === true ||
        data.user.must_change_password === true;

      setToken(data.token);
      setUser(data.user);
      setRefreshToken(data.refreshToken);
      setIsFirstLogin(firstLogin);
      api.setToken(data.token);
      await setStoredItem(STORAGE_KEYS.token, data.token);
      await setStoredItem(STORAGE_KEYS.user, JSON.stringify(data.user));
      await setStoredItem(STORAGE_KEYS.refreshToken, data.refreshToken);

      const decoded = decodeJwtPayload(data.token);
      if (decoded?.exp) {
        scheduleTokenRefresh(decoded.exp * 1000 - Date.now());
      }
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Échec de connexion';
      setError(message);
      throw err;
    }
  };

  const loginWithQR = async (qrData: string) => {
    setError(null);
    try {
      const data = await api.loginWithQRCode(qrData);

      if (BLOCKED_ROLES.includes(data.user.role)) {
        if (data.user.role === 'ADMIN') {
          throw new Error('ADMIN_USE_WEB');
        }
        throw new Error('OWNER_BLOCKED');
      }

      setToken(data.token);
      setUser(data.user);
      setRefreshToken(data.refreshToken);
      // Check if this QR-login user needs first-login flow
      const qrFirstLogin = data.user.isFirstLogin === true ||
        data.user.is_first_login === true ||
        data.user.must_change_password === true;
      setIsFirstLogin(qrFirstLogin);
      api.setToken(data.token);
      await setStoredItem(STORAGE_KEYS.token, data.token);
      await setStoredItem(STORAGE_KEYS.user, JSON.stringify(data.user));
      await setStoredItem(STORAGE_KEYS.refreshToken, data.refreshToken);

      const decoded = decodeJwtPayload(data.token);
      if (decoded?.exp) {
        scheduleTokenRefresh(decoded.exp * 1000 - Date.now());
      }
    } catch (err: any) {
      const message = err?.message || 'Échec de connexion par QR Code';
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    // Dispose all realtime channels before clearing auth
    try { realtimeManager.removeAll(); } catch {}
    setToken(null);
    setUser(null);
    setRefreshToken(null);
    setError(null);
    setIsFirstLogin(false);
    api.setToken(null);
    await clearAllStored();
  };

  logoutRef.current = logout;

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ user, token, login, loginWithQR, logout, loading, error, clearError, isTokenExpired, isFirstLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
