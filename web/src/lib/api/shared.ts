import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';
import { mapKeysToCamel } from '@/lib/utils/mappers';

export type SupabaseClient = ReturnType<typeof createClient>;

export function getSupabase(): SupabaseClient {
  return createClient();
}

export function camel<T>(data: T): T {
  return mapKeysToCamel(data) as T;
}

export async function createUserWithoutSessionSwitch(supabase: any, email: string, password: string, metadata: Record<string, any>, role?: string, tableData?: Record<string, any>) {
  const response = await fetch('/api/admin/create-user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: metadata.name,
      email,
      password,
      role: role || metadata.role,
      phone: metadata.phone || null,
      classId: tableData?.classId || null,
      subjectId: tableData?.subjectId || null,
      matricule: tableData?.matricule || null,
      dateOfBirth: tableData?.dateOfBirth || null,
      gender: tableData?.gender || null,
      address: tableData?.address || null,
      position: metadata.position || tableData?.position || null,
      department: metadata.department || tableData?.department || null,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    return { authData: null, authError: new Error(result.error || result.message || 'Erreur création compte'), accessKit: null };
  }

  return {
    authData: { user: result.user },
    authError: null,
    accessKit: result.access_kit || null,
  };
}

export function generateSecurePassword(name: string): string {
  const base = crypto.randomUUID().slice(0, 8);
  const prefix = (name.split(' ')[0] || 'user').slice(0, 4).toLowerCase();
  const upper = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return `${prefix}_${upper}${base}!`;
}
