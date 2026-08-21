import type { SupabaseClient } from '@supabase/supabase-js';
import type { HealthManager } from '@educi/types';
import { EduOSHealthManagerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSHealthManagerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getHealthManager(schoolId: string, id: string): Promise<HealthManager> {
    const item = await this.repo.getHealthManager(schoolId, id);
    if (!item) throw new EduOSHealthManagerError(id);
    return item;
  }
  async listHealthManagers(schoolId: string, filters?: Record<string, unknown>): Promise<HealthManager[]> {
    return this.repo.listHealthManagers(schoolId, filters);
  }
  async createHealthManager(schoolId: string, data: Partial<HealthManager>): Promise<HealthManager> {
    return this.repo.createHealthManager(schoolId, data as any);
  }
  async updateHealthManager(schoolId: string, id: string, data: Partial<HealthManager>): Promise<HealthManager> {
    const existing = await this.repo.getHealthManager(schoolId, id);
    if (!existing) throw new EduOSHealthManagerError(id);
    return this.repo.updateHealthManager(schoolId, id, data as any);
  }
  async deleteHealthManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getHealthManager(schoolId, id);
    if (!existing) throw new EduOSHealthManagerError(id);
    return this.repo.deleteHealthManager(schoolId, id);
  }
}

