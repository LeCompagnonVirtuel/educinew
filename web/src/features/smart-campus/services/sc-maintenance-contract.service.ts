import type { SupabaseClient } from '@supabase/supabase-js';
import type { MaintenanceContract, MaintenanceContractCreate } from '@educi/types';
import { ScMaintenanceContractNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMaintenanceContractService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getContract(schoolId: string, id: string): Promise<MaintenanceContract> {
    const contract = await this.repo.findMaintenanceContractById(schoolId, id);
    if (!contract) throw new ScMaintenanceContractNotFoundError(id);
    return contract;
  }

  async listContracts(schoolId: string, filters?: Record<string, unknown>): Promise<MaintenanceContract[]> {
    return this.repo.findAllMaintenanceContracts(schoolId, filters);
  }

  async createContract(schoolId: string, data: MaintenanceContractCreate): Promise<MaintenanceContract> {
    return this.repo.createMaintenanceContract(schoolId, data);
  }

  async updateContract(schoolId: string, id: string, data: Partial<MaintenanceContractCreate>): Promise<MaintenanceContract> {
    const existing = await this.repo.findMaintenanceContractById(schoolId, id);
    if (!existing) throw new ScMaintenanceContractNotFoundError(id);
    return this.repo.updateMaintenanceContract(schoolId, id, data);
  }

  async deleteContract(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMaintenanceContractById(schoolId, id);
    if (!existing) throw new ScMaintenanceContractNotFoundError(id);
    return this.repo.deleteMaintenanceContract(schoolId, id);
  }

  async countContracts(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMaintenanceContracts(schoolId, filters);
  }
}
