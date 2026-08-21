// Enterprise Platform Service - TestDashboard
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { TestDashboard, TestDashboardCreate } from '@educi/types';
import { EntTestDashboardNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTestDashboardService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTestDashboard(schoolId: string, id: string): Promise<TestDashboard> {
    const item = await this.repo.findTestDashboardById(schoolId, id);
    if (!item) throw new EntTestDashboardNotFoundError(id);
    return item;
  }
  async listTestDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<TestDashboard[]> {
    return this.repo.findAllTestDashboards(schoolId, filters);
  }
  async createTestDashboard(schoolId: string, data: TestDashboardCreate): Promise<TestDashboard> {
    return this.repo.createTestDashboard(schoolId, data);
  }
  async updateTestDashboard(schoolId: string, id: string, data: Partial<TestDashboardCreate>): Promise<TestDashboard> {
    const existing = await this.repo.findTestDashboardById(schoolId, id);
    if (!existing) throw new EntTestDashboardNotFoundError(id);
    return this.repo.updateTestDashboard(schoolId, id, data);
  }
  async deleteTestDashboard(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTestDashboardById(schoolId, id);
    if (!existing) throw new EntTestDashboardNotFoundError(id);
    return this.repo.deleteTestDashboard(schoolId, id);
  }
  async countTestDashboards(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTestDashboards(schoolId, filters);
  }
}
