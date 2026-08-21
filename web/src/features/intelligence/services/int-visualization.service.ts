// Intelligence Platform Service - Visualization
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Visualization, VisualizationCreate } from '@educi/types';
import { IntVisualizationNotFoundError } from '@educi/errors';
import { createIntelligenceRepository, IntelligenceRepository } from '../repositories/intelligence.repository';

export class IntVisualizationService {
  private repo: IntelligenceRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getVisualization(schoolId: string, id: string): Promise<Visualization> {
    const item = await this.repo.getVisualization(id, schoolId);
    if (!item) throw new IntVisualizationNotFoundError(id);
    return item;
  }
  async listVisualizations(schoolId: string, filters?: Record<string, unknown>): Promise<Visualization[]> {
    return this.repo.listVisualizations(schoolId, filters);
  }
  async createVisualization(schoolId: string, data: VisualizationCreate): Promise<Visualization> {
    return this.repo.createVisualization({ ...data, school_id: schoolId });
  }
  async updateVisualization(schoolId: string, id: string, data: Partial<VisualizationCreate>): Promise<Visualization> {
    const existing = await this.repo.getVisualization(id, schoolId);
    if (!existing) throw new IntVisualizationNotFoundError(id);
    return this.repo.updateVisualization(id, schoolId, data);
  }
  async deleteVisualization(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getVisualization(id, schoolId);
    if (!existing) throw new IntVisualizationNotFoundError(id);
    return this.repo.deleteVisualization(id, schoolId);
  }
}
