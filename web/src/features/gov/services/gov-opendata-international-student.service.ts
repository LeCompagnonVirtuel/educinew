import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternationalStudent, InternationalStudentCreate } from '@educi/types';
import { GovInternationalStudentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovOpendataInternationalStudentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InternationalStudent> {
    const item = await this.repo.findInternationalStudentById(schoolId, id);
    if (!item) throw new GovInternationalStudentNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InternationalStudent[]> {
    return this.repo.findAllInternationalStudents(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InternationalStudentCreate>): Promise<InternationalStudent> {
    return this.repo.createInternationalStudent(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InternationalStudentCreate>): Promise<InternationalStudent> {
    const existing = await this.repo.findInternationalStudentById(schoolId, id);
    if (!existing) throw new GovInternationalStudentNotFoundError(id);
    return this.repo.updateInternationalStudent(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInternationalStudentById(schoolId, id);
    if (!existing) throw new GovInternationalStudentNotFoundError(id);
    return this.repo.deleteInternationalStudent(schoolId, id);
  }
}
