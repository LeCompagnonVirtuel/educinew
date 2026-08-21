import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegistryBulkImport } from '@educi/types';
import { EduOSRegistryBulkImportError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRegistryBulkImportService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRegistryBulkImport(schoolId: string, id: string): Promise<RegistryBulkImport> {
    const item = await this.repo.getRegistryBulkImport(schoolId, id);
    if (!item) throw new EduOSRegistryBulkImportError(id);
    return item;
  }
  async listRegistryBulkImports(schoolId: string, filters?: Record<string, unknown>): Promise<RegistryBulkImport[]> {
    return this.repo.listRegistryBulkImports(schoolId, filters);
  }
  async createRegistryBulkImport(schoolId: string, data: Partial<RegistryBulkImport>): Promise<RegistryBulkImport> {
    return this.repo.createRegistryBulkImport(schoolId, data as any);
  }
  async updateRegistryBulkImport(schoolId: string, id: string, data: Partial<RegistryBulkImport>): Promise<RegistryBulkImport> {
    const existing = await this.repo.getRegistryBulkImport(schoolId, id);
    if (!existing) throw new EduOSRegistryBulkImportError(id);
    return this.repo.updateRegistryBulkImport(schoolId, id, data as any);
  }
  async deleteRegistryBulkImport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRegistryBulkImport(schoolId, id);
    if (!existing) throw new EduOSRegistryBulkImportError(id);
    return this.repo.deleteRegistryBulkImport(schoolId, id);
  }
}

