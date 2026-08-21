// Intelligence Platform Service - EarlyWarning
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { EarlyWarning, EarlyWarningCreate } from '@educi/types';
import { IntEarlyWarningNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntEarlyWarningService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getEarlyWarning(schoolId: string, id: string): Promise<EarlyWarning> {
    const item = await this.repo.getEarlyWarning(id, schoolId);
    if (!item) throw new IntEarlyWarningNotFoundError(id);
    return item;
  }
  async listEarlyWarnings(schoolId: string, filters?: Record<string, unknown>): Promise<EarlyWarning[]> {
    return this.repo.listEarlyWarnings(schoolId, filters);
  }
  async createEarlyWarning(schoolId: string, data: EarlyWarningCreate): Promise<EarlyWarning> {
    return this.repo.createEarlyWarning({ ...data, school_id: schoolId });
  }
  async updateEarlyWarning(schoolId: string, id: string, data: Partial<EarlyWarningCreate>): Promise<EarlyWarning> {
    const existing = await this.repo.getEarlyWarning(id, schoolId);
    if (!existing) throw new IntEarlyWarningNotFoundError(id);
    return this.repo.updateEarlyWarning(id, schoolId, data);
  }
  async deleteEarlyWarning(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEarlyWarning(id, schoolId);
    if (!existing) throw new IntEarlyWarningNotFoundError(id);
    return this.repo.deleteEarlyWarning(id, schoolId);
  }
}
