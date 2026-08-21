import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceScan } from '@educi/types';
import { EduCloudComplianceScanError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudComplianceScan {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getComplianceScan(schoolId: string, id: string): Promise<ComplianceScan> {
    const item = await this.repo.getComplianceScan(schoolId, id);
    if (!item) throw new EduCloudComplianceScanError(id);
    return item;
  }
  async listComplianceScans(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceScan[]> {
    return this.repo.listComplianceScan(schoolId, filters);
  }
  async createComplianceScan(schoolId: string, data: Partial<ComplianceScan>): Promise<ComplianceScan> {
    return this.repo.createComplianceScan(schoolId, data as any);
  }
  async updateComplianceScan(schoolId: string, id: string, data: Partial<ComplianceScan>): Promise<ComplianceScan> {
    const existing = await this.repo.getComplianceScan(schoolId, id);
    if (!existing) throw new EduCloudComplianceScanError(id);
    return this.repo.updateComplianceScan(schoolId, id, data as any);
  }
  async deleteComplianceScan(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getComplianceScan(schoolId, id);
    if (!existing) throw new EduCloudComplianceScanError(id);
    return this.repo.deleteComplianceScan(schoolId, id);
  }
}
