import type { SupabaseClient } from '@supabase/supabase-js';
import type { DoorAccess, DoorAccessCreate } from '@educi/types';
import { ScDoorAccessNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAccessControlService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAccess(schoolId: string, id: string): Promise<DoorAccess> {
    const access = await this.repo.findDoorAccessById(schoolId, id);
    if (!access) throw new ScDoorAccessNotFoundError(id);
    return access;
  }

  async grantAccess(schoolId: string, userId: string, doorId: string): Promise<DoorAccess> {
    return this.repo.grantDoorAccess(schoolId, userId, doorId);
  }

  async revokeAccess(schoolId: string, userId: string, doorId: string): Promise<void> {
    return this.repo.revokeDoorAccess(schoolId, userId, doorId);
  }

  async getAccessLog(schoolId: string, doorId: string, date: string): Promise<DoorAccess[]> {
    return this.repo.getDoorAccessLog(schoolId, doorId, date);
  }

  async getDeniedAccess(schoolId: string): Promise<DoorAccess[]> {
    return this.repo.findDeniedAccess(schoolId);
  }

  async getActiveAccess(schoolId: string): Promise<DoorAccess[]> {
    return this.repo.findActiveDoorAccess(schoolId);
  }

  async getAccessByUser(schoolId: string, userId: string): Promise<DoorAccess[]> {
    return this.repo.findDoorAccessByUser(schoolId, userId);
  }

  async countAccess(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDoorAccess(schoolId, filters);
  }
}
