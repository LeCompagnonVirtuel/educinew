import type { SupabaseClient } from '@supabase/supabase-js';
import type { MathSolver, MathSolverCreate } from '@educi/types';
import { AdaptiveMathSolverNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveMathSolverService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getSolver(schoolId: string, id: string): Promise<MathSolver> {
    const item = await this.repo.getMathSolver(schoolId, id);
    if (!item) throw new AdaptiveMathSolverNotFoundError(id);
    return item;
  }
  async listSolvers(schoolId: string, filters?: Record<string, unknown>): Promise<MathSolver[]> {
    return this.repo.listMathSolvers(schoolId, filters);
  }
  async createSolver(schoolId: string, data: MathSolverCreate): Promise<MathSolver> {
    return this.repo.createMathSolver(schoolId, data);
  }
  async updateSolver(schoolId: string, id: string, data: Partial<MathSolverCreate>): Promise<MathSolver> {
    const existing = await this.repo.getMathSolver(schoolId, id);
    if (!existing) throw new AdaptiveMathSolverNotFoundError(id);
    return this.repo.updateMathSolver(schoolId, id, data);
  }
  async deleteSolver(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getMathSolver(schoolId, id);
    if (!existing) throw new AdaptiveMathSolverNotFoundError(id);
    return this.repo.deleteMathSolver(schoolId, id);
  }
}
