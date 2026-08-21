import type { SupabaseClient } from '@supabase/supabase-js';
import type { VisitorBadge, VisitorBadgeCreate } from '@educi/types';
import { ScVisitorBadgeNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVisitorBadgeService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getBadge(schoolId: string, id: string): Promise<VisitorBadge> {
    const badge = await this.repo.findVisitorBadgeById(schoolId, id);
    if (!badge) throw new ScVisitorBadgeNotFoundError(id);
    return badge;
  }

  async listBadges(schoolId: string, filters?: Record<string, unknown>): Promise<VisitorBadge[]> {
    return this.repo.findAllVisitorBadges(schoolId, filters);
  }

  async createBadge(schoolId: string, data: VisitorBadgeCreate): Promise<VisitorBadge> {
    return this.repo.createVisitorBadge(schoolId, data);
  }

  async updateBadge(schoolId: string, id: string, data: Partial<VisitorBadgeCreate>): Promise<VisitorBadge> {
    const existing = await this.repo.findVisitorBadgeById(schoolId, id);
    if (!existing) throw new ScVisitorBadgeNotFoundError(id);
    return this.repo.updateVisitorBadge(schoolId, id, data);
  }

  async deleteBadge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVisitorBadgeById(schoolId, id);
    if (!existing) throw new ScVisitorBadgeNotFoundError(id);
    return this.repo.deleteVisitorBadge(schoolId, id);
  }

  async countBadges(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countVisitorBadges(schoolId, filters);
  }
}
