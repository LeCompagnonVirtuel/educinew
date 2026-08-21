// Enterprise Platform Service - PlatformExport
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { PlatformExport, PlatformExportCreate } from '@educi/types';
import { EntPlatformExportNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntPlatformExportService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getPlatformExport(schoolId: string, id: string): Promise<PlatformExport> {
    const item = await this.repo.findPlatformExportById(schoolId, id);
    if (!item) throw new EntPlatformExportNotFoundError(id);
    return item;
  }
  async listPlatformExports(schoolId: string, filters?: Record<string, unknown>): Promise<PlatformExport[]> {
    return this.repo.findAllPlatformExports(schoolId, filters);
  }
  async createPlatformExport(schoolId: string, data: PlatformExportCreate): Promise<PlatformExport> {
    return this.repo.createPlatformExport(schoolId, data);
  }
  async updatePlatformExport(schoolId: string, id: string, data: Partial<PlatformExportCreate>): Promise<PlatformExport> {
    const existing = await this.repo.findPlatformExportById(schoolId, id);
    if (!existing) throw new EntPlatformExportNotFoundError(id);
    return this.repo.updatePlatformExport(schoolId, id, data);
  }
  async deletePlatformExport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findPlatformExportById(schoolId, id);
    if (!existing) throw new EntPlatformExportNotFoundError(id);
    return this.repo.deletePlatformExport(schoolId, id);
  }
  async countPlatformExports(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countPlatformExports(schoolId, filters);
  }
}
