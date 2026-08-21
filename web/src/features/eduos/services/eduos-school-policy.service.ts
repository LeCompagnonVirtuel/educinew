import type { SupabaseClient } from '@supabase/supabase-js';
import type { SchoolPolicy } from '@educi/types';
import { EduOSSchoolPolicyError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSSchoolPolicyService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getSchoolPolicy(schoolId: string, id: string): Promise<SchoolPolicy> {
    const item = await this.repo.getSchoolPolicy(schoolId, id);
    if (!item) throw new EduOSSchoolPolicyError(id);
    return item;
  }
  async listSchoolPolicys(schoolId: string, filters?: Record<string, unknown>): Promise<SchoolPolicy[]> {
    return this.repo.listSchoolPolicys(schoolId, filters);
  }
  async createSchoolPolicy(schoolId: string, data: Partial<SchoolPolicy>): Promise<SchoolPolicy> {
    return this.repo.createSchoolPolicy(schoolId, data as any);
  }
  async updateSchoolPolicy(schoolId: string, id: string, data: Partial<SchoolPolicy>): Promise<SchoolPolicy> {
    const existing = await this.repo.getSchoolPolicy(schoolId, id);
    if (!existing) throw new EduOSSchoolPolicyError(id);
    return this.repo.updateSchoolPolicy(schoolId, id, data as any);
  }
  async deleteSchoolPolicy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getSchoolPolicy(schoolId, id);
    if (!existing) throw new EduOSSchoolPolicyError(id);
    return this.repo.deleteSchoolPolicy(schoolId, id);
  }
}

