import type { SupabaseClient } from '@supabase/supabase-js';
import type { AiMonitor, AiMonitorQuery, AiMonitorCreate, AiMonitorUpdate } from '@educi/types';
import { AiMonitorNotFoundError } from '@educi/errors';
import { AiRepository } from '../repositories/ai.repository';

export class AiMonitorService {
  private repo: AiRepository;

  constructor(private supabase: SupabaseClient) { this.repo = new AiRepository(supabase); }

  async getMonitor(schoolId: string, id: string): Promise<AiMonitor> {
    const monitor = await this.repo.findById(schoolId, id);
    if (!monitor) throw new AiMonitorNotFoundError(id);
    return monitor;
  }

  async listMonitors(schoolId: string, query: AiMonitorQuery): Promise<AiMonitor[]> {
    return this.repo.findAll(schoolId, query);
  }

  async createMonitor(schoolId: string, data: AiMonitorCreate): Promise<AiMonitor> {
    return this.repo.create(schoolId, data);
  }

  async updateMonitor(schoolId: string, id: string, data: AiMonitorUpdate): Promise<AiMonitor> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiMonitorNotFoundError(id);
    return this.repo.update(schoolId, id, data);
  }

  async deleteMonitor(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findById(schoolId, id);
    if (!existing) throw new AiMonitorNotFoundError(id);
    return this.repo.delete(schoolId, id);
  }
}
