import type { SupabaseClient } from '@supabase/supabase-js';
import type { StudentIdentity } from '@educi/types';
import { EduOSStudentIdentityError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSStudentIdentityService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getStudentIdentity(schoolId: string, id: string): Promise<StudentIdentity> {
    const item = await this.repo.getStudentIdentity(schoolId, id);
    if (!item) throw new EduOSStudentIdentityError(id);
    return item;
  }
  async listStudentIdentities(schoolId: string, filters?: Record<string, unknown>): Promise<StudentIdentity[]> {
    return this.repo.listStudentIdentities(schoolId, filters);
  }
  async createStudentIdentity(schoolId: string, data: Partial<StudentIdentity>): Promise<StudentIdentity> {
    return this.repo.createStudentIdentity(schoolId, data as any);
  }
  async updateStudentIdentity(schoolId: string, id: string, data: Partial<StudentIdentity>): Promise<StudentIdentity> {
    const existing = await this.repo.getStudentIdentity(schoolId, id);
    if (!existing) throw new EduOSStudentIdentityError(id);
    return this.repo.updateStudentIdentity(schoolId, id, data as any);
  }
  async deleteStudentIdentity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStudentIdentity(schoolId, id);
    if (!existing) throw new EduOSStudentIdentityError(id);
    return this.repo.deleteStudentIdentity(schoolId, id);
  }
}


