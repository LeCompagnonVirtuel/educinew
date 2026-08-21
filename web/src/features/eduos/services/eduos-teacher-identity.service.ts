import type { SupabaseClient } from '@supabase/supabase-js';
import type { TeacherIdentity } from '@educi/types';
import { EduOSTeacherIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSTeacherIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getTeacherIdentity(schoolId: string, id: string): Promise<TeacherIdentity> {
    const item = await this.repo.getTeacherIdentity(schoolId, id);
    if (!item) throw new EduOSTeacherIdentityError(id);
    return item;
  }
  async listTeacherIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<TeacherIdentity[]> {
    return this.repo.listTeacherIdentities(schoolId, filters);
  }
  async createTeacherIdentity(schoolId: string, data: Partial<TeacherIdentity>): Promise<TeacherIdentity> {
    return this.repo.createTeacherIdentity(schoolId, data as any);
  }
  async updateTeacherIdentity(schoolId: string, id: string, data: Partial<TeacherIdentity>): Promise<TeacherIdentity> {
    const existing = await this.repo.getTeacherIdentity(schoolId, id);
    if (!existing) throw new EduOSTeacherIdentityError(id);
    return this.repo.updateTeacherIdentity(schoolId, id, data as any);
  }
  async deleteTeacherIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getTeacherIdentity(schoolId, id);
    if (!existing) throw new EduOSTeacherIdentityError(id);
    return this.repo.deleteTeacherIdentity(schoolId, id);
  }
}


