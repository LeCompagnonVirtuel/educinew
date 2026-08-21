import type { SupabaseClient } from '@supabase/supabase-js';
import type { InspectionCalendar, InspectionCalendarCreate } from '@educi/types';
import { GovInspectionCalendarNotFoundError } from '@educi/errors';
import { GovernmentRepositoryEnterprise } from '../repositories/gov.repository';

export class GovEmergencyInspectionCalendarService {
  private repo: GovernmentRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new GovernmentRepositoryEnterprise(supabase);
  }

  async getEntity(schoolId: string, id: string): Promise<InspectionCalendar> {
    const item = await this.repo.findInspectionCalendarById(schoolId, id);
    if (!item) throw new GovInspectionCalendarNotFoundError(id);
    return item;
  }

  async listEntities(schoolId: string, filters?: Record<string, unknown>): Promise<InspectionCalendar[]> {
    return this.repo.findAllInspectionCalendars(schoolId, filters);
  }

  async createEntity(schoolId: string, data: Partial<InspectionCalendarCreate>): Promise<InspectionCalendar> {
    return this.repo.createInspectionCalendar(schoolId, data);
  }

  async updateEntity(schoolId: string, id: string, data: Partial<InspectionCalendarCreate>): Promise<InspectionCalendar> {
    const existing = await this.repo.findInspectionCalendarById(schoolId, id);
    if (!existing) throw new GovInspectionCalendarNotFoundError(id);
    return this.repo.updateInspectionCalendar(schoolId, id, data);
  }

  async deleteEntity(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findInspectionCalendarById(schoolId, id);
    if (!existing) throw new GovInspectionCalendarNotFoundError(id);
    return this.repo.deleteInspectionCalendar(schoolId, id);
  }
}
