import type { SupabaseClient } from '@supabase/supabase-js';
import type { RuntimeManager } from '@educi/types';
import { EduOSRuntimeManagerError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSRuntimeManagerService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getRuntimeManager(schoolId: string, id: string): Promise<RuntimeManager> {
    const item = await this.repo.getRuntimeManager(schoolId, id);
    if (!item) throw new EduOSRuntimeManagerError(id);
    return item;
  }
  async listRuntimeManagers(schoolId: string, filters?: Record<string, unknown>): Promise<RuntimeManager[]> {
    return this.repo.listRuntimeManagers(schoolId, filters);
  }
  async createRuntimeManager(schoolId: string, data: Partial<RuntimeManager>): Promise<RuntimeManager> {
    return this.repo.createRuntimeManager(schoolId, data as any);
  }
  async updateRuntimeManager(schoolId: string, id: string, data: Partial<RuntimeManager>): Promise<RuntimeManager> {
    const existing = await this.repo.getRuntimeManager(schoolId, id);
    if (!existing) throw new EduOSRuntimeManagerError(id);
    return this.repo.updateRuntimeManager(schoolId, id, data as any);
  }
  async deleteRuntimeManager(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getRuntimeManager(schoolId, id);
    if (!existing) throw new EduOSRuntimeManagerError(id);
    return this.repo.deleteRuntimeManager(schoolId, id);
  }
}

