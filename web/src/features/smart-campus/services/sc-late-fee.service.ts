import type { SupabaseClient } from '@supabase/supabase-js';
import type { LateFee, LateFeeCreate } from '@educi/types';
import { ScFineNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScLateFeeService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getLateFee(schoolId: string, id: string): Promise<LateFee> {
    const fee = await this.repo.findLateFeeById(schoolId, id);
    if (!fee) throw new ScFineNotFoundError(id);
    return fee;
  }

  async listLateFees(schoolId: string, filters?: Record<string, unknown>): Promise<LateFee[]> {
    return this.repo.findAllLateFees(schoolId, filters);
  }

  async createLateFee(schoolId: string, data: LateFeeCreate): Promise<LateFee> {
    return this.repo.createLateFee(schoolId, data);
  }

  async updateLateFee(schoolId: string, id: string, data: Partial<LateFeeCreate>): Promise<LateFee> {
    const existing = await this.repo.findLateFeeById(schoolId, id);
    if (!existing) throw new ScFineNotFoundError(id);
    return this.repo.updateLateFee(schoolId, id, data);
  }

  async deleteLateFee(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findLateFeeById(schoolId, id);
    if (!existing) throw new ScFineNotFoundError(id);
    return this.repo.deleteLateFee(schoolId, id);
  }

  async countLateFees(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countLateFees(schoolId, filters);
  }
}
