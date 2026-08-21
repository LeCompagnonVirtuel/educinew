import type { SupabaseClient } from '@supabase/supabase-js';
import type { ComplianceCheck } from '@educi/types';
import { EduOSComplianceCheckError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSComplianceCheckService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getComplianceCheck(schoolId: string, id: string): Promise<ComplianceCheck> {
    const item = await this.repo.getComplianceCheck(schoolId, id);
    if (!item) throw new EduOSComplianceCheckError(id);
    return item;
  }
  async listComplianceChecks(schoolId: string, filters?: Record<string, unknown>): Promise<ComplianceCheck[]> {
    return this.repo.listComplianceChecks(schoolId, filters);
  }
  async createComplianceCheck(schoolId: string, data: Partial<ComplianceCheck>): Promise<ComplianceCheck> {
    return this.repo.createComplianceCheck(schoolId, data as any);
  }
  async updateComplianceCheck(schoolId: string, id: string, data: Partial<ComplianceCheck>): Promise<ComplianceCheck> {
    const existing = await this.repo.getComplianceCheck(schoolId, id);
    if (!existing) throw new EduOSComplianceCheckError(id);
    return this.repo.updateComplianceCheck(schoolId, id, data as any);
  }
  async deleteComplianceCheck(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getComplianceCheck(schoolId, id);
    if (!existing) throw new EduOSComplianceCheckError(id);
    return this.repo.deleteComplianceCheck(schoolId, id);
  }
}

