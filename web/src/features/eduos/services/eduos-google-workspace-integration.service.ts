import type { SupabaseClient } from '@supabase/supabase-js';
import type { GoogleWorkspaceIntegration } from '@educi/types';
import { EduOSGoogleWorkspaceIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSGoogleWorkspaceIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getGoogleWorkspaceIntegration(schoolId: string, id: string): Promise<GoogleWorkspaceIntegration> {
    const item = await this.repo.getGoogleWorkspaceIntegration(schoolId, id);
    if (!item) throw new EduOSGoogleWorkspaceIntegrationError(id);
    return item;
  }
  async listGoogleWorkspaceIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<GoogleWorkspaceIntegration[]> {
    return this.repo.listGoogleWorkspaceIntegrations(schoolId, filters);
  }
  async createGoogleWorkspaceIntegration(schoolId: string, data: Partial<GoogleWorkspaceIntegration>): Promise<GoogleWorkspaceIntegration> {
    return this.repo.createGoogleWorkspaceIntegration(schoolId, data as any);
  }
  async updateGoogleWorkspaceIntegration(schoolId: string, id: string, data: Partial<GoogleWorkspaceIntegration>): Promise<GoogleWorkspaceIntegration> {
    const existing = await this.repo.getGoogleWorkspaceIntegration(schoolId, id);
    if (!existing) throw new EduOSGoogleWorkspaceIntegrationError(id);
    return this.repo.updateGoogleWorkspaceIntegration(schoolId, id, data as any);
  }
  async deleteGoogleWorkspaceIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGoogleWorkspaceIntegration(schoolId, id);
    if (!existing) throw new EduOSGoogleWorkspaceIntegrationError(id);
    return this.repo.deleteGoogleWorkspaceIntegration(schoolId, id);
  }
}

