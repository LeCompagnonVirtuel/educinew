import type { SupabaseClient } from '@supabase/supabase-js';
import type { KitchenStaff, KitchenStaffCreate } from '@educi/types';
import { ScKitchenStaffNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScKitchenStaffService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getStaff(schoolId: string, id: string): Promise<KitchenStaff> {
    const staff = await this.repo.findKitchenStaffById(schoolId, id);
    if (!staff) throw new ScKitchenStaffNotFoundError(id);
    return staff;
  }

  async listStaff(schoolId: string, filters?: Record<string, unknown>): Promise<KitchenStaff[]> {
    return this.repo.findAllKitchenStaff(schoolId, filters);
  }

  async createStaff(schoolId: string, data: KitchenStaffCreate): Promise<KitchenStaff> {
    return this.repo.createKitchenStaff(schoolId, data);
  }

  async updateStaff(schoolId: string, id: string, data: Partial<KitchenStaffCreate>): Promise<KitchenStaff> {
    const existing = await this.repo.findKitchenStaffById(schoolId, id);
    if (!existing) throw new ScKitchenStaffNotFoundError(id);
    return this.repo.updateKitchenStaff(schoolId, id, data);
  }

  async deleteStaff(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findKitchenStaffById(schoolId, id);
    if (!existing) throw new ScKitchenStaffNotFoundError(id);
    return this.repo.deleteKitchenStaff(schoolId, id);
  }

  async countStaff(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countKitchenStaff(schoolId, filters);
  }
}
