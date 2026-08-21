import type { SupabaseClient } from '@supabase/supabase-js';
import type { TeacherRegistry } from '@educi/types';
import { EduOSTeacherRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSTeacherRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getTeacherRegistry(schoolId: string, id: string): Promise<TeacherRegistry> {
    const item = await this.repo.getTeacherRegistry(schoolId, id);
    if (!item) throw new EduOSTeacherRegistryError(id);
    return item;
  }
  async listTeacherRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherRegistry[]> {
    return this.repo.listTeacherRegistries(schoolId, filters);
  }
  async createTeacherRegistry(schoolId: string, data: Partial<TeacherRegistry>): Promise<TeacherRegistry> {
    return this.repo.createTeacherRegistry(schoolId, data as any);
  }
  async updateTeacherRegistry(schoolId: string, id: string, data: Partial<TeacherRegistry>): Promise<TeacherRegistry> {
    const existing = await this.repo.getTeacherRegistry(schoolId, id);
    if (!existing) throw new EduOSTeacherRegistryError(id);
    return this.repo.updateTeacherRegistry(schoolId, id, data as any);
  }
  async deleteTeacherRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTeacherRegistry(schoolId, id);
    if (!existing) throw new EduOSTeacherRegistryError(id);
    return this.repo.deleteTeacherRegistry(schoolId, id);
  }
}


