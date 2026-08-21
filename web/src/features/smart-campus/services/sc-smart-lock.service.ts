import type { SupabaseClient } from '@supabase/supabase-js';
import type { SmartLock, SmartLockCreate } from '@educi/types';
import { ScSmartLockNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScSmartLockService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getLock(schoolId: string, id: string): Promise<SmartLock> {
    const lock = await this.repo.findSmartLockById(schoolId, id);
    if (!lock) throw new ScSmartLockNotFoundError(id);
    return lock;
  }

  async listLocks(schoolId: string, filters?: Record<string, unknown>): Promise<SmartLock[]> {
    return this.repo.findAllSmartLocks(schoolId, filters);
  }

  async createLock(schoolId: string, data: SmartLockCreate): Promise<SmartLock> {
    return this.repo.createSmartLock(schoolId, data);
  }

  async updateLock(schoolId: string, id: string, data: Partial<SmartLockCreate>): Promise<SmartLock> {
    const existing = await this.repo.findSmartLockById(schoolId, id);
    if (!existing) throw new ScSmartLockNotFoundError(id);
    return this.repo.updateSmartLock(schoolId, id, data);
  }

  async deleteLock(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findSmartLockById(schoolId, id);
    if (!existing) throw new ScSmartLockNotFoundError(id);
    return this.repo.deleteSmartLock(schoolId, id);
  }

  async countLocks(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countSmartLocks(schoolId, filters);
  }
}
