// Enterprise Platform Service - PlatformDashboard
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformDashboard, PlatformDashboardCreate } from '@educi/types';
import { EntPlatformDashboardNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformDashboard(schoolId: string, id: string): Promise<PlatformDashboard> {
    const item = await this.repo.findPlatformDashboardById(schoolId, id);
    if (!item) throw new EntPlatformDashboardNotFoundError(id);
    return item;
  }
  async listPlatformDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformDashboard[]> {
    return this.repo.findAllPlatformDashboards(schoolId, filters);
  }
  async createPlatformDashboard(schoolId: string, data: PlatformDashboardCreate): Promise<PlatformDashboard> {
    return this.repo.createPlatformDashboard(schoolId, data);
  }
  async updatePlatformDashboard(schoolId: string, id: string, data: Partial<PlatformDashboardCreate>): Promise<PlatformDashboard> {
    const existing = await this.repo.findPlatformDashboardById(schoolId, id);
    if (!existing) throw new EntPlatformDashboardNotFoundError(id);
    return this.repo.updatePlatformDashboard(schoolId, id, data);
  }
  async deletePlatformDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformDashboardById(schoolId, id);
    if (!existing) throw new EntPlatformDashboardNotFoundError(id);
    return this.repo.deletePlatformDashboard(schoolId, id);
  }
  async countPlatformDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformDashboards(schoolId, filters);
  }
}
