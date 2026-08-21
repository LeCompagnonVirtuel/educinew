import type { SupabaseClient } from '@supabase/supabase-js';
import type { GraduateRegistry } from '@educi/types';
import { EduOSGraduateRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSGraduateRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getGraduateRegistry(schoolId: string, id: string): Promise<GraduateRegistry> {
    const item = await this.repo.getGraduateRegistry(schoolId, id);
    if (!item) throw new EduOSGraduateRegistryError(id);
    return item;
  }
  async listGraduateRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<GraduateRegistry[]> {
    return this.repo.listGraduateRegistries(schoolId, filters);
  }
  async createGraduateRegistry(schoolId: string, data: Partial<GraduateRegistry>): Promise<GraduateRegistry> {
    return this.repo.createGraduateRegistry(schoolId, data as any);
  }
  async updateGraduateRegistry(schoolId: string, id: string, data: Partial<GraduateRegistry>): Promise<GraduateRegistry> {
    const existing = await this.repo.getGraduateRegistry(schoolId, id);
    if (!existing) throw new EduOSGraduateRegistryError(id);
    return this.repo.updateGraduateRegistry(schoolId, id, data as any);
  }
  async deleteGraduateRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGraduateRegistry(schoolId, id);
    if (!existing) throw new EduOSGraduateRegistryError(id);
    return this.repo.deleteGraduateRegistry(schoolId, id);
  }
}


