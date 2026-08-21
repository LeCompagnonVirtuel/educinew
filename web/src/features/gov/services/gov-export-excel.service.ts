// Government & National Governance Service - ExportExcel
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExportExcel, ExportExcelCreate } from '@educi/types';
import { GovExportExcelNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExportExcelService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExportExcel(schoolId: string, id: string): Promise<ExportExcel> {
    const item = await this.repo.findExportExcelById(schoolId, id);
    if (!item) throw new GovExportExcelNotFoundError(id);
    return item;
  }

  async listExportExcels(schoolId: string, filters?: Record<string, unknown>): Promise<ExportExcel[]> {
    return this.repo.findAllExportExcels(schoolId, filters);
  }

  async createExportExcel(schoolId: string, data: ExportExcelCreate): Promise<ExportExcel> {
    return this.repo.createExportExcel(schoolId, data);
  }

  async updateExportExcel(schoolId: string, id: string, data: Partial<ExportExcelCreate>): Promise<ExportExcel> {
    const existing = await this.repo.findExportExcelById(schoolId, id);
    if (!existing) throw new GovExportExcelNotFoundError(id);
    return this.repo.updateExportExcel(schoolId, id, data);
  }

  async deleteExportExcel(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExportExcelById(schoolId, id);
    if (!existing) throw new GovExportExcelNotFoundError(id);
    return this.repo.deleteExportExcel(schoolId, id);
  }

  async countExportExcels(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExportExcels(schoolId, filters);
  }
}
