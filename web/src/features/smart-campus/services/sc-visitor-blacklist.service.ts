import type { SupabaseClient } from '@supabase/supabase-js';
import type { VisitorBlacklist, VisitorBlacklistCreate } from '@educi/types';
import { ScVisitorBlacklistNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVisitorBlacklistService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getBlacklist(schoolId: string, id: string): Promise<VisitorBlacklist> {
    const entry = await this.repo.findVisitorBlacklistById(schoolId, id);
    if (!entry) throw new ScVisitorBlacklistNotFoundError(id);
    return entry;
  }

  async listBlacklist(schoolId: string, filters?: Record<string, unknown>): Promise<VisitorBlacklist[]> {
    return this.repo.findAllVisitorBlacklist(schoolId, filters);
  }

  async createBlacklist(schoolId: string, data: VisitorBlacklistCreate): Promise<VisitorBlacklist> {
    return this.repo.createVisitorBlacklist(schoolId, data);
  }

  async updateBlacklist(schoolId: string, id: string, data: Partial<VisitorBlacklistCreate>): Promise<VisitorBlacklist> {
    const existing = await this.repo.findVisitorBlacklistById(schoolId, id);
    if (!existing) throw new ScVisitorBlacklistNotFoundError(id);
    return this.repo.updateVisitorBlacklist(schoolId, id, data);
  }

  async deleteBlacklist(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVisitorBlacklistById(schoolId, id);
    if (!existing) throw new ScVisitorBlacklistNotFoundError(id);
    return this.repo.deleteVisitorBlacklist(schoolId, id);
  }

  async countBlacklist(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVisitorBlacklist(schoolId, filters);
  }
}
