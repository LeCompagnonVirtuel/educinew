import type { SupabaseClient } from '@supabase/supabase-js';
import type { TriggerCondition } from '@educi/types';
import { EduOSTriggerConditionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSTriggerConditionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getTriggerCondition(schoolId: string, id: string): Promise<TriggerCondition> {
    const item = await this.repo.getTriggerCondition(schoolId, id);
    if (!item) throw new EduOSTriggerConditionError(id);
    return item;
  }
  async listTriggerConditions(schoolId: string, filters?: Record<string, unknown>): Promise<TriggerCondition[]> {
    return this.repo.listTriggerConditions(schoolId, filters);
  }
  async createTriggerCondition(schoolId: string, data: Partial<TriggerCondition>): Promise<TriggerCondition> {
    return this.repo.createTriggerCondition(schoolId, data as any);
  }
  async updateTriggerCondition(schoolId: string, id: string, data: Partial<TriggerCondition>): Promise<TriggerCondition> {
    const existing = await this.repo.getTriggerCondition(schoolId, id);
    if (!existing) throw new EduOSTriggerConditionError(id);
    return this.repo.updateTriggerCondition(schoolId, id, data as any);
  }
  async deleteTriggerCondition(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTriggerCondition(schoolId, id);
    if (!existing) throw new EduOSTriggerConditionError(id);
    return this.repo.deleteTriggerCondition(schoolId, id);
  }
}

