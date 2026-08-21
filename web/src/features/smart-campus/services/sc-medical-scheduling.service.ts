import type { SupabaseClient } from '@supabase/supabase-js';
import type { MedicalVisit, MedicalVisitCreate } from '@educi/types';
import { ScMedicalVisitNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMedicalSchedulingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async scheduleVisit(schoolId: string, data: MedicalVisitCreate): Promise<MedicalVisit> {
    return this.repo.createMedicalVisit(schoolId, data);
  }

  async getVisit(schoolId: string, id: string): Promise<MedicalVisit> {
    const visit = await this.repo.findMedicalVisitById(schoolId, id);
    if (!visit) throw new ScMedicalVisitNotFoundError(id);
    return visit;
  }

  async getVisitsByDate(schoolId: string, date: string): Promise<MedicalVisit[]> {
    return this.repo.findMedicalVisitsByDate(schoolId, date);
  }

  async getVisitsByStudent(schoolId: string, studentId: string): Promise<MedicalVisit[]> {
    return this.repo.findMedicalVisitsByStudent(schoolId, studentId);
  }

  async getVisitsByDoctor(schoolId: string, doctorName: string): Promise<MedicalVisit[]> {
    return this.repo.findMedicalVisitsByDoctor(schoolId, doctorName);
  }

  async getFollowUpRequired(schoolId: string): Promise<MedicalVisit[]> {
    return this.repo.findFollowUpRequiredVisits(schoolId);
  }

  async getVisitStats(schoolId: string, startDate: string, endDate: string): Promise<Record<string, number>> {
    return this.repo.getMedicalVisitStats(schoolId, startDate, endDate);
  }

  async deleteVisit(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMedicalVisitById(schoolId, id);
    if (!existing) throw new ScMedicalVisitNotFoundError(id);
    return this.repo.deleteMedicalVisit(schoolId, id);
  }
}
