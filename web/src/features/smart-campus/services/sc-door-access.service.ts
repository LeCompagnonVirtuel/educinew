import type { SupabaseClient } from '@supabase/supabase-js';
import type { DoorAccess, DoorAccessCreate } from '@educi/types';
import { ScDoorAccessNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScDoorAccessService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAccess(schoolId: string, id: string): Promise<DoorAccess> {
    const access = await this.repo.findDoorAccessById(schoolId, id);
    if (!access) throw new ScDoorAccessNotFoundError(id);
    return access;
  }

  async listAccess(schoolId: string, filters?: Record<string, unknown>): Promise<DoorAccess[]> {
    return this.repo.findAllDoorAccesses(schoolId, filters);
  }

  async createAccess(schoolId: string, data: DoorAccessCreate): Promise<DoorAccess> {
    return this.repo.createDoorAccess(schoolId, data);
  }

  async updateAccess(schoolId: string, id: string, data: Partial<DoorAccessCreate>): Promise<DoorAccess> {
    const existing = await this.repo.findDoorAccessById(schoolId, id);
    if (!existing) throw new ScDoorAccessNotFoundError(id);
    return this.repo.updateDoorAccess(schoolId, id, data);
  }

  async deleteAccess(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDoorAccessById(schoolId, id);
    if (!existing) throw new ScDoorAccessNotFoundError(id);
    return this.repo.deleteDoorAccess(schoolId, id);
  }

  async countAccess(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDoorAccesses(schoolId, filters);
  }
}
