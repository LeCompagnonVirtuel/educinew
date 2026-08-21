// Government & National Governance Service - InspectionCalendar
// Phase 2.9 - EduCI Platform

import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionCalendar, InspectionCalendarCreate } from '@educi/types';
import { GovInspectionCalendarNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovInspectionCalendarService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getInspectionCalendar(schoolId: string, id: string): Promise<InspectionCalendar> {
    const item = await this.repo.findInspectionCalendarById(schoolId, id);
    if (!item) throw new GovInspectionCalendarNotFoundError(id);
    return item;
  }

  async listInspectionCalendars(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionCalendar[]> {
    return this.repo.findAllInspectionCalendars(schoolId, filters);
  }

  async createInspectionCalendar(schoolId: string, data: InspectionCalendarCreate): Promise<InspectionCalendar> {
    return this.repo.createInspectionCalendar(schoolId, data);
  }

  async updateInspectionCalendar(schoolId: string, id: string, data: Partial<InspectionCalendarCreate>): Promise<InspectionCalendar> {
    const existing = await this.repo.findInspectionCalendarById(schoolId, id);
    if (!existing) throw new GovInspectionCalendarNotFoundError(id);
    return this.repo.updateInspectionCalendar(schoolId, id, data);
  }

  async deleteInspectionCalendar(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionCalendarById(schoolId, id);
    if (!existing) throw new GovInspectionCalendarNotFoundError(id);
    return this.repo.deleteInspectionCalendar(schoolId, id);
  }

  async countInspectionCalendars(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countInspectionCalendars(schoolId, filters);
  }
}
