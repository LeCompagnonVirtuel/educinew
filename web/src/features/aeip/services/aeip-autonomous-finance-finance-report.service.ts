import type { SupabaseClient } from '@supabase/supabase-js';
import type { FinanceReport } from '@educi/types';
import { AEIPAutonomousFinanceReportError } from '@educi/errors';
import { createAEIPRepository, AEIPRepository } from '../repositories/aeip.repository';

export class AEIPAutonomousFinanceReportService {
  private repo: AEIPRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createAEIPRepository(supabase);
  }
  async getReport(schoolId: string, id: string) { return this.repo.getEntity(id, schoolId); }
  async listReports(schoolId: string, filters?: Record<string, unknown>) { return this.repo.listEntities(schoolId, filters); }
  async createReport(schoolId: string, data: Partial<FinanceReport>) { return this.repo.createEntity({ ...data, school_id: schoolId } as any); }
  async updateReport(schoolId: string, id: string, data: Partial<FinanceReport>) { return this.repo.updateEntity(id, schoolId, data as any); }
  async deleteReport(schoolId: string, id: string) { return this.repo.deleteEntity(id, schoolId); }
}