import type { SupabaseClient } from '@supabase/supabase-js';
import type { AutomationNode } from '@educi/types';
import { EduOSAutomationNodeError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSAutomationNodeService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getAutomationNode(schoolId: string, id: string): Promise<AutomationNode> {
    const item = await this.repo.getAutomationNode(schoolId, id);
    if (!item) throw new EduOSAutomationNodeError(id);
    return item;
  }
  async listAutomationNodes(schoolId: string, filters?: Record<string, unknown>): Promise<AutomationNode[]> {
    return this.repo.listAutomationNodes(schoolId, filters);
  }
  async createAutomationNode(schoolId: string, data: Partial<AutomationNode>): Promise<AutomationNode> {
    return this.repo.createAutomationNode(schoolId, data as any);
  }
  async updateAutomationNode(schoolId: string, id: string, data: Partial<AutomationNode>): Promise<AutomationNode> {
    const existing = await this.repo.getAutomationNode(schoolId, id);
    if (!existing) throw new EduOSAutomationNodeError(id);
    return this.repo.updateAutomationNode(schoolId, id, data as any);
  }
  async deleteAutomationNode(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getAutomationNode(schoolId, id);
    if (!existing) throw new EduOSAutomationNodeError(id);
    return this.repo.deleteAutomationNode(schoolId, id);
  }
}

