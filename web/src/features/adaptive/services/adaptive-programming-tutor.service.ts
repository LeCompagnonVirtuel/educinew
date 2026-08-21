import type { SupabaseClient } from '@supabase/supabase-js';
import type { ProgrammingTutor, ProgrammingTutorCreate } from '@educi/types';
import { AdaptiveProgrammingTutorNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveProgrammingTutorService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getTutor(schoolId: string, id: string): Promise<ProgrammingTutor> {
    const item = await this.repo.getProgrammingTutor(schoolId, id);
    if (!item) throw new AdaptiveProgrammingTutorNotFoundError(id);
    return item;
  }
  async listTutors(schoolId: string, filters?: Record<string, unknown>): Promise<ProgrammingTutor[]> {
    return this.repo.listProgrammingTutors(schoolId, filters);
  }
  async createTutor(schoolId: string, data: ProgrammingTutorCreate): Promise<ProgrammingTutor> {
    return this.repo.createProgrammingTutor(schoolId, data);
  }
  async updateTutor(schoolId: string, id: string, data: Partial<ProgrammingTutorCreate>): Promise<ProgrammingTutor> {
    const existing = await this.repo.getProgrammingTutor(schoolId, id);
    if (!existing) throw new AdaptiveProgrammingTutorNotFoundError(id);
    return this.repo.updateProgrammingTutor(schoolId, id, data);
  }
  async deleteTutor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getProgrammingTutor(schoolId, id);
    if (!existing) throw new AdaptiveProgrammingTutorNotFoundError(id);
    return this.repo.deleteProgrammingTutor(schoolId, id);
  }
}
