import type { SupabaseClient } from '@supabase/supabase-js';
import type { Scholarship } from '@educi/types';
import { EduOSScholarshipError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSScholarshipService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getScholarship(schoolId: string, id: string): Promise<Scholarship> {
    const item = await this.repo.getScholarship(schoolId, id);
    if (!item) throw new EduOSScholarshipError(id);
    return item;
  }
  async listScholarships(schoolId: string, filters?: Record<string, unknown>): Promise<Scholarship[]> {
    return this.repo.listScholarships(schoolId, filters);
  }
  async createScholarship(schoolId: string, data: Partial<Scholarship>): Promise<Scholarship> {
    return this.repo.createScholarship(schoolId, data as any);
  }
  async updateScholarship(schoolId: string, id: string, data: Partial<Scholarship>): Promise<Scholarship> {
    const existing = await this.repo.getScholarship(schoolId, id);
    if (!existing) throw new EduOSScholarshipError(id);
    return this.repo.updateScholarship(schoolId, id, data as any);
  }
  async deleteScholarship(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getScholarship(schoolId, id);
    if (!existing) throw new EduOSScholarshipError(id);
    return this.repo.deleteScholarship(schoolId, id);
  }
}

