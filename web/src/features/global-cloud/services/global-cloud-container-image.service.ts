import type { SupabaseClient } from '@supabase/supabase-js';
import type { ContainerImage } from '@educi/types';
import { EduCloudContainerImageError } from '@educi/errors';
import { createGlobalCloudRepository, GlobalCloudRepository } from '../repositories/global-cloud.repository';

export class GlobalCloudContainerImage {
  private repo: GlobalCloudRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createGlobalCloudRepository(supabase);
  }
  async getContainerImage(schoolId: string, id: string): Promise<ContainerImage> {
    const item = await this.repo.getContainerImage(schoolId, id);
    if (!item) throw new EduCloudContainerImageError(id);
    return item;
  }
  async listContainerImages(schoolId: string, filters?: Record<string, unknown>): Promise<ContainerImage[]> {
    return this.repo.listContainerImage(schoolId, filters);
  }
  async createContainerImage(schoolId: string, data: Partial<ContainerImage>): Promise<ContainerImage> {
    return this.repo.createContainerImage(schoolId, data as any);
  }
  async updateContainerImage(schoolId: string, id: string, data: Partial<ContainerImage>): Promise<ContainerImage> {
    const existing = await this.repo.getContainerImage(schoolId, id);
    if (!existing) throw new EduCloudContainerImageError(id);
    return this.repo.updateContainerImage(schoolId, id, data as any);
  }
  async deleteContainerImage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getContainerImage(schoolId, id);
    if (!existing) throw new EduCloudContainerImageError(id);
    return this.repo.deleteContainerImage(schoolId, id);
  }
}
