import type { SupabaseClient } from '@supabase/supabase-js';
import type { EmployerRegistry } from '@educi/types';
import { EduOSEmployerRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSEmployerRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getEmployerRegistry(schoolId: string, id: string): Promise<EmployerRegistry> {
    const item = await this.repo.getEmployerRegistry(schoolId, id);
    if (!item) throw new EduOSEmployerRegistryError(id);
    return item;
  }
  async listEmployerRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<EmployerRegistry[]> {
    return this.repo.listEmployerRegistries(schoolId, filters);
  }
  async createEmployerRegistry(schoolId: string, data: Partial<EmployerRegistry>): Promise<EmployerRegistry> {
    return this.repo.createEmployerRegistry(schoolId, data as any);
  }
  async updateEmployerRegistry(schoolId: string, id: string, data: Partial<EmployerRegistry>): Promise<EmployerRegistry> {
    const existing = await this.repo.getEmployerRegistry(schoolId, id);
    if (!existing) throw new EduOSEmployerRegistryError(id);
    return this.repo.updateEmployerRegistry(schoolId, id, data as any);
  }
  async deleteEmployerRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getEmployerRegistry(schoolId, id);
    if (!existing) throw new EduOSEmployerRegistryError(id);
    return this.repo.deleteEmployerRegistry(schoolId, id);
  }
}


