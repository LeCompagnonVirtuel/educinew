import type { SupabaseClient } from '@supabase/supabase-js';
import type { InternalControl } from '@educi/types';
import { EduOSInternalControlError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSInternalControlService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getInternalControl(schoolId: string, id: string): Promise<InternalControl> {
    const item = await this.repo.getInternalControl(schoolId, id);
    if (!item) throw new EduOSInternalControlError(id);
    return item;
  }
  async listInternalControls(schoolId: string, filters?: Record<string, unknown>): Promise<InternalControl[]> {
    return this.repo.listInternalControls(schoolId, filters);
  }
  async createInternalControl(schoolId: string, data: Partial<InternalControl>): Promise<InternalControl> {
    return this.repo.createInternalControl(schoolId, data as any);
  }
  async updateInternalControl(schoolId: string, id: string, data: Partial<InternalControl>): Promise<InternalControl> {
    const existing = await this.repo.getInternalControl(schoolId, id);
    if (!existing) throw new EduOSInternalControlError(id);
    return this.repo.updateInternalControl(schoolId, id, data as any);
  }
  async deleteInternalControl(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getInternalControl(schoolId, id);
    if (!existing) throw new EduOSInternalControlError(id);
    return this.repo.deleteInternalControl(schoolId, id);
  }
}

