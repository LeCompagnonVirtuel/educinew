// Government & National Governance Service - ExportPdf
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ExportPdf, ExportPdfCreate } from '@educi/types';
import { GovExportPdfNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovExportPdfService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getExportPdf(schoolId: string, id: string): Promise<ExportPdf> {
    const item = await this.repo.findExportPdfById(schoolId, id);
    if (!item) throw new GovExportPdfNotFoundError(id);
    return item;
  }

  async listExportPdfs(schoolId: string, filters?: Record<string, unknown>): Promise<ExportPdf[]> {
    return this.repo.findAllExportPdfs(schoolId, filters);
  }

  async createExportPdf(schoolId: string, data: ExportPdfCreate): Promise<ExportPdf> {
    return this.repo.createExportPdf(schoolId, data);
  }

  async updateExportPdf(schoolId: string, id: string, data: Partial<ExportPdfCreate>): Promise<ExportPdf> {
    const existing = await this.repo.findExportPdfById(schoolId, id);
    if (!existing) throw new GovExportPdfNotFoundError(id);
    return this.repo.updateExportPdf(schoolId, id, data);
  }

  async deleteExportPdf(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findExportPdfById(schoolId, id);
    if (!existing) throw new GovExportPdfNotFoundError(id);
    return this.repo.deleteExportPdf(schoolId, id);
  }

  async countExportPdfs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countExportPdfs(schoolId, filters);
  }
}
