// Intelligence Platform Service - IntelligenceAction
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceAction, IntelligenceActionCreate } from '@educi/types';
import { IntActionNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntActionService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getAction(schoolId: string, id: string): Promise<IntelligenceAction> {
    const item = await this.repo.getAction(id, schoolId);
    if (!item) throw new IntActionNotFoundError(id);
    return item;
  }
  async listActions(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceAction[]> {
    return this.repo.listActions(schoolId, filters);
  }
  async createAction(schoolId: string, data: IntelligenceActionCreate): Promise<IntelligenceAction> {
    return this.repo.createAction({ ...data, school_id: schoolId });
  }
  async updateAction(schoolId: string, id: string, data: Partial<IntelligenceActionCreate>): Promise<IntelligenceAction> {
    const existing = await this.repo.getAction(id, schoolId);
    if (!existing) throw new IntActionNotFoundError(id);
    return this.repo.updateAction(id, schoolId, data);
  }
  async deleteAction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAction(id, schoolId);
    if (!existing) throw new IntActionNotFoundError(id);
    return this.repo.deleteAction(id, schoolId);
  }
}
