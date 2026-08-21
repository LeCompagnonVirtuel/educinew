import type { SupabaseClient } from '@supabase/supabase-js';
import type { Guard, GuardCreate } from '@educi/types';
import { ScGuardNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScGuardService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getGuard(schoolId: string, id: string): Promise<Guard> {
    const guard = await this.repo.findGuardById(schoolId, id);
    if (!guard) throw new ScGuardNotFoundError(id);
    return guard;
  }

  async listGuards(schoolId: string, filters?: Record<string, unknown>): Promise<Guard[]> {
    return this.repo.findAllGuards(schoolId, filters);
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

  async countGuards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countGuards(schoolId, filters);
  }
}
