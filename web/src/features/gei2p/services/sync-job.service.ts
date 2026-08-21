import { SupabaseClient } from '@supabase/supabase-js';
import { SynchronizationService } from './gei2p-sync-synchronization.service';

export interface SyncJob {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilitySyncJobService {
  private readonly syncService: SynchronizationService;

  constructor(supabase: SupabaseClient) {
    this.syncService = new SynchronizationService(supabase);
  }

  async listSyncJobs(schoolId: string, filters?: Record<string, unknown>): Promise<SyncJob[]> {
    return this.syncService.listEntities(schoolId, filters) as Promise<SyncJob[]>;
  }

  async getSyncJob(schoolId: string, id: string): Promise<SyncJob | null> {
    const entity = await this.syncService.getEntity(id);
    if (entity && (entity as SyncJob).school_id === schoolId) return entity as SyncJob;
    return null;
  }

  async createSyncJob(schoolId: string, userId: string, data: Record<string, unknown>): Promise<SyncJob | null> {
    return this.syncService.createEntity({ ...data, school_id: schoolId } as Parameters<SynchronizationService['createEntity']>[0]) as Promise<SyncJob | null>;
  }

  async updateSyncJob(schoolId: string, id: string, data: Record<string, unknown>): Promise<SyncJob | null> {
    const entity = await this.syncService.getEntity(id);
    if (!entity || (entity as SyncJob).school_id !== schoolId) return null;
    return this.syncService.updateEntity(id, data as Parameters<SynchronizationService['updateEntity']>[1]) as Promise<SyncJob | null>;
  }

  async deleteSyncJob(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.syncService.getEntity(id);
    if (!entity || (entity as SyncJob).school_id !== schoolId) return false;
    return this.syncService.deleteEntity(id);
  }
}
