import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface OfflineQueueItem {
  id: string;
  table: string;
  operation: 'insert' | 'update' | 'delete';
  data: Record<string, unknown>;
  timestamp: string;
}

export class ScOfflineSyncService {
  private repo: SmartCampusRepositoryEnterprise;
  private queue: OfflineQueueItem[] = [];

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  addToQueue(table: string, operation: 'insert' | 'update' | 'delete', data: Record<string, unknown>): void {
    this.queue.push({
      id: crypto.randomUUID(),
      table,
      operation,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  getQueue(): OfflineQueueItem[] {
    return [...this.queue];
  }

  clearQueue(): void {
    this.queue = [];
  }

  async processQueue(schoolId: string): Promise<{ processed: number; failed: number }> {
    let processed = 0;
    let failed = 0;
    const items = [...this.queue];
    this.queue = [];

    for (const item of items) {
      try {
        switch (item.operation) {
          case 'insert':
            await this.supabase.from(item.table).insert(item.data);
            break;
          case 'update':
            await this.supabase.from(item.table).update(item.data).eq('id', item.data.id);
            break;
          case 'delete':
            await this.supabase.from(item.table).delete().eq('id', item.data.id);
            break;
        }
        processed++;
      } catch {
        failed++;
        this.queue.push(item);
      }
    }

    return { processed, failed };
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  removeById(id: string): void {
    this.queue = this.queue.filter(item => item.id !== id);
  }

  getPendingByTable(table: string): OfflineQueueItem[] {
    return this.queue.filter(item => item.table === table);
  }
}
