// Enterprise Platform Service - ErrorDashboard
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ErrorDashboard, ErrorDashboardCreate } from '@educi/types';
import { EntErrorDashboardNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntErrorDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getErrorDashboard(schoolId: string, id: string): Promise<ErrorDashboard> {
    const item = await this.repo.findErrorDashboardById(schoolId, id);
    if (!item) throw new EntErrorDashboardNotFoundError(id);
    return item;
  }
  async listErrorDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<ErrorDashboard[]> {
    return this.repo.findAllErrorDashboards(schoolId, filters);
  }
  async createErrorDashboard(schoolId: string, data: ErrorDashboardCreate): Promise<ErrorDashboard> {
    return this.repo.createErrorDashboard(schoolId, data);
  }
  async updateErrorDashboard(schoolId: string, id: string, data: Partial<ErrorDashboardCreate>): Promise<ErrorDashboard> {
    const existing = await this.repo.findErrorDashboardById(schoolId, id);
    if (!existing) throw new EntErrorDashboardNotFoundError(id);
    return this.repo.updateErrorDashboard(schoolId, id, data);
  }
  async deleteErrorDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findErrorDashboardById(schoolId, id);
    if (!existing) throw new EntErrorDashboardNotFoundError(id);
    return this.repo.deleteErrorDashboard(schoolId, id);
  }
  async countErrorDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countErrorDashboards(schoolId, filters);
  }
}
