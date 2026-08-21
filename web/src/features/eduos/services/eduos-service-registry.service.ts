import type { SupabaseClient } from '@supabase/supabase-js';
import type { ServiceRegistry } from '@educi/types';
import { EduOSServiceRegistryError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSServiceRegistryService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getServiceRegistry(schoolId: string, id: string): Promise<ServiceRegistry> {
    const item = await this.repo.getServiceRegistry(schoolId, id);
    if (!item) throw new EduOSServiceRegistryError(id);
    return item;
  }
  async listServiceRegistries(schoolId: string, filters?: Record<string, unknown>): Promise<ServiceRegistry[]> {
    return this.repo.listServiceRegistries(schoolId, filters);
  }
  async createServiceRegistry(schoolId: string, data: Partial<ServiceRegistry>): Promise<ServiceRegistry> {
    return this.repo.createServiceRegistry(schoolId, data as any);
  }
  async updateServiceRegistry(schoolId: string, id: string, data: Partial<ServiceRegistry>): Promise<ServiceRegistry> {
    const existing = await this.repo.getServiceRegistry(schoolId, id);
    if (!existing) throw new EduOSServiceRegistryError(id);
    return this.repo.updateServiceRegistry(schoolId, id, data as any);
  }
  async deleteServiceRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getServiceRegistry(schoolId, id);
    if (!existing) throw new EduOSServiceRegistryError(id);
    return this.repo.deleteServiceRegistry(schoolId, id);
  }
}


