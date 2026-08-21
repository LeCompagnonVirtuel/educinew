import type { SupabaseClient } from '@supabase/supabase-js';
import type { NoCodeAction } from '@educi/types';
import { EduOSNoCodeActionError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSNoCodeActionService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getNoCodeAction(schoolId: string, id: string): Promise<NoCodeAction> {
    const item = await this.repo.getNoCodeAction(schoolId, id);
    if (!item) throw new EduOSNoCodeActionError(id);
    return item;
  }
  async listNoCodeActions(schoolId: string, filters?: Record<string, unknown>): Promise<NoCodeAction[]> {
    return this.repo.listNoCodeActions(schoolId, filters);
  }
  async createNoCodeAction(schoolId: string, data: Partial<NoCodeAction>): Promise<NoCodeAction> {
    return this.repo.createNoCodeAction(schoolId, data as any);
  }
  async updateNoCodeAction(schoolId: string, id: string, data: Partial<NoCodeAction>): Promise<NoCodeAction> {
    const existing = await this.repo.getNoCodeAction(schoolId, id);
    if (!existing) throw new EduOSNoCodeActionError(id);
    return this.repo.updateNoCodeAction(schoolId, id, data as any);
  }
  async deleteNoCodeAction(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getNoCodeAction(schoolId, id);
    if (!existing) throw new EduOSNoCodeActionError(id);
    return this.repo.deleteNoCodeAction(schoolId, id);
  }
}

