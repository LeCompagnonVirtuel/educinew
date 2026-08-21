// Enterprise Platform Service - Tickets
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTicketService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTicket(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTicketById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTickets(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTickets(schoolId, filters);
  }
  async createTicket(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTicket(schoolId, data);
  }
  async updateTicket(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTicketById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTicket(schoolId, id, data);
  }
  async deleteTicket(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTicketById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTicket(schoolId, id);
  }
  async countTickets(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTickets(schoolId, filters);
  }
}
