import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';
import { AppState, AppStateStatus } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

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

class RealtimeManager {
  private channels = new Map<string, ChannelEntry>();
  private client: SupabaseClient;
  private connectionState: ConnectionState = 'disconnected';
  private errorCount = 0;
  private lastReconnect: number | null = null;
  private networkOnline = true;
  private disposed = false;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private appStateSubscription: any = null;
  private netInfoSubscription: any = null;

  constructor(supabaseClient: SupabaseClient) {
    this.client = supabaseClient;
    this.connectionState = 'connected';
    this.setupLifecycleListeners();
    this.startHeartbeat();
  }

  private setupLifecycleListeners() {
    this.appStateSubscription = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'active') {
        if (!this.networkOnline) return;
        this.log('debug', 'App foregrounded, reconnecting');
        setTimeout(() => this.reconnectAll(), 500);
      }
    });

    try {
      this.netInfoSubscription = NetInfo.addEventListener((state) => {
        const online = state.isConnected ?? true;
        this.handleNetworkChange(online);
      });
    } catch {
      // NetInfo may not be available in all environments
    }
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
    let channel = this.client.channel(channelName);

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
      this.client.removeChannel(entry.channel);
    } catch {}
    this.channels.delete(channelName);
    this.log('debug', `Channel "${channelName}" removed`);
  }

  private scheduleReconnect(channelName: string) {
    const entry = this.channels.get(channelName);
    if (!entry || this.disposed) return;

    const delay = Math.min(1000 * Math.pow(2, Math.min(this.errorCount, 5)), 30000);

    const timer = setTimeout(() => {
      if (this.disposed) return;
      const current = this.channels.get(channelName);
      if (!current || current.subscribed) return;

      this.log('debug', `Reconnecting channel "${channelName}"`);
      this.connectionState = 'reconnecting';
      this.lastReconnect = Date.now();

      try {
        this.client.removeChannel(current.channel);
      } catch {}

      this.channels.delete(channelName);
      this.createChannel(channelName, current.listeners);
    }, delay);

    this.reconnectTimer = timer;
  }

  reconnectAll() {
    if (this.disposed) return;

    this.connectionState = 'reconnecting';
    this.lastReconnect = Date.now();
    this.log('debug', `Reconnecting all ${this.channels.size} channels`);

    const entries = Array.from(this.channels.entries());

    for (const [, entry] of entries) {
      try {
        this.client.removeChannel(entry.channel);
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
              this.connectionState = 'connected';
            }
          }
        });
        const newEntry = this.channels.get(name);
        if (newEntry) newEntry.refCount = entry.refCount;
      }
    }

    if (totalCount === 0) {
      this.connectionState = 'connected';
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
      this.connectionState = 'disconnected';
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
    if (this.appStateSubscription) {
      this.appStateSubscription.remove();
      this.appStateSubscription = null;
    }
    if (this.netInfoSubscription) {
      this.netInfoSubscription();
      this.netInfoSubscription = null;
    }
  }

  getActiveChannels(): string[] {
    return Array.from(this.channels.keys());
  }

  isSubscribed(channelName: string): boolean {
    return this.channels.get(channelName)?.subscribed ?? false;
  }

  getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  private log(level: 'debug' | 'error', message: string, extra?: any) {
    const prefix = '[RealtimeManager]';
    if (level === 'error') {
      console.error(prefix, message, extra || '');
    } else if (__DEV__) {
      console.log(prefix, message, extra || '');
    }
  }
}

export { RealtimeManager };
