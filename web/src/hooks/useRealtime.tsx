'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useAuth } from './useAuth';
import { realtimeManager } from '@/lib/realtime/RealtimeManager';
import { getSupabase } from '@/lib/api/shared';

type EventType = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

interface RealtimeSubscription {
  table: string;
  event?: EventType;
  filter?: string;
  onData: (payload: any) => void;
}

export function useRealtimeSubscription(subscriptions: RealtimeSubscription[]) {
  const { user } = useAuth();
  const subsRef = useRef(subscriptions);
  subsRef.current = subscriptions;

  const subscriptionsKey = JSON.stringify(
    subscriptions.map(s => ({ table: s.table, event: s.event, filter: s.filter }))
  );

  useEffect(() => {
    if (!user?.schoolId || subscriptions.length === 0) return;

    const channelName = `school-${user.schoolId}-${subscriptions.map(s => s.table).join('-')}`;

    const listeners = subsRef.current.map((sub) => ({
      config: {
        event: sub.event || ('*' as const),
        schema: 'public',
        table: sub.table,
        filter: sub.filter || `school_id=eq.${user.schoolId}`,
      },
      callback: sub.onData,
    }));

    const unsubscribe = realtimeManager.subscribe(channelName, listeners);

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.schoolId, subscriptionsKey]);
}

export function useRealtimeNotifications(onNewNotification?: (n: any) => void) {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const callbackRef = useRef(onNewNotification);
  callbackRef.current = onNewNotification;

  useEffect(() => {
    if (!user?.id) return;

    const supabase = getSupabase();

    supabase
      .from('notifications')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false)
      .then(({ count }: { count: number | null }) => setUnreadCount(count || 0));

    const channelName = `notifications-${user.id}`;

    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: 'INSERT' as const,
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        callback: (payload: any) => {
          setUnreadCount((c) => c + 1);
          callbackRef.current?.(payload.new);
        },
      },
      {
        config: {
          event: 'UPDATE' as const,
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        callback: (payload: any) => {
          if (payload.new?.is_read && !payload.old?.is_read) {
            setUnreadCount((c) => Math.max(0, c - 1));
          }
        },
      },
      {
        config: {
          event: 'DELETE' as const,
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        callback: (payload: any) => {
          // If a deleted notification was unread, decrement the count
          if (payload.old && !payload.old.is_read) {
            setUnreadCount((c) => Math.max(0, c - 1));
          }
        },
      },
    ]);

    return unsubscribe;
  }, [user?.id]);

  const markAllRead = useCallback(async () => {
    if (!user?.id) return;
    const supabase = getSupabase();
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);
    setUnreadCount(0);
  }, [user?.id]);

  return { unreadCount, markAllRead };
}

export function useRealtimeTransport(busId: string | null | undefined, onUpdate?: (data: any) => void) {
  const { user } = useAuth();
  const callbackRef = useRef(onUpdate);
  callbackRef.current = onUpdate;

  useEffect(() => {
    if (!busId || !user?.schoolId) return;

    const channelName = `transport-${busId}`;

    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: 'INSERT' as const,
          schema: 'public',
          table: 'bus_tracking',
          filter: `bus_id=eq.${busId}`,
        },
        callback: (payload: any) => {
          callbackRef.current?.({ type: 'gps', data: payload.new });
        },
      },
      {
        config: {
          event: '*' as const,
          schema: 'public',
          table: 'trips',
          filter: `bus_id=eq.${busId}`,
        },
        callback: (payload: any) => {
          callbackRef.current?.({ type: 'trip', data: payload.new });
        },
      },
      {
        config: {
          event: 'INSERT' as const,
          schema: 'public',
          table: 'trip_events',
          filter: `bus_id=eq.${busId}`,
        },
        callback: (payload: any) => {
          callbackRef.current?.({ type: 'event', data: payload.new });
        },
      },
    ]);

    return unsubscribe;
  }, [busId, user?.schoolId]);
}

export function useRealtimePayments(onPayment?: (payment: any) => void) {
  const { user } = useAuth();
  const callbackRef = useRef(onPayment);
  callbackRef.current = onPayment;

  useEffect(() => {
    if (!user?.schoolId) return;

    const channelName = `payments-${user.schoolId}`;

    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: 'INSERT' as const,
          schema: 'public',
          table: 'payments',
          filter: `school_id=eq.${user.schoolId}`,
        },
        callback: (payload: any) => {
          callbackRef.current?.(payload.new);
        },
      },
    ]);

    return unsubscribe;
  }, [user?.schoolId]);
}

export function useRealtimeAnnouncements(onAnnouncement?: (ann: any) => void) {
  const { user } = useAuth();
  const callbackRef = useRef(onAnnouncement);
  callbackRef.current = onAnnouncement;

  useEffect(() => {
    if (!user?.schoolId) return;

    const channelName = `announcements-${user.schoolId}`;

    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: 'INSERT' as const,
          schema: 'public',
          table: 'announcements',
          filter: `school_id=eq.${user.schoolId}`,
        },
        callback: (payload: any) => {
          callbackRef.current?.(payload.new);
        },
      },
    ]);

    return unsubscribe;
  }, [user?.schoolId]);
}

export function useRealtimeAttendance(onEvent?: (event: any) => void) {
  const { user } = useAuth();
  const callbackRef = useRef(onEvent);
  callbackRef.current = onEvent;

  useEffect(() => {
    if (!user?.schoolId) return;

    const channelName = `attendance-${user.schoolId}`;

    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: 'INSERT' as const,
          schema: 'public',
          table: 'attendance_events',
          filter: `school_id=eq.${user.schoolId}`,
        },
        callback: (payload: any) => {
          callbackRef.current?.(payload.new);
        },
      },
    ]);

    return unsubscribe;
  }, [user?.schoolId]);
}

export function useRealtimeDocuments(onNewDoc?: (doc: any) => void) {
  const { user } = useAuth();
  const callbackRef = useRef(onNewDoc);
  callbackRef.current = onNewDoc;

  useEffect(() => {
    if (!user?.schoolId) return;

    const channelName = `documents-${user.schoolId}`;

    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: '*' as const,
          schema: 'public',
          table: 'documents',
          filter: `school_id=eq.${user.schoolId}`,
        },
        callback: (payload: any) => {
          // Pass new for INSERT/UPDATE, old for DELETE, both for UPDATE
          callbackRef.current?.(payload.new || payload.old);
        },
      },
    ]);

    return unsubscribe;
  }, [user?.schoolId]);
}

export function useRealtimeMessages(onNewMessage?: (msg: any) => void) {
  const { user } = useAuth();
  const callbackRef = useRef(onNewMessage);
  callbackRef.current = onNewMessage;

  useEffect(() => {
    if (!user?.id || !user?.schoolId) return;

    // Subscribe to two channels: messages sent TO this user, and messages sent BY this user
    // This avoids delivering all school messages to every user
    const channelName = `messages-${user.schoolId}-${user.id}`;

    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: 'INSERT' as const,
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`,
        },
        callback: (payload: any) => {
          callbackRef.current?.(payload.new);
        },
      },
    ]);

    return unsubscribe;
  }, [user?.id, user?.schoolId]);
}

export function useRealtimeGrades(
  entityId: string | null | undefined,
  filterField: 'student_id' | 'school_id',
  onNewGrade?: (grade: any) => void
) {
  const { user } = useAuth();
  const callbackRef = useRef(onNewGrade);
  callbackRef.current = onNewGrade;

  useEffect(() => {
    if (!entityId) return;

    const channelName = `grades-${filterField}-${entityId}`;

    const unsubscribe = realtimeManager.subscribe(channelName, [
      {
        config: {
          event: 'INSERT' as const,
          schema: 'public',
          table: 'grades',
          filter: filterField === 'school_id'
            ? `school_id=eq.${entityId}`
            : `student_id=eq.${entityId}`,
        },
        callback: (payload: any) => {
          if (filterField === 'student_id' && user?.schoolId) {
            if (payload.new?.school_id !== user.schoolId) return;
          }
          callbackRef.current?.(payload.new);
        },
      },
    ]);

    return unsubscribe;
  }, [entityId, filterField, user?.schoolId]);
}
