import type { SupabaseClient } from '@supabase/supabase-js';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

interface BulkOperation<T> {
  type: 'create' | 'update' | 'delete';
  data: T;
  id?: string;
}

interface BulkResult {
  succeeded: number;
  failed: number;
  errors: string[];
}

export class ScBulkService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async bulkCreateBuses(schoolId: string, items: Record<string, unknown>[]): Promise<BulkResult> {
    let succeeded = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const item of items) {
      try {
        await this.repo.createBus(schoolId, item);
        succeeded++;
      } catch (e) {
        failed++;
        errors.push(e instanceof Error ? e.message : 'Unknown error');
      }
    }

    return { succeeded, failed, errors };
  }

  async bulkUpdateBuses(schoolId: string, updates: { id: string; data: Record<string, unknown> }[]): Promise<BulkResult> {
    let succeeded = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const update of updates) {
      try {
        await this.repo.updateBus(schoolId, update.id, update.data);
        succeeded++;
      } catch (e) {
        failed++;
        errors.push(e instanceof Error ? e.message : 'Unknown error');
      }
    }

    return { succeeded, failed, errors };
  }

  async bulkDeleteBuses(schoolId: string, ids: string[]): Promise<BulkResult> {
    let succeeded = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const id of ids) {
      try {
        await this.repo.deleteBus(schoolId, id);
        succeeded++;
      } catch (e) {
        failed++;
        errors.push(e instanceof Error ? e.message : 'Unknown error');
      }
    }

    return { succeeded, failed, errors };
  }

  async bulkCreateBooks(schoolId: string, items: Record<string, unknown>[]): Promise<BulkResult> {
    let succeeded = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const item of items) {
      try {
        await this.repo.createBook(schoolId, item);
        succeeded++;
      } catch (e) {
        failed++;
        errors.push(e instanceof Error ? e.message : 'Unknown error');
      }
    }

    return { succeeded, failed, errors };
  }

  async bulkDeleteBooks(schoolId: string, ids: string[]): Promise<BulkResult> {
    let succeeded = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const id of ids) {
      try {
        await this.repo.deleteBook(schoolId, id);
        succeeded++;
      } catch (e) {
        failed++;
        errors.push(e instanceof Error ? e.message : 'Unknown error');
      }
    }

    return { succeeded, failed, errors };
  }

  async bulkCreateIoTDevices(schoolId: string, items: Record<string, unknown>[]): Promise<BulkResult> {
    let succeeded = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const item of items) {
      try {
        await this.repo.createIoTDevice(schoolId, item);
        succeeded++;
      } catch (e) {
        failed++;
        errors.push(e instanceof Error ? e.message : 'Unknown error');
      }
    }

    return { succeeded, failed, errors };
  }

  async bulkCreateRooms(schoolId: string, items: Record<string, unknown>[]): Promise<BulkResult> {
    let succeeded = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const item of items) {
      try {
        await this.repo.createRoom(schoolId, item);
        succeeded++;
      } catch (e) {
        failed++;
        errors.push(e instanceof Error ? e.message : 'Unknown error');
      }
    }

    return { succeeded, failed, errors };
  }
}
