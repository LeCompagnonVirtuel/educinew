import type { SupabaseClient } from '@supabase/supabase-js';
import type { Unit, UnitCreate } from '@educi/types';
import { LxpUnitNotFoundError, LxpUnitCreateError, LxpUnitUpdateError, LxpUnitDeleteError } from '@educi/errors';
import { LxpRepositoryEnterprise } from '../repositories/lxp.repository';

export class LxpUnitService {
  private repo: LxpRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new LxpRepositoryEnterprise(supabase);
  }

  async getUnit(schoolId: string, id: string): Promise<Unit> {
    const unit = await this.repo.findUnitById(schoolId, id);
    if (!unit) throw new LxpUnitNotFoundError(id);
    return unit;
  }

  async listUnits(chapterId: string): Promise<readonly Unit[]> {
    return this.repo.findUnits(chapterId);
  }

  async createUnit(data: UnitCreate): Promise<Unit> {
    const created = await this.repo.createUnit(data);
    if (!created) throw new LxpUnitCreateError();
    return created;
  }

  async updateUnit(schoolId: string, id: string, data: Partial<UnitCreate>): Promise<Unit> {
    const existing = await this.repo.findUnitById(schoolId, id);
    if (!existing) throw new LxpUnitNotFoundError(id);
    const updated = await this.repo.updateUnit(id, data);
    if (!updated) throw new LxpUnitUpdateError();
    return updated;
  }

  async deleteUnit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findUnitById(schoolId, id);
    if (!existing) throw new LxpUnitNotFoundError(id);
    const deleted = await this.repo.deleteUnit(id);
    if (!deleted) throw new LxpUnitDeleteError();
  }
}
