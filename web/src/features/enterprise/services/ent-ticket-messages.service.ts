// Enterprise Platform Service - TicketMessages
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTicketMessageService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTicketMessage(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTicketMessageById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTicketMessages(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTicketMessages(schoolId, filters);
  }
  async createTicketMessage(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTicketMessage(schoolId, data);
  }
  async updateTicketMessage(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTicketMessageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTicketMessage(schoolId, id, data);
  }
  async deleteTicketMessage(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTicketMessageById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTicketMessage(schoolId, id);
  }
  async countTicketMessages(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTicketMessages(schoolId, filters);
  }
}
