import type { SupabaseClient } from '@supabase/supabase-js';
import type { Team } from '@educi/types';
import { AdaptiveTeamError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveTeamService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getTeam(schoolId: string, id: string): Promise<Team> {
    const item = await this.repo.getTeam(schoolId, id);
    if (!item) throw new AdaptiveTeamError(id);
    return item;
  }
  async listTeams(schoolId: string, filters?: Record<string, unknown>): Promise<Team[]> {
    return this.repo.listTeams(schoolId, filters);
  }
  async createTeam(schoolId: string, data: Omit<Team, 'id' | 'created_at'>): Promise<Team> {
    return this.repo.createTeam(schoolId, data);
  }
  async updateTeam(schoolId: string, id: string, data: Partial<Omit<Team, 'id' | 'created_at'>>): Promise<Team> {
    const existing = await this.repo.getTeam(schoolId, id);
    if (!existing) throw new AdaptiveTeamError(id);
    return this.repo.updateTeam(schoolId, id, data);
  }
  async deleteTeam(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTeam(schoolId, id);
    if (!existing) throw new AdaptiveTeamError(id);
    return this.repo.deleteTeam(schoolId, id);
  }
}
