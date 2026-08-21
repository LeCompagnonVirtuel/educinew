// Intelligence Platform Service - IntelligenceConnector
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceConnector, IntelligenceConnectorCreate } from '@educi/types';
import { IntConnectorNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntConnectorService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getConnector(schoolId: string, id: string): Promise<IntelligenceConnector> {
    const item = await this.repo.getConnector(id, schoolId);
    if (!item) throw new IntConnectorNotFoundError(id);
    return item;
  }
  async listConnectors(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceConnector[]> {
    return this.repo.listConnectors(schoolId, filters);
  }
  async createConnector(schoolId: string, data: IntelligenceConnectorCreate): Promise<IntelligenceConnector> {
    return this.repo.createConnector({ ...data, school_id: schoolId });
  }
  async updateConnector(schoolId: string, id: string, data: Partial<IntelligenceConnectorCreate>): Promise<IntelligenceConnector> {
    const existing = await this.repo.getConnector(id, schoolId);
    if (!existing) throw new IntConnectorNotFoundError(id);
    return this.repo.updateConnector(id, schoolId, data);
  }
  async deleteConnector(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getConnector(id, schoolId);
    if (!existing) throw new IntConnectorNotFoundError(id);
    return this.repo.deleteConnector(id, schoolId);
  }
}
