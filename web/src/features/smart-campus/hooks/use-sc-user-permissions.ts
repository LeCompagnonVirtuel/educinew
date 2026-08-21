'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface UserRole {
  id: string;
  role: string;
  permissions: string[];
}

interface AccessCheck {
  allowed: boolean;
  resource: string;
  action: string;
}

export const useScUserPermissions = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async (resource: string, action: string): Promise<AccessCheck> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { allowed: false, resource, action };

      const { data, error: queryError } = await supabase
        .from('sc_user_permissions')
        .select('permissions')
        .eq('school_id', schoolId)
        .eq('user_id', user.id)
        .single();

      if (queryError) throw queryError;
      const permissions = (data as { permissions: string[] }).permissions ?? [];
      return { allowed: permissions.includes(`${resource}:${action}`), resource, action };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return { allowed: false, resource, action };
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getRole = useCallback(async (userId: string): Promise<UserRole | null> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_user_permissions')
        .select('*')
        .eq('school_id', schoolId)
        .eq('user_id', userId)
        .single();

      if (queryError) throw queryError;
      return data as UserRole;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getAccess = useCallback(async (): Promise<string[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error: queryError } = await supabase
        .from('sc_user_permissions')
        .select('permissions')
        .eq('school_id', schoolId)
        .eq('user_id', user.id)
        .single();

      if (queryError) throw queryError;
      return (data as { permissions: string[] }).permissions ?? [];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, check, getRole, getAccess };
};
