// Enterprise Platform Service - ContainerImage
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { ContainerImage, ContainerImageCreate } from '@educi/types';
import { EntContainerImageNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntContainerImageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getContainerImage(schoolId: string, id: string): Promise<ContainerImage> {
    const item = await this.repo.findContainerImageById(schoolId, id);
    if (!item) throw new EntContainerImageNotFoundError(id);
    return item;
  }
  async listContainerImages(schoolId: string, filters?: Record<string, unknown>): Promise<ContainerImage[]> {
    return this.repo.findAllContainerImages(schoolId, filters);
  }
  async createContainerImage(schoolId: string, data: ContainerImageCreate): Promise<ContainerImage> {
    return this.repo.createContainerImage(schoolId, data);
  }
  async updateContainerImage(schoolId: string, id: string, data: Partial<ContainerImageCreate>): Promise<ContainerImage> {
    const existing = await this.repo.findContainerImageById(schoolId, id);
    if (!existing) throw new EntContainerImageNotFoundError(id);
    return this.repo.updateContainerImage(schoolId, id, data);
  }
  async deleteContainerImage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findContainerImageById(schoolId, id);
    if (!existing) throw new EntContainerImageNotFoundError(id);
    return this.repo.deleteContainerImage(schoolId, id);
  }
  async countContainerImages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countContainerImages(schoolId, filters);
  }
}
