import type { SupabaseClient } from '@supabase/supabase-js';
import type { Guard, GuardCreate } from '@educi/types';
import { ScGuardNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScGuardManagementService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getGuard(schoolId: string, id: string): Promise<Guard> {
    const guard = await this.repo.findGuardById(schoolId, id);
    if (!guard) throw new ScGuardNotFoundError(id);
    return guard;
  }

  async listGuards(schoolId: string): Promise<Guard[]> {
    return this.repo.findAllGuards(schoolId);
  }

  async createGuard(schoolId: string, data: GuardCreate): Promise<Guard> {
    return this.repo.createGuard(schoolId, data);
  }

  async updateGuard(schoolId: string, id: string, data: Partial<GuardCreate>): Promise<Guard> {
    const existing = await this.repo.findGuardById(schoolId, id);
    if (!existing) throw new ScGuardNotFoundError(id);
    return this.repo.updateGuard(schoolId, id, data);
  }

  async deleteGuard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findGuardById(schoolId, id);
    if (!existing) throw new ScGuardNotFoundError(id);
    return this.repo.deleteGuard(schoolId, id);
  }

  async getOnDutyGuards(schoolId: string, date: string): Promise<Guard[]> {
    return this.repo.findGuardsOnDuty(schoolId, date);
  }

  async getGuardsByShift(schoolId: string, shift: string): Promise<Guard[]> {
    return this.repo.findGuardsByShift(schoolId, shift);
  }

  async getDutyHours(schoolId: string, guardId: string, startDate: string, endDate: string): Promise<number> {
    return this.repo.getGuardDutyHours(schoolId, guardId, startDate, endDate);
  }
}
