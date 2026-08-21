import { SupabaseClient } from '@supabase/supabase-js';
import { ConflictResolutionService } from './gei2p-sync-conflict-resolution.service';

export interface SyncConflict {
  id: string;
  school_id: string;
  [key: string]: unknown;
}

export class InteroperabilitySyncConflictService {
  private readonly conflictService: ConflictResolutionService;

  constructor(supabase: SupabaseClient) {
    this.conflictService = new ConflictResolutionService(supabase);
  }

  async listSyncConflicts(schoolId: string, filters?: Record<string, unknown>): Promise<SyncConflict[]> {
    return this.conflictService.listEntities(schoolId, filters) as Promise<SyncConflict[]>;
  }

  async getSyncConflict(schoolId: string, id: string): Promise<SyncConflict | null> {
    const entity = await this.conflictService.getEntity(id);
    if (entity && (entity as SyncConflict).school_id === schoolId) return entity as SyncConflict;
    return null;
  }

  async createSyncConflict(schoolId: string, userId: string, data: Record<string, unknown>): Promise<SyncConflict | null> {
    return this.conflictService.createEntity({ ...data, school_id: schoolId } as Parameters<ConflictResolutionService['createEntity']>[0]) as Promise<SyncConflict | null>;
  }

  async updateSyncConflict(schoolId: string, id: string, data: Record<string, unknown>): Promise<SyncConflict | null> {
    const entity = await this.conflictService.getEntity(id);
    if (!entity || (entity as SyncConflict).school_id !== schoolId) return null;
    return this.conflictService.updateEntity(id, data as Parameters<ConflictResolutionService['updateEntity']>[1]) as Promise<SyncConflict | null>;
  }

  async deleteSyncConflict(schoolId: string, id: string): Promise<boolean> {
    const entity = await this.conflictService.getEntity(id);
    if (!entity || (entity as SyncConflict).school_id !== schoolId) return false;
    return this.conflictService.deleteEntity(id);
  }
}
