'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getSupabase } from '@/lib/api/shared';
import { realtimeManager } from '@/lib/realtime/RealtimeManager';

interface SchoolData {
  id: string;
  code: string;
  name: string;
  sigle: string | null;
  slogan: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  logo: string | null;
  favicon_url: string | null;
  primary_color: string | null;
  secondary_color: string | null;
  accent_color: string | null;
  academic_year: string | null;
  grading_system: string | null;
  passing_grade: number | null;
  timezone: string | null;
  language: string | null;
  currency: string | null;
  academic_settings: Record<string, any> | null;
  notifications: Record<string, any> | null;
  integrations: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  _count?: {
    students: number;
    teachers: number;
    classes: number;
    parents: number;
  };
}

interface SchoolContextType {
  school: SchoolData | null;
  loading: boolean;
  refreshSchool: () => Promise<void>;
  updateSchool: (data: Partial<SchoolData>) => Promise<void>;
}

const SchoolContext = createContext<SchoolContextType>({
  school: null,
  loading: true,
  refreshSchool: async () => {},
  updateSchool: async () => {},
});

export function useSchool() {
  return useContext(SchoolContext);
}

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [school, setSchool] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSchool = useCallback(async () => {
    if (!user?.schoolId) {
      setLoading(false);
      return;
    }
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .eq('id', user.schoolId)
        .single();
      if (error) throw error;
      setSchool(data);
    } catch (err) {
      console.error('[useSchool]', err);
    } finally {
      setLoading(false);
    }
  }, [user?.schoolId]);

  useEffect(() => {
    loadSchool();
  }, [loadSchool]);

  useEffect(() => {
    if (!user?.schoolId) return;

    const channelName = `school-settings-${user.schoolId}`;
    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: '*',
          schema: 'public',
          table: 'schools',
          filter: `id=eq.${user.schoolId}`,
        },
        callback: (payload: any) => {
          if (payload.eventType === 'UPDATE' && payload.new) {
            setSchool((prev) => prev ? { ...prev, ...payload.new } as SchoolData : prev);
          }
        },
      },
    ]);

    return unsubscribe;
  }, [user?.schoolId]);

  const updateSchool = async (data: Partial<SchoolData>) => {
    if (!user?.schoolId) return;
    const supabase = getSupabase();
    const { error } = await supabase
      .from('schools')
      .update(data)
      .eq('id', user.schoolId);
    if (error) throw error;
    setSchool((prev) => prev ? { ...prev, ...data } as SchoolData : prev);
  };

  return (
    <SchoolContext.Provider value={{ school, loading, refreshSchool: loadSchool, updateSchool }}>
      {children}
    </SchoolContext.Provider>
  );
}
