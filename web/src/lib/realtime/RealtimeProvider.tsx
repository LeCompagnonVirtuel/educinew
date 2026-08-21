'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSupabase } from '@/lib/api/shared';
import { realtimeManager, ConnectionState, RealtimeStats } from './RealtimeManager';
import { useAuth } from '@/hooks/useAuth';

interface RealtimeContextValue {
  connectionState: ConnectionState;
  stats: RealtimeStats;
  reconnect: () => void;
}

const RealtimeContext = createContext<RealtimeContextValue>({
  connectionState: 'disconnected',
  stats: { activeChannels: 0, totalSubscriptions: 0, connectionState: 'disconnected', lastReconnect: null, errors: 0 },
  reconnect: () => {},
});

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [stats, setStats] = useState<RealtimeStats>(realtimeManager.getStats());

  useEffect(() => {
    const supabase = getSupabase();
    realtimeManager.setClient(supabase);

    const unsubState = realtimeManager.onConnectionStateChange((state) => {
      setConnectionState(state);
      setStats(realtimeManager.getStats());
    });

    setConnectionState('connected');

    const statsInterval = setInterval(() => {
      setStats(realtimeManager.getStats());
    }, 10000);

    return () => {
      unsubState();
      clearInterval(statsInterval);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      realtimeManager.removeAll();
    }
  }, [user?.id]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => realtimeManager.handleNetworkChange(true);
    const handleOffline = () => realtimeManager.handleNetworkChange(false);
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        realtimeManager.handleNetworkChange(navigator.onLine);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const reconnect = () => {
    realtimeManager.reconnectAll();
  };

  return (
    <RealtimeContext.Provider value={{ connectionState, stats, reconnect }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtimeContext() {
  return useContext(RealtimeContext);
}
