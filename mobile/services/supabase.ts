import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY environment variables');
}

const storage = Platform.OS === 'web'
  ? {
      getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
      setItem: (key: string, value: string) => { localStorage.setItem(key, value); return Promise.resolve(); },
      removeItem: (key: string) => { localStorage.removeItem(key); return Promise.resolve(); },
    }
  : {
      getItem: async (key: string) => {
        try { return await SecureStore.getItemAsync(key); } catch { return null; }
      },
      setItem: async (key: string, value: string) => {
        try { await SecureStore.setItemAsync(key, value); } catch {}
      },
      removeItem: async (key: string) => {
        try { await SecureStore.deleteItemAsync(key); } catch {}
      },
    };

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    storage,
  },
});

function camel(data: any): any {
  if (Array.isArray(data)) return data.map(camel);
  if (data && typeof data === 'object' && !(data instanceof Date)) {
    return Object.fromEntries(
      Object.entries(data).map(([k, v]) => [
        k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
        camel(v),
      ])
    );
  }
  return data;
}

async function getUserSchoolId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('users').select('school_id').eq('id', user.id).single();
  return profile?.school_id || user?.user_metadata?.school_id || null;
}

async function getUserProfile(): Promise<{ role: string; school_id: string } | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase.from('users').select('role, school_id').eq('id', user.id).single();
  return profile || null;
}

function getSupabaseRef(): string {
  const url = SUPABASE_URL || '';
  const match = url.match(/\/\/([^.]+)\./);
  return match ? match[1] : 'wztpkrftyocxnbhzgizc';
}

async function getAuthCookies(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Non authentifié');
  const ref = getSupabaseRef();
  const sessionPayload = JSON.stringify({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    expires_in: session.expires_in,
    token_type: session.token_type,
    user: session.user,
  });
  const encoded = btoa(sessionPayload);
  const chunkSize = 3500;
  const chunks = [];
  for (let i = 0; i < encoded.length; i += chunkSize) {
    chunks.push(encoded.slice(i, i + chunkSize));
  }
  return chunks.map((chunk, i) => `sb-${ref}-auth-token.${i}=${chunk}`).join('; ');
}

export { camel, getUserSchoolId, getUserProfile, getAuthCookies };
