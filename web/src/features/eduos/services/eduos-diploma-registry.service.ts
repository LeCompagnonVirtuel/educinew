import type { SupabaseClient } from '@supabase/supabase-js';
import type { DiplomaRegistry } from '@educi/types';
import { EduOSDiplomaRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSDiplomaRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getDiplomaRegistry(schoolId: string, id: string): Promise<DiplomaRegistry> {
    const item = await this.repo.getDiplomaRegistry(schoolId, id);
    if (!item) throw new EduOSDiplomaRegistryError(id);
    return item;
  }
  async listDiplomaRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<DiplomaRegistry[]> {
    return this.repo.listDiplomaRegistries(schoolId, filters);
  }
  async createDiplomaRegistry(schoolId: string, data: Partial<DiplomaRegistry>): Promise<DiplomaRegistry> {
    return this.repo.createDiplomaRegistry(schoolId, data as any);
  }
  async updateDiplomaRegistry(schoolId: string, id: string, data: Partial<DiplomaRegistry>): Promise<DiplomaRegistry> {
    const existing = await this.repo.getDiplomaRegistry(schoolId, id);
    if (!existing) throw new EduOSDiplomaRegistryError(id);
    return this.repo.updateDiplomaRegistry(schoolId, id, data as any);
  }
  async deleteDiplomaRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getDiplomaRegistry(schoolId, id);
    if (!existing) throw new EduOSDiplomaRegistryError(id);
    return this.repo.deleteDiplomaRegistry(schoolId, id);
  }
}


