// Enterprise Platform Service - CoverageDashboard
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { CoverageDashboard, CoverageDashboardCreate } from '@educi/types';
import { EntCoverageDashboardNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntCoverageDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getCoverageDashboard(schoolId: string, id: string): Promise<CoverageDashboard> {
    const item = await this.repo.findCoverageDashboardById(schoolId, id);
    if (!item) throw new EntCoverageDashboardNotFoundError(id);
    return item;
  }
  async listCoverageDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<CoverageDashboard[]> {
    return this.repo.findAllCoverageDashboards(schoolId, filters);
  }
  async createCoverageDashboard(schoolId: string, data: CoverageDashboardCreate): Promise<CoverageDashboard> {
    return this.repo.createCoverageDashboard(schoolId, data);
  }
  async updateCoverageDashboard(schoolId: string, id: string, data: Partial<CoverageDashboardCreate>): Promise<CoverageDashboard> {
    const existing = await this.repo.findCoverageDashboardById(schoolId, id);
    if (!existing) throw new EntCoverageDashboardNotFoundError(id);
    return this.repo.updateCoverageDashboard(schoolId, id, data);
  }
  async deleteCoverageDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findCoverageDashboardById(schoolId, id);
    if (!existing) throw new EntCoverageDashboardNotFoundError(id);
    return this.repo.deleteCoverageDashboard(schoolId, id);
  }
  async countCoverageDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countCoverageDashboards(schoolId, filters);
  }
}
