// Enterprise Platform Service - PerformanceDashboard
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PerformanceDashboard, PerformanceDashboardCreate } from '@educi/types';
import { EntPerformanceDashboardNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPerformanceDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPerformanceDashboard(schoolId: string, id: string): Promise<PerformanceDashboard> {
    const item = await this.repo.findPerformanceDashboardById(schoolId, id);
    if (!item) throw new EntPerformanceDashboardNotFoundError(id);
    return item;
  }
  async listPerformanceDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<PerformanceDashboard[]> {
    return this.repo.findAllPerformanceDashboards(schoolId, filters);
  }
  async createPerformanceDashboard(schoolId: string, data: PerformanceDashboardCreate): Promise<PerformanceDashboard> {
    return this.repo.createPerformanceDashboard(schoolId, data);
  }
  async updatePerformanceDashboard(schoolId: string, id: string, data: Partial<PerformanceDashboardCreate>): Promise<PerformanceDashboard> {
    const existing = await this.repo.findPerformanceDashboardById(schoolId, id);
    if (!existing) throw new EntPerformanceDashboardNotFoundError(id);
    return this.repo.updatePerformanceDashboard(schoolId, id, data);
  }
  async deletePerformanceDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPerformanceDashboardById(schoolId, id);
    if (!existing) throw new EntPerformanceDashboardNotFoundError(id);
    return this.repo.deletePerformanceDashboard(schoolId, id);
  }
  async countPerformanceDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPerformanceDashboards(schoolId, filters);
  }
}
