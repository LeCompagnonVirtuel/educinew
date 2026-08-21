import type { SupabaseClient } from '@supabase/supabase-js';
import type { GoogleClassroomIntegration } from '@educi/types';
import { EduOSGoogleClassroomIntegrationError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSGoogleClassroomIntegrationService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getGoogleClassroomIntegration(schoolId: string, id: string): Promise<GoogleClassroomIntegration> {
    const item = await this.repo.getGoogleClassroomIntegration(schoolId, id);
    if (!item) throw new EduOSGoogleClassroomIntegrationError(id);
    return item;
  }
  async listGoogleClassroomIntegrations(schoolId: string, filters?: Record<string, unknown>): Promise<GoogleClassroomIntegration[]> {
    return this.repo.listGoogleClassroomIntegrations(schoolId, filters);
  }
  async createGoogleClassroomIntegration(schoolId: string, data: Partial<GoogleClassroomIntegration>): Promise<GoogleClassroomIntegration> {
    return this.repo.createGoogleClassroomIntegration(schoolId, data as any);
  }
  async updateGoogleClassroomIntegration(schoolId: string, id: string, data: Partial<GoogleClassroomIntegration>): Promise<GoogleClassroomIntegration> {
    const existing = await this.repo.getGoogleClassroomIntegration(schoolId, id);
    if (!existing) throw new EduOSGoogleClassroomIntegrationError(id);
    return this.repo.updateGoogleClassroomIntegration(schoolId, id, data as any);
  }
  async deleteGoogleClassroomIntegration(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getGoogleClassroomIntegration(schoolId, id);
    if (!existing) throw new EduOSGoogleClassroomIntegrationError(id);
    return this.repo.deleteGoogleClassroomIntegration(schoolId, id);
  }
}

