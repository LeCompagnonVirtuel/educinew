import type { SupabaseClient } from '@supabase/supabase-js';
import type { PersonalizedExercise, PersonalizedExerciseCreate } from '@educi/types';
import { AdaptiveExerciseNotFoundError } from '@educi/errors';
import { createAdaptiveRepository } from '../repositories/adaptive.repository';

export class AdaptiveExerciseService {
  private repo: ReturnType<typeof createAdaptiveRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAdaptiveRepository(supabase);
  }
  async getPersonalizedExercise(schoolId: string, id: string): Promise<PersonalizedExercise> {
    const item = await this.repo.getPersonalizedExercise(schoolId, id);
    if (!item) throw new AdaptiveExerciseNotFoundError(id);
    return item;
  }
  async listPersonalizedExercises(schoolId: string, filters?: Record<string, unknown>): Promise<PersonalizedExercise[]> {
    return this.repo.listPersonalizedExercises(schoolId, filters);
  }
  async createPersonalizedExercise(schoolId: string, data: PersonalizedExerciseCreate): Promise<PersonalizedExercise> {
    return this.repo.createPersonalizedExercise(schoolId, { ...data } as any);
  }
  async updatePersonalizedExercise(schoolId: string, id: string, data: Partial<PersonalizedExerciseCreate>): Promise<PersonalizedExercise> {
    const existing = await this.repo.getPersonalizedExercise(schoolId, id);
    if (!existing) throw new AdaptiveExerciseNotFoundError(id);
    return this.repo.updatePersonalizedExercise(schoolId, id, data);
  }
  async deletePersonalizedExercise(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getPersonalizedExercise(schoolId, id);
    if (!existing) throw new AdaptiveExerciseNotFoundError(id);
    return this.repo.deletePersonalizedExercise(schoolId, id);
  }
}
