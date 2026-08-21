import type { SupabaseClient } from '@supabase/supabase-js';
import type { MaintenanceRecord, MaintenanceRecordCreate } from '@educi/types';
import { ScTransportMaintenanceNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusMaintenanceService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMaintenance(schoolId: string, id: string): Promise<MaintenanceRecord> {
    const record = await this.repo.findBusMaintenanceById(schoolId, id);
    if (!record) throw new ScTransportMaintenanceNotFoundError(id);
    return record;
  }

  async listMaintenance(schoolId: string, filters?: Record<string, unknown>): Promise<MaintenanceRecord[]> {
    return this.repo.findAllBusMaintenance(schoolId, filters);
  }

  async createMaintenance(schoolId: string, data: MaintenanceRecordCreate): Promise<MaintenanceRecord> {
    return this.repo.createBusMaintenance(schoolId, data);
  }

  async updateMaintenance(schoolId: string, id: string, data: Partial<MaintenanceRecordCreate>): Promise<MaintenanceRecord> {
    const existing = await this.repo.findBusMaintenanceById(schoolId, id);
    if (!existing) throw new ScTransportMaintenanceNotFoundError(id);
    return this.repo.updateBusMaintenance(schoolId, id, data);
  }

  async deleteMaintenance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusMaintenanceById(schoolId, id);
    if (!existing) throw new ScTransportMaintenanceNotFoundError(id);
    return this.repo.deleteBusMaintenance(schoolId, id);
  }

  async countMaintenance(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusMaintenance(schoolId, filters);
  }
}
