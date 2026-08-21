import type { SupabaseClient } from '@supabase/supabase-js';
import type { ToolCall } from '@educi/types';
import { EduOSToolCallError } from '@educi/errors';
import { createEduOSRepository, EduOSRepository } from '../repositories/eduos.repository';

export class EduOSToolCallService {
  private repo: EduOSRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = createEduOSRepository(supabase);
  }
  async getToolCall(schoolId: string, id: string): Promise<ToolCall> {
    const item = await this.repo.getToolCall(schoolId, id);
    if (!item) throw new EduOSToolCallError(id);
    return item;
  }
  async listToolCalls(schoolId: string, filters?: Record<string, unknown>): Promise<ToolCall[]> {
    return this.repo.listToolCalls(schoolId, filters);
  }
  async createToolCall(schoolId: string, data: Partial<ToolCall>): Promise<ToolCall> {
    return this.repo.createToolCall(schoolId, data as any);
  }
  async updateToolCall(schoolId: string, id: string, data: Partial<ToolCall>): Promise<ToolCall> {
    const existing = await this.repo.getToolCall(schoolId, id);
    if (!existing) throw new EduOSToolCallError(id);
    return this.repo.updateToolCall(schoolId, id, data as any);
  }
  async deleteToolCall(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.getToolCall(schoolId, id);
    if (!existing) throw new EduOSToolCallError(id);
    return this.repo.deleteToolCall(schoolId, id);
  }
}

