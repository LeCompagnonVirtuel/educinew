import type { SupabaseClient } from '@supabase/supabase-js';
import type { CloudIntegration } from '@educi/types';
import { EduOSCloudIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSCloudIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getCloudIntegration(schoolId: string, id: string): Promise<CloudIntegration> {
    const item = await this.repo.getCloudIntegration(schoolId, id);
    if (!item) throw new EduOSCloudIntegrationError(id);
    return item;
  }
  async listCloudIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<CloudIntegration[]> {
    return this.repo.listCloudIntegrations(schoolId, filters);
  }
  async createCloudIntegration(schoolId: string, data: Partial<CloudIntegration>): Promise<CloudIntegration> {
    return this.repo.createCloudIntegration(schoolId, data as any);
  }
  async updateCloudIntegration(schoolId: string, id: string, data: Partial<CloudIntegration>): Promise<CloudIntegration> {
    const existing = await this.repo.getCloudIntegration(schoolId, id);
    if (!existing) throw new EduOSCloudIntegrationError(id);
    return this.repo.updateCloudIntegration(schoolId, id, data as any);
  }
  async deleteCloudIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getCloudIntegration(schoolId, id);
    if (!existing) throw new EduOSCloudIntegrationError(id);
    return this.repo.deleteCloudIntegration(schoolId, id);
  }
}

