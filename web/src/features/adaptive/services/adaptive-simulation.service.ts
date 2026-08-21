import type { SupabaseClient } from '@supabase/supabase-js';
import type { Simulation } from '@educi/types';
import { AdaptiveSimulationNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveSimulationService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getSimulation(schoolId: string, id: string): Promise<Simulation> {
    const item = await this.repo.getSimulation(schoolId, id);
    if (!item) throw new AdaptiveSimulationNotFoundError(id);
    return item;
  }
  async listSimulations(schoolId: string, filters?: Record<string, unknown>): Promise<Simulation[]> {
    return this.repo.listSimulations(schoolId, filters);
  }
  async createSimulation(schoolId: string, data: Omit<Simulation, 'id' | 'created_at'>): Promise<Simulation> {
    return this.repo.createSimulation(schoolId, data);
  }
  async updateSimulation(schoolId: string, id: string, data: Partial<Omit<Simulation, 'id' | 'created_at'>>): Promise<Simulation> {
    const existing = await this.repo.getSimulation(schoolId, id);
    if (!existing) throw new AdaptiveSimulationNotFoundError(id);
    return this.repo.updateSimulation(schoolId, id, data);
  }
  async deleteSimulation(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSimulation(schoolId, id);
    if (!existing) throw new AdaptiveSimulationNotFoundError(id);
    return this.repo.deleteSimulation(schoolId, id);
  }
}
