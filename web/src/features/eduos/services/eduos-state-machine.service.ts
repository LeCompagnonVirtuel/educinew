import type { SupabaseClient } from '@supabase/supabase-js';
import type { StateMachine } from '@educi/types';
import { EduOSStateMachineError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSStateMachineService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getStateMachine(schoolId: string, id: string): Promise<StateMachine> {
    const item = await this.repo.getStateMachine(schoolId, id);
    if (!item) throw new EduOSStateMachineError(id);
    return item;
  }
  async listStateMachines(schoolId: string, filters?: Record<string, unknown>): Promise<StateMachine[]> {
    return this.repo.listStateMachines(schoolId, filters);
  }
  async createStateMachine(schoolId: string, data: Partial<StateMachine>): Promise<StateMachine> {
    return this.repo.createStateMachine(schoolId, data as any);
  }
  async updateStateMachine(schoolId: string, id: string, data: Partial<StateMachine>): Promise<StateMachine> {
    const existing = await this.repo.getStateMachine(schoolId, id);
    if (!existing) throw new EduOSStateMachineError(id);
    return this.repo.updateStateMachine(schoolId, id, data as any);
  }
  async deleteStateMachine(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getStateMachine(schoolId, id);
    if (!existing) throw new EduOSStateMachineError(id);
    return this.repo.deleteStateMachine(schoolId, id);
  }
}

