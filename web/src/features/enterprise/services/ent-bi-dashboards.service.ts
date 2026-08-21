// Enterprise Platform Service - BiDashboards
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntBiDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getBiDashboard(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findBiDashboardById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listBiDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllBiDashboards(schoolId, filters);
  }
  async createBiDashboard(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createBiDashboard(schoolId, data);
  }
  async updateBiDashboard(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findBiDashboardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateBiDashboard(schoolId, id, data);
  }
  async deleteBiDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBiDashboardById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteBiDashboard(schoolId, id);
  }
  async countBiDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBiDashboards(schoolId, filters);
  }
}
