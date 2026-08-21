// Intelligence Platform Service - IntelligenceKPI
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceKPI, IntelligenceKPICreate } from '@educi/types';
import { IntKPINotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntKPIService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getKPI(schoolId: string, id: string): Promise<IntelligenceKPI> {
    const item = await this.repo.getKPI(id, schoolId);
    if (!item) throw new IntKPINotFoundError(id);
    return item;
  }
  async listKPIs(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceKPI[]> {
    return this.repo.listKPIs(schoolId, filters);
  }
  async createKPI(schoolId: string, data: IntelligenceKPICreate): Promise<IntelligenceKPI> {
    return this.repo.createKPI({ ...data, school_id: schoolId });
  }
  async updateKPI(schoolId: string, id: string, data: Partial<IntelligenceKPICreate>): Promise<IntelligenceKPI> {
    const existing = await this.repo.getKPI(id, schoolId);
    if (!existing) throw new IntKPINotFoundError(id);
    return this.repo.updateKPI(id, schoolId, data);
  }
  async deleteKPI(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getKPI(id, schoolId);
    if (!existing) throw new IntKPINotFoundError(id);
    return this.repo.deleteKPI(id, schoolId);
  }
}
