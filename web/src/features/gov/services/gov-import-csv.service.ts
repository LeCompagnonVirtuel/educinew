// Government & National Governance Service - ImportCsv
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ImportCsv, ImportCsvCreate } from '@educi/types';
import { GovImportCsvNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovImportCsvService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getImportCsv(schoolId: string, id: string): Promise<ImportCsv> {
    const item = await this.repo.findImportCsvById(schoolId, id);
    if (!item) throw new GovImportCsvNotFoundError(id);
    return item;
  }

  async listImportCsvs(schoolId: string, filters?: Record<string, unknown>): Promise<ImportCsv[]> {
    return this.repo.findAllImportCsvs(schoolId, filters);
  }

  async createImportCsv(schoolId: string, data: ImportCsvCreate): Promise<ImportCsv> {
    return this.repo.createImportCsv(schoolId, data);
  }

  async updateImportCsv(schoolId: string, id: string, data: Partial<ImportCsvCreate>): Promise<ImportCsv> {
    const existing = await this.repo.findImportCsvById(schoolId, id);
    if (!existing) throw new GovImportCsvNotFoundError(id);
    return this.repo.updateImportCsv(schoolId, id, data);
  }

  async deleteImportCsv(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findImportCsvById(schoolId, id);
    if (!existing) throw new GovImportCsvNotFoundError(id);
    return this.repo.deleteImportCsv(schoolId, id);
  }

  async countImportCsvs(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countImportCsvs(schoolId, filters);
  }
}
