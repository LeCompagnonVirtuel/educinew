import type { SupabaseClient } from '@supabase/supabase-js';
import type { RegistryExport } from '@educi/types';
import { EduOSRegistryExportError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRegistryExportService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRegistryExport(schoolId: string, id: string): Promise<RegistryExport> {
    const item = await this.repo.getRegistryExport(schoolId, id);
    if (!item) throw new EduOSRegistryExportError(id);
    return item;
  }
  async listRegistryExports(schoolId: string, filters?: Record<string, unknown>): Promise<RegistryExport[]> {
    return this.repo.listRegistryExports(schoolId, filters);
  }
  async createRegistryExport(schoolId: string, data: Partial<RegistryExport>): Promise<RegistryExport> {
    return this.repo.createRegistryExport(schoolId, data as any);
  }
  async updateRegistryExport(schoolId: string, id: string, data: Partial<RegistryExport>): Promise<RegistryExport> {
    const existing = await this.repo.getRegistryExport(schoolId, id);
    if (!existing) throw new EduOSRegistryExportError(id);
    return this.repo.updateRegistryExport(schoolId, id, data as any);
  }
  async deleteRegistryExport(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRegistryExport(schoolId, id);
    if (!existing) throw new EduOSRegistryExportError(id);
    return this.repo.deleteRegistryExport(schoolId, id);
  }
}

