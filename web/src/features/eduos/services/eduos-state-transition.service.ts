import type { SupabaseClient } from '@supabase/supabase-js';
import type { StateTransition } from '@educi/types';
import { EduOSStateTransitionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSStateTransitionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getStateTransition(schoolId: string, id: string): Promise<StateTransition> {
    const item = await this.repo.getStateTransition(schoolId, id);
    if (!item) throw new EduOSStateTransitionError(id);
    return item;
  }
  async listStateTransitions(schoolId: string, filters?: Record<string, unknown>): Promise<StateTransition[]> {
    return this.repo.listStateTransitions(schoolId, filters);
  }
  async createStateTransition(schoolId: string, data: Partial<StateTransition>): Promise<StateTransition> {
    return this.repo.createStateTransition(schoolId, data as any);
  }
  async updateStateTransition(schoolId: string, id: string, data: Partial<StateTransition>): Promise<StateTransition> {
    const existing = await this.repo.getStateTransition(schoolId, id);
    if (!existing) throw new EduOSStateTransitionError(id);
    return this.repo.updateStateTransition(schoolId, id, data as any);
  }
  async deleteStateTransition(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStateTransition(schoolId, id);
    if (!existing) throw new EduOSStateTransitionError(id);
    return this.repo.deleteStateTransition(schoolId, id);
  }
}

