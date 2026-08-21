import type { SupabaseClient } from '@supabase/supabase-js';
import type { ScienceSolver, ScienceSolverCreate } from '@educi/types';
import { AdaptiveScienceSolverNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveScienceSolverService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getSolver(schoolId: string, id: string): Promise<ScienceSolver> {
    const item = await this.repo.getScienceSolver(schoolId, id);
    if (!item) throw new AdaptiveScienceSolverNotFoundError(id);
    return item;
  }
  async listSolvers(schoolId: string, filters?: Record<string, unknown>): Promise<ScienceSolver[]> {
    return this.repo.listScienceSolvers(schoolId, filters);
  }
  async createSolver(schoolId: string, data: ScienceSolverCreate): Promise<ScienceSolver> {
    return this.repo.createScienceSolver(schoolId, data);
  }
  async updateSolver(schoolId: string, id: string, data: Partial<ScienceSolverCreate>): Promise<ScienceSolver> {
    const existing = await this.repo.getScienceSolver(schoolId, id);
    if (!existing) throw new AdaptiveScienceSolverNotFoundError(id);
    return this.repo.updateScienceSolver(schoolId, id, data);
  }
  async deleteSolver(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getScienceSolver(schoolId, id);
    if (!existing) throw new AdaptiveScienceSolverNotFoundError(id);
    return this.repo.deleteScienceSolver(schoolId, id);
  }
}
