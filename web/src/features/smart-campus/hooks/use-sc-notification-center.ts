'use client';
import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export const useScNotificationCenter = (schoolId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNotifications = useCallback(async (): Promise<Notification[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_notifications')
        .select('*')
        .eq('school_id', schoolId)
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;
      const items = (data ?? []) as Notification[];
      setNotifications(items);
      return items;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const markRead = useCallback(async (notificationId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from('sc_notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (updateError) throw updateError;
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUnread = useCallback(async (): Promise<Notification[]> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();
      const { data, error: queryError } = await supabase
        .from('sc_notifications')
        .select('*')
        .eq('school_id', schoolId)
        .eq('read', false)
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;
      return (data ?? []) as Notification[];
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  return { notifications, loading, error, getNotifications, markRead, getUnread };
};
