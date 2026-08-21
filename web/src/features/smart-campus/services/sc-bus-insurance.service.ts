import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusInsurance, BusInsuranceCreate } from '@educi/types';
import { ScInsuranceNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusInsuranceService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getInsurance(schoolId: string, id: string): Promise<BusInsurance> {
    const insurance = await this.repo.findBusInsuranceById(schoolId, id);
    if (!insurance) throw new ScInsuranceNotFoundError(id);
    return insurance;
  }

  async listInsurance(schoolId: string, filters?: Record<string, unknown>): Promise<BusInsurance[]> {
    return this.repo.findAllBusInsurance(schoolId, filters);
  }

  async createInsurance(schoolId: string, data: BusInsuranceCreate): Promise<BusInsurance> {
    return this.repo.createBusInsurance(schoolId, data);
  }

  async updateInsurance(schoolId: string, id: string, data: Partial<BusInsuranceCreate>): Promise<BusInsurance> {
    const existing = await this.repo.findBusInsuranceById(schoolId, id);
    if (!existing) throw new ScInsuranceNotFoundError(id);
    return this.repo.updateBusInsurance(schoolId, id, data);
  }

  async deleteInsurance(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusInsuranceById(schoolId, id);
    if (!existing) throw new ScInsuranceNotFoundError(id);
    return this.repo.deleteBusInsurance(schoolId, id);
  }

  async countInsurance(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusInsurance(schoolId, filters);
  }
}
