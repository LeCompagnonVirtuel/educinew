// Enterprise Platform Service - IncidentPostmortem
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IncidentPostmortem, IncidentPostmortemCreate } from '@educi/types';
import { EntIncidentPostmortemNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntIncidentPostmortemService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getIncidentPostmortem(schoolId: string, id: string): Promise<IncidentPostmortem> {
    const item = await this.repo.findIncidentPostmortemById(schoolId, id);
    if (!item) throw new EntIncidentPostmortemNotFoundError(id);
    return item;
  }
  async listIncidentPostmortems(schoolId: string, filters?: Record<string, unknown>): Promise<IncidentPostmortem[]> {
    return this.repo.findAllIncidentPostmortems(schoolId, filters);
  }
  async createIncidentPostmortem(schoolId: string, data: IncidentPostmortemCreate): Promise<IncidentPostmortem> {
    return this.repo.createIncidentPostmortem(schoolId, data);
  }
  async updateIncidentPostmortem(schoolId: string, id: string, data: Partial<IncidentPostmortemCreate>): Promise<IncidentPostmortem> {
    const existing = await this.repo.findIncidentPostmortemById(schoolId, id);
    if (!existing) throw new EntIncidentPostmortemNotFoundError(id);
    return this.repo.updateIncidentPostmortem(schoolId, id, data);
  }
  async deleteIncidentPostmortem(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findIncidentPostmortemById(schoolId, id);
    if (!existing) throw new EntIncidentPostmortemNotFoundError(id);
    return this.repo.deleteIncidentPostmortem(schoolId, id);
  }
  async countIncidentPostmortems(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countIncidentPostmortems(schoolId, filters);
  }
}
