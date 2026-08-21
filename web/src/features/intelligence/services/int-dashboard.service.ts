// Intelligence Platform Service - IntelligenceDashboard
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceDashboard, IntelligenceDashboardCreate } from '@educi/types';
import { IntDashboardNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntDashboardService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getDashboard(schoolId: string, id: string): Promise<IntelligenceDashboard> {
    const item = await this.repo.getDashboard(id, schoolId);
    if (!item) throw new IntDashboardNotFoundError(id);
    return item;
  }
  async listDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceDashboard[]> {
    return this.repo.listDashboards(schoolId, filters);
  }
  async createDashboard(schoolId: string, data: IntelligenceDashboardCreate): Promise<IntelligenceDashboard> {
    return this.repo.createDashboard({ ...data, school_id: schoolId });
  }
  async updateDashboard(schoolId: string, id: string, data: Partial<IntelligenceDashboardCreate>): Promise<IntelligenceDashboard> {
    const existing = await this.repo.getDashboard(id, schoolId);
    if (!existing) throw new IntDashboardNotFoundError(id);
    return this.repo.updateDashboard(id, schoolId, data);
  }
  async deleteDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDashboard(id, schoolId);
    if (!existing) throw new IntDashboardNotFoundError(id);
    return this.repo.deleteDashboard(id, schoolId);
  }
}
