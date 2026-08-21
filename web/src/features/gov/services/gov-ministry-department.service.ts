import type { SupabaseClient } from '@supabase/supabase-js';
import type { MinistryDepartment, MinistryDepartmentCreate } from '@educi/types';
import { GovMinistryDepartmentNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovMinistryDepartmentService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<MinistryDepartment> {
    const item = await this.repo.findMinistryDepartmentById(schoolId, id);
    if (!item) throw new GovMinistryDepartmentNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<MinistryDepartment[]> {
    return this.repo.findAllMinistryDepartments(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<MinistryDepartmentCreate>): Promise<MinistryDepartment> {
    return this.repo.createMinistryDepartment(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<MinistryDepartmentCreate>): Promise<MinistryDepartment> {
    const existing = await this.repo.findMinistryDepartmentById(schoolId, id);
    if (!existing) throw new GovMinistryDepartmentNotFoundError(id);
    return this.repo.updateMinistryDepartment(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMinistryDepartmentById(schoolId, id);
    if (!existing) throw new GovMinistryDepartmentNotFoundError(id);
    return this.repo.deleteMinistryDepartment(schoolId, id);
  }
}
