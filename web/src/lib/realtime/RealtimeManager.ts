import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

type PostgresChangesEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*';

export interface PostgresChangesConfig {
  event: PostgresChangesEvent;
  schema: string;
  table: string;
  filter?: string;
}

export type ChannelCallback = (payload: any) => void;

export interface PendingListener {
  config: PostgresChangesConfig;
  callback: ChannelCallback;
}

interface ChannelEntry {
  channel: RealtimeChannel;
  listeners: PendingListener[];
  refCount: number;
  subscribed: boolean;
  subscribing: boolean;
  createdAt: number;
}

export type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'reconnecting';

export interface RealtimeStats {
  activeChannels: number;
  totalSubscriptions: number;
  connectionState: ConnectionState;
  lastReconnect: number | null;
  errors: number;
}

type StatusListener = (state: ConnectionState) => void;

class RealtimeManager {
  private channels = new Map<string, ChannelEntry>();
  private supabase: SupabaseClient | null = null;
  private connectionState: ConnectionState = 'disconnected';
  private statusListeners = new Set<StatusListener>();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private errorCount = 0;
  private lastReconnect: number | null = null;
  private networkOnline = true;
  private disposed = false;

  setClient(client: SupabaseClient) {
    if (this.supabase === client) return;
    this.supabase = client;
    this.setConnectionState('connected');
    this.startHeartbeat();
  }

  private getClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('[RealtimeManager] Supabase client not set. Call setClient() first.');
    }
    return this.supabase;
  }

  subscribe(
    channelName: string,
    listeners: PendingListener[],
    onStatus?: (status: string, err?: Error) => void
  ): () => void {
    if (this.disposed) return () => {};

    const existing = this.channels.get(channelName);

    if (existing) {
      if (existing.subscribed || existing.subscribing) {
        this.log('debug', `Channel "${channelName}" already active, refCount++ (${existing.refCount + 1})`);
      }
      existing.refCount++;
      return this.createUnsubscribe(channelName);
    }

    this.createChannel(channelName, listeners, onStatus);
    return this.createUnsubscribe(channelName);
  }

  private createChannel(
    channelName: string,
    listeners: PendingListener[],
    onStatus?: (status: string, err?: Error) => void
  ) {
    const supabase = this.getClient();

    let channel = supabase.channel(channelName);

    for (const { config, callback } of listeners) {
      channel = channel.on('postgres_changes' as any, config, callback);
    }

    const entry: ChannelEntry = {
      channel,
      listeners,
      refCount: 1,
      subscribed: false,
      subscribing: true,
      createdAt: Date.now(),
    };

    this.channels.set(channelName, entry);

    channel.subscribe((status: string, err?: Error) => {
      const current = this.channels.get(channelName);
      if (!current) return;

      if (status === 'SUBSCRIBED') {
        current.subscribed = true;
        current.subscribing = false;
        this.log('debug', `Channel "${channelName}" subscribed`);
      }

      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
        current.subscribing = false;
        this.errorCount++;
        this.log('error', `Channel "${channelName}" error: ${status}`, err);
        this.scheduleReconnect(channelName);
      }

      if (status === 'CLOSED') {
        current.subscribed = false;
        current.subscribing = false;
      }

      onStatus?.(status, err);
    });
  }

  private createUnsubscribe(channelName: string): () => void {
    return () => {
      const entry = this.channels.get(channelName);
      if (!entry) return;

      entry.refCount--;
      if (entry.refCount <= 0) {
        this.removeChannel(channelName);
      }
    };
  }

  private removeChannel(channelName: string) {
    const entry = this.channels.get(channelName);
    if (!entry) return;

    try {
      const supabase = this.getClient();
      supabase.removeChannel(entry.channel);
    } catch {
      // Client may be unavailable during teardown
    }
    this.channels.delete(channelName);
    this.log('debug', `Channel "${channelName}" removed`);
  }

  private scheduleReconnect(channelName: string) {
    const entry = this.channels.get(channelName);
    if (!entry || this.disposed) return;

    const delay = Math.min(1000 * Math.pow(2, Math.min(this.errorCount, 5)), 30000);

    // Store the timer handle so dispose() can clear it
    const timer = setTimeout(() => {
      if (this.disposed) return;
      const current = this.channels.get(channelName);
      if (!current || current.subscribed) return;

      this.log('debug', `Reconnecting channel "${channelName}"`);
      this.setConnectionState('reconnecting');
      this.lastReconnect = Date.now();

      try {
        const supabase = this.getClient();
        supabase.removeChannel(current.channel);
      } catch {}

      this.channels.delete(channelName);
      this.createChannel(channelName, current.listeners);
    }, delay);

    this.reconnectTimer = timer;
  }

  reconnectAll() {
    if (this.disposed) return;

    this.setConnectionState('reconnecting');
    this.lastReconnect = Date.now();
    this.log('debug', `Reconnecting all ${this.channels.size} channels`);

    const entries = Array.from(this.channels.entries());

    for (const [, entry] of entries) {
      try {
        const supabase = this.getClient();
        supabase.removeChannel(entry.channel);
      } catch {}
    }

    this.channels.clear();

    let subscribedCount = 0;
    const totalCount = entries.filter(([, entry]) => entry.refCount > 0).length;

    for (const [name, entry] of entries) {
      if (entry.refCount > 0) {
        this.createChannel(name, entry.listeners, (status) => {
          if (status === 'SUBSCRIBED') {
            subscribedCount++;
            if (subscribedCount >= totalCount) {
              this.setConnectionState('connected');
            }
          }
        });
        const newEntry = this.channels.get(name);
        if (newEntry) newEntry.refCount = entry.refCount;
      }
    }

    // If no channels to reconnect, set connected immediately
    if (totalCount === 0) {
      this.setConnectionState('connected');
    }
  }

  handleNetworkChange(online: boolean) {
    const wasOffline = !this.networkOnline;
    this.networkOnline = online;

    if (online && wasOffline) {
      this.log('debug', 'Network restored, reconnecting all channels');
      this.errorCount = 0;
      setTimeout(() => this.reconnectAll(), 1000);
    }

    if (!online) {
      this.setConnectionState('disconnected');
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatTimer = setInterval(() => {
      for (const [name, entry] of this.channels) {
        if (!entry.subscribed && !entry.subscribing && entry.refCount > 0) {
          const age = Date.now() - entry.createdAt;
          if (age > 30000) {
            this.log('debug', `Heartbeat: channel "${name}" stale, reconnecting`);
            this.scheduleReconnect(name);
          }
        }
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  removeAll() {
    if (!this.supabase) return;
    for (const [name] of this.channels) {
      this.removeChannel(name);
    }
    this.channels.clear();
  }

  dispose() {
    this.disposed = true;
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.removeAll();
    this.statusListeners.clear();
  }

  onConnectionStateChange(listener: StatusListener): () => void {
    this.statusListeners.add(listener);
    return () => { this.statusListeners.delete(listener); };
  }

  private setConnectionState(state: ConnectionState) {
    if (this.connectionState === state) return;
    this.connectionState = state;
    for (const listener of this.statusListeners) {
      try { listener(state); } catch {}
    }
  }

  getStats(): RealtimeStats {
    return {
      activeChannels: this.channels.size,
      totalSubscriptions: Array.from(this.channels.values()).reduce((sum, e) => sum + e.refCount, 0),
      connectionState: this.connectionState,
      lastReconnect: this.lastReconnect,
      errors: this.errorCount,
    };
  }

  getActiveChannels(): string[] {
    return Array.from(this.channels.keys());
  }

  isSubscribed(channelName: string): boolean {
    return this.channels.get(channelName)?.subscribed ?? false;
  }

  private log(level: 'debug' | 'error', message: string, extra?: any) {
    if (typeof window === 'undefined') return;
    const prefix = '[RealtimeManager]';
    if (level === 'error') {
      console.error(prefix, message, extra || '');
    } else if (process.env.NODE_ENV !== 'production') {
      console.log(prefix, message, extra || '');
    }
  }
}

export const realtimeManager = new RealtimeManager();
