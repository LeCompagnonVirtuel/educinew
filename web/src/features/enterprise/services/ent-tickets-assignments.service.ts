// Enterprise Platform Service - TicketsAssignments
// Phase 2.10 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Record as GenericRecord } from '@educi/types';
import { EntNotFoundError } from '@educi/errors';
import { EnterprisePlatformRepository } from '../repositories/enterprise.repository';

export class EntTicketAssignmentService {
  private repo: EnterprisePlatformRepository;
  constructor(private supabase: SupabaseClient) {
    this.repo = new EnterprisePlatformRepository(supabase);
  }
  async getTicketsAssignment(schoolId: string, id: string): Promise<GenericRecord> {
    const item = await this.repo.findTicketsAssignmentById(schoolId, id);
    if (!item) throw new EntNotFoundError(id);
    return item;
  }
  async listTicketsAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<GenericRecord[]> {
    return this.repo.findAllTicketsAssignments(schoolId, filters);
  }
  async createTicketsAssignment(schoolId: string, data: Record<string, unknown>): Promise<GenericRecord> {
    return this.repo.createTicketsAssignment(schoolId, data);
  }
  async updateTicketsAssignment(schoolId: string, id: string, data: Record<string, unknown>): Promise<GenericRecord> {
    const existing = await this.repo.findTicketsAssignmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.updateTicketsAssignment(schoolId, id, data);
  }
  async deleteTicketsAssignment(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findTicketsAssignmentById(schoolId, id);
    if (!existing) throw new EntNotFoundError(id);
    return this.repo.deleteTicketsAssignment(schoolId, id);
  }
  async countTicketsAssignments(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countTicketsAssignments(schoolId, filters);
  }
}
