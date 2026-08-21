'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface PushSubscription {
  id: string;
  endpoint: string;
  keys: Record<string, string>;
  createdAt: string;
}

interface PushNotification {
  id: string;
  title: string;
  body: string;
  data: Record<string, unknown>;
  sentAt: string;
}

export const useScPushNotifications = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = useCallback(async (subscription: PushSubscription): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from('sc_push_subscriptions')
        .insert({ ...subscription, school_id: schoolId });

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const send = useCallback(async (notification: Omit<PushNotification, 'id' | 'sentAt'>): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { error: insertError } = await supabase
        .from('sc_push_notifications')
        .insert({ ...notification, school_id: schoolId });

      if (insertError) throw insertError;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const getHistory = useCallback(async (): Promise<PushNotification[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_push_notifications')
        .select('*')
        .eq('school_id', schoolId)
        .order('sent_at', { ascending: false });

      if (queryError) throw queryError;
      return (data ?? []) as PushNotification[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { loading, error, subscribe, send, getHistory };
};
