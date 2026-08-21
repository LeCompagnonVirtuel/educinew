import type { SupabaseClient } from '@supabase/supabase-js';
import type { ContainerRegistry } from '@educi/types';
import { EduCloudContainerRegistryError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudContainerRegistry {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getContainerRegistry(schoolId: string, id: string): Promise<ContainerRegistry> {
    const item = await this.repo.getContainerRegistry(schoolId, id);
    if (!item) throw new EduCloudContainerRegistryError(id);
    return item;
  }
  async listContainerRegistrys(schoolId: string, filters?: Record<string, unknown>): Promise<ContainerRegistry[]> {
    return this.repo.listContainerRegistry(schoolId, filters);
  }
  async createContainerRegistry(schoolId: string, data: Partial<ContainerRegistry>): Promise<ContainerRegistry> {
    return this.repo.createContainerRegistry(schoolId, data as any);
  }
  async updateContainerRegistry(schoolId: string, id: string, data: Partial<ContainerRegistry>): Promise<ContainerRegistry> {
    const existing = await this.repo.getContainerRegistry(schoolId, id);
    if (!existing) throw new EduCloudContainerRegistryError(id);
    return this.repo.updateContainerRegistry(schoolId, id, data as any);
  }
  async deleteContainerRegistry(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getContainerRegistry(schoolId, id);
    if (!existing) throw new EduCloudContainerRegistryError(id);
    return this.repo.deleteContainerRegistry(schoolId, id);
  }
}
