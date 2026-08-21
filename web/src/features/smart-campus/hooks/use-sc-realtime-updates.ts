'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

interface RealtimeEvent {
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: Record<string, unknown>;
  old: Record<string, unknown>;
  table: string;
}

export const useScRealtimeUpdates = (schoolId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updates, setUpdates] = useState<RealtimeEvent[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);

  const subscribe = useCallback(async (table: string, callback?: (event: RealtimeEvent) => void): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();

      const channel = supabase
        .channel(`sc_${table}_${schoolId}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table, filter: `school_id=eq.${schoolId}` },
          (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => {
            const event: RealtimeEvent = {
              eventType: payload.eventType,
              new: (payload.new ?? {}) as Record<string, unknown>,
              old: (payload.old ?? {}) as Record<string, unknown>,
              table,
            };
            setUpdates((prev) => [event, ...prev].slice(0, 100));
            callback?.(event);
          }
        )
        .subscribe();

      channelRef.current = channel;
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  const unsubscribe = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      if (channelRef.current) {
        const supabase = createClient();
        await supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const getUpdates = useCallback((): RealtimeEvent[] => {
    return updates;
  }, [updates]);

  useEffect(() => {
    return () => {
      if (channelRef.current) {
        createClient().removeChannel(channelRef.current);
      }
    };
  }, []);

  return { loading, error, updates, subscribe, unsubscribe, getUpdates };
};
