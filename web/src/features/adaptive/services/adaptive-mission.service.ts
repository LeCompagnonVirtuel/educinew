import type { SupabaseClient } from '@supabase/supabase-js';
import type { Mission } from '@educi/types';
import { AdaptiveMissionError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveMissionService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getMission(schoolId: string, id: string): Promise<Mission> {
    const item = await this.repo.getMission(schoolId, id);
    if (!item) throw new AdaptiveMissionError(id);
    return item;
  }
  async listMissions(schoolId: string, filters?: Record<string, unknown>): Promise<Mission[]> {
    return this.repo.listMissions(schoolId, filters);
  }
  async createMission(schoolId: string, data: Omit<Mission, 'id' | 'created_at'>): Promise<Mission> {
    return this.repo.createMission(schoolId, data);
  }
  async updateMission(schoolId: string, id: string, data: Partial<Omit<Mission, 'id' | 'created_at'>>): Promise<Mission> {
    const existing = await this.repo.getMission(schoolId, id);
    if (!existing) throw new AdaptiveMissionError(id);
    return this.repo.updateMission(schoolId, id, data);
  }
  async deleteMission(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMission(schoolId, id);
    if (!existing) throw new AdaptiveMissionError(id);
    return this.repo.deleteMission(schoolId, id);
  }
}
