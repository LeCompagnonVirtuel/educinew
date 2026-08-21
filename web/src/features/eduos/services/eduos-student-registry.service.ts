import type { SupabaseClient } from '@supabase/supabase-js';
import type { StudentRegistry } from '@educi/types';
import { EduOSStudentRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSStudentRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getStudentRegistry(schoolId: string, id: string): Promise<StudentRegistry> {
    const item = await this.repo.getStudentRegistry(schoolId, id);
    if (!item) throw new EduOSStudentRegistryError(id);
    return item;
  }
  async listStudentRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<StudentRegistry[]> {
    return this.repo.listStudentRegistries(schoolId, filters);
  }
  async createStudentRegistry(schoolId: string, data: Partial<StudentRegistry>): Promise<StudentRegistry> {
    return this.repo.createStudentRegistry(schoolId, data as any);
  }
  async updateStudentRegistry(schoolId: string, id: string, data: Partial<StudentRegistry>): Promise<StudentRegistry> {
    const existing = await this.repo.getStudentRegistry(schoolId, id);
    if (!existing) throw new EduOSStudentRegistryError(id);
    return this.repo.updateStudentRegistry(schoolId, id, data as any);
  }
  async deleteStudentRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStudentRegistry(schoolId, id);
    if (!existing) throw new EduOSStudentRegistryError(id);
    return this.repo.deleteStudentRegistry(schoolId, id);
  }
}


