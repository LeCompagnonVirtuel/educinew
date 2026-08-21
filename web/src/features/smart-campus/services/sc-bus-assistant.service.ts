import type { SupabaseClient } from '@supabase/supabase-js';
import type { BusAssistant, BusAssistantCreate } from '@educi/types';
import { ScAssistantNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScBusAssistantService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAssistant(schoolId: string, id: string): Promise<BusAssistant> {
    const assistant = await this.repo.findBusAssistantById(schoolId, id);
    if (!assistant) throw new ScAssistantNotFoundError(id);
    return assistant;
  }

  async listAssistants(schoolId: string, filters?: Record<string, unknown>): Promise<BusAssistant[]> {
    return this.repo.findAllBusAssistants(schoolId, filters);
  }

  async createAssistant(schoolId: string, data: BusAssistantCreate): Promise<BusAssistant> {
    return this.repo.createBusAssistant(schoolId, data);
  }

  async updateAssistant(schoolId: string, id: string, data: Partial<BusAssistantCreate>): Promise<BusAssistant> {
    const existing = await this.repo.findBusAssistantById(schoolId, id);
    if (!existing) throw new ScAssistantNotFoundError(id);
    return this.repo.updateBusAssistant(schoolId, id, data);
  }

  async deleteAssistant(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findBusAssistantById(schoolId, id);
    if (!existing) throw new ScAssistantNotFoundError(id);
    return this.repo.deleteBusAssistant(schoolId, id);
  }

  async countAssistants(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countBusAssistants(schoolId, filters);
  }
}
