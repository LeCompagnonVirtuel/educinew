import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationEdge } from '@educi/types';
import { EduOSAutomationEdgeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAutomationEdgeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAutomationEdge(schoolId: string, id: string): Promise<AutomationEdge> {
    const item = await this.repo.getAutomationEdge(schoolId, id);
    if (!item) throw new EduOSAutomationEdgeError(id);
    return item;
  }
  async listAutomationEdges(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationEdge[]> {
    return this.repo.listAutomationEdges(schoolId, filters);
  }
  async createAutomationEdge(schoolId: string, data: Partial<AutomationEdge>): Promise<AutomationEdge> {
    return this.repo.createAutomationEdge(schoolId, data as any);
  }
  async updateAutomationEdge(schoolId: string, id: string, data: Partial<AutomationEdge>): Promise<AutomationEdge> {
    const existing = await this.repo.getAutomationEdge(schoolId, id);
    if (!existing) throw new EduOSAutomationEdgeError(id);
    return this.repo.updateAutomationEdge(schoolId, id, data as any);
  }
  async deleteAutomationEdge(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomationEdge(schoolId, id);
    if (!existing) throw new EduOSAutomationEdgeError(id);
    return this.repo.deleteAutomationEdge(schoolId, id);
  }
}

