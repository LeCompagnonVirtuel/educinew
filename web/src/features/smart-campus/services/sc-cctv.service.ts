import type { SupabaseClient } from '@supabase/supabase-js';
import type { CCTV, CCTVCreate } from '@educi/types';
import { ScCCTVNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScCCTVService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getCCTV(schoolId: string, id: string): Promise<CCTV> {
    const cctv = await this.repo.findCCTVById(schoolId, id);
    if (!cctv) throw new ScCCTVNotFoundError(id);
    return cctv;
  }

  async listCCTVs(schoolId: string, filters?: Record<string, unknown>): Promise<CCTV[]> {
    return this.repo.findAllCCTVs(schoolId, filters);
  }

  async createCCTV(schoolId: string, data: CCTVCreate): Promise<CCTV> {
    return this.repo.createCCTV(schoolId, data);
  }

  async updateCCTV(schoolId: string, id: string, data: Partial<CCTVCreate>): Promise<CCTV> {
    const existing = await this.repo.findCCTVById(schoolId, id);
    if (!existing) throw new ScCCTVNotFoundError(id);
    return this.repo.updateCCTV(schoolId, id, data);
  }

  async deleteCCTV(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCCTVById(schoolId, id);
    if (!existing) throw new ScCCTVNotFoundError(id);
    return this.repo.deleteCCTV(schoolId, id);
  }

  async countCCTVs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCCTVs(schoolId, filters);
  }
}
