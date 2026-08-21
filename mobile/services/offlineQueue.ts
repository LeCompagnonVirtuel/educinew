import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';
import { supabase } from './supabase';

interface QueuedAction {
  id: string;
  type: 'attendance' | 'grade' | 'checkin' | 'message';
  endpoint: string;
  method: 'POST' | 'PATCH' | 'PUT';
  body: any;
  createdAt: string;
  retries: number;
}

const QUEUE_KEY = 'educi_offline_queue';

export class OfflineQueue {
  private static queue: QueuedAction[] = [];
  private static syncing = false;

  static async init() {
    try {
      const stored = await AsyncStorage.getItem(QUEUE_KEY);
      if (stored) this.queue = JSON.parse(stored);
    } catch (err) {
      console.warn('[OfflineQueue] Failed to load queue:', err);
    }
  }

  static async add(action: Omit<QueuedAction, 'id' | 'createdAt' | 'retries'>) {
    const item: QueuedAction = {
      ...action,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      retries: 0,
    };
    this.queue.push(item);
    await this.persist();
    return item;
  }

  static async sync(): Promise<{ synced: number; failed: number; remaining: number }> {
    if (this.syncing || this.queue.length === 0) return { synced: 0, failed: 0, remaining: this.queue.length };

    // Check connectivity before syncing
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
      await fetch(`${supabaseUrl}/rest/v1/`, { method: 'HEAD', signal: controller.signal });
      clearTimeout(timeout);
    } catch {
      return { synced: 0, failed: 0, remaining: this.queue.length };
    }

    this.syncing = true;

    let synced = 0;
    let failed = 0;
    const remaining: QueuedAction[] = [];

    for (const action of this.queue) {
      try {
        await api.executeRequest(action.endpoint, {
          method: action.method,
          body: JSON.stringify(action.body),
        });
        synced++;
      } catch (err) {
        console.warn('[OfflineQueue] Sync failed for action:', action.id, err);
        action.retries++;
        if (action.retries < 5) {
          remaining.push(action);
        } else {
          failed++;
        }
      }
    }

    this.queue = remaining;
    await this.persist();
    this.syncing = false;

    return { synced, failed, remaining: remaining.length };
  }

  static getPendingCount(): number {
    return this.queue.length;
  }

  static async clear() {
    this.queue = [];
    await AsyncStorage.removeItem(QUEUE_KEY);
  }

  private static async persist() {
    try {
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(this.queue));
    } catch (err) {
      console.warn('[OfflineQueue] Failed to persist queue:', err);
    }
  }
}
