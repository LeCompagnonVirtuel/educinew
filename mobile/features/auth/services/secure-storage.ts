import { Platform } from 'react-native';
import type { AuthUser, AuthSession } from '@educi/types';
import { logger } from '@educi/logger';

let SecureStore: typeof import('expo-secure-store') | null = null;
if (Platform.OS !== 'web') {
  SecureStore = require('expo-secure-store');
}

const STORAGE_KEYS = {
  TOKEN: 'educi_token',
  USER: 'educi_user',
  REFRESH_TOKEN: 'educi_refresh_token',
} as const;

export interface SecureTokenStorage {
  getToken(): Promise<string | null>;
  setToken(token: string): Promise<void>;
  removeToken(): Promise<void>;
  getRefreshToken(): Promise<string | null>;
  setRefreshToken(token: string): Promise<void>;
  removeRefreshToken(): Promise<void>;
  getUser(): Promise<AuthUser | null>;
  setUser(user: AuthUser): Promise<void>;
  removeUser(): Promise<void>;
  clearAll(): Promise<void>;
}

function getStorage() {
  if (Platform.OS === 'web') {
    return {
      async getItem(key: string): Promise<string | null> {
        try { return localStorage.getItem(key); } catch { return null; }
      },
      async setItem(key: string, value: string): Promise<void> {
        try { localStorage.setItem(key, value); } catch {}
      },
      async removeItem(key: string): Promise<void> {
        try { localStorage.removeItem(key); } catch {}
      },
    };
  }
  return SecureStore;
}

export function createSecureTokenStorage(): SecureTokenStorage {
  const storage = getStorage();

  return {
    async getToken() {
      try {
        return await storage.getItem(STORAGE_KEYS.TOKEN);
      } catch {
        return null;
      }
    },

    async setToken(token: string) {
      try {
        await storage.setItem(STORAGE_KEYS.TOKEN, token);
      } catch (error) {
        logger.error('Failed to store token', { error: String(error) }, 'mobile-auth');
      }
    },

    async removeToken() {
      try {
        await storage.removeItem(STORAGE_KEYS.TOKEN);
      } catch {}
    },

    async getRefreshToken() {
      try {
        return await storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      } catch {
        return null;
      }
    },

    async setRefreshToken(token: string) {
      try {
        await storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
      } catch (error) {
        logger.error('Failed to store refresh token', { error: String(error) }, 'mobile-auth');
      }
    },

    async removeRefreshToken() {
      try {
        await storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      } catch {}
    },

    async getUser() {
      try {
        const raw = await storage.getItem(STORAGE_KEYS.USER);
        if (!raw) return null;
        return JSON.parse(raw) as AuthUser;
      } catch {
        return null;
      }
    },

    async setUser(user: AuthUser) {
      try {
        await storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } catch (error) {
        logger.error('Failed to store user', { error: String(error) }, 'mobile-auth');
      }
    },

    async removeUser() {
      try {
        await storage.removeItem(STORAGE_KEYS.USER);
      } catch {}
    },

    async clearAll() {
      await Promise.all([
        this.removeToken(),
        this.removeRefreshToken(),
        this.removeUser(),
      ]);
    },
  };
}
