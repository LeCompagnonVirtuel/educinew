// Intelligence Platform Service - IntelligenceWidget
// Phase 3.1 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IntelligenceWidget, IntelligenceWidgetCreate } from '@educi/types';
import { IntWidgetNotFoundError } from '@educi/errors';
import { createIntelligenceRepository } from '../repositories/intelligence.repository';

export class IntWidgetService {
  private repo: ReturnType<typeof createIntelligenceRepository>;
  constructor(private supabase: SupabaseClient) {
    this.repo = createIntelligenceRepository(supabase);
  }
  async getWidget(schoolId: string, id: string): Promise<IntelligenceWidget> {
    const item = await this.repo.getWidget(id, schoolId);
    if (!item) throw new IntWidgetNotFoundError(id);
    return item;
  }
  async listWidgets(schoolId: string, filters?: Record<string, unknown>): Promise<IntelligenceWidget[]> {
    return this.repo.listWidgets(schoolId, filters);
  }
  async createWidget(schoolId: string, data: IntelligenceWidgetCreate): Promise<IntelligenceWidget> {
    return this.repo.createWidget({ ...data, school_id: schoolId });
  }
  async updateWidget(schoolId: string, id: string, data: Partial<IntelligenceWidgetCreate>): Promise<IntelligenceWidget> {
    const existing = await this.repo.getWidget(id, schoolId);
    if (!existing) throw new IntWidgetNotFoundError(id);
    return this.repo.updateWidget(id, schoolId, data);
  }
  async deleteWidget(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getWidget(id, schoolId);
    if (!existing) throw new IntWidgetNotFoundError(id);
    return this.repo.deleteWidget(id, schoolId);
  }
}
