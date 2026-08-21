import type { SupabaseClient } from '@supabase/supabase-js';
import type { StateDefinition } from '@educi/types';
import { EduOSStateDefinitionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSStateDefinitionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getStateDefinition(schoolId: string, id: string): Promise<StateDefinition> {
    const item = await this.repo.getStateDefinition(schoolId, id);
    if (!item) throw new EduOSStateDefinitionError(id);
    return item;
  }
  async listStateDefinitions(schoolId: string, filters?: Record<string, unknown>): Promise<StateDefinition[]> {
    return this.repo.listStateDefinitions(schoolId, filters);
  }
  async createStateDefinition(schoolId: string, data: Partial<StateDefinition>): Promise<StateDefinition> {
    return this.repo.createStateDefinition(schoolId, data as any);
  }
  async updateStateDefinition(schoolId: string, id: string, data: Partial<StateDefinition>): Promise<StateDefinition> {
    const existing = await this.repo.getStateDefinition(schoolId, id);
    if (!existing) throw new EduOSStateDefinitionError(id);
    return this.repo.updateStateDefinition(schoolId, id, data as any);
  }
  async deleteStateDefinition(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStateDefinition(schoolId, id);
    if (!existing) throw new EduOSStateDefinitionError(id);
    return this.repo.deleteStateDefinition(schoolId, id);
  }
}

