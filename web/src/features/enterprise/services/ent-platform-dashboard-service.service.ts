// Enterprise Platform Service - PlatformDashboard
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformDashboard, PlatformDashboardCreate } from '@educi/types';
import { EntPlatformDashboardNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformDashboardServiceService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformDashboardService(schoolId: string, id: string): Promise<PlatformDashboard> {
    const item = await this.repo.findPlatformDashboardServiceById(schoolId, id);
    if (!item) throw new EntPlatformDashboardNotFoundError(id);
    return item;
  }
  async listPlatformDashboardServices(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformDashboard[]> {
    return this.repo.findAllPlatformDashboardServices(schoolId, filters);
  }
  async createPlatformDashboardService(schoolId: string, data: PlatformDashboardCreate): Promise<PlatformDashboard> {
    return this.repo.createPlatformDashboardService(schoolId, data);
  }
  async updatePlatformDashboardService(schoolId: string, id: string, data: Partial<PlatformDashboardCreate>): Promise<PlatformDashboard> {
    const existing = await this.repo.findPlatformDashboardServiceById(schoolId, id);
    if (!existing) throw new EntPlatformDashboardNotFoundError(id);
    return this.repo.updatePlatformDashboardService(schoolId, id, data);
  }
  async deletePlatformDashboardService(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformDashboardServiceById(schoolId, id);
    if (!existing) throw new EntPlatformDashboardNotFoundError(id);
    return this.repo.deletePlatformDashboardService(schoolId, id);
  }
  async countPlatformDashboardServices(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformDashboardServices(schoolId, filters);
  }
}
