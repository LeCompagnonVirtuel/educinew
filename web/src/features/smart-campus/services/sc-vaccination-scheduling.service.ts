import type { SupabaseClient } from '@supabase/supabase-js';
import type { Vaccination, VaccinationCreate } from '@educi/types';
import { ScVaccinationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScVaccinationSchedulingService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async scheduleVaccination(schoolId: string, data: VaccinationCreate): Promise<Vaccination> {
    return this.repo.createVaccination(schoolId, data);
  }

  async getVaccination(schoolId: string, id: string): Promise<Vaccination> {
    const vaccination = await this.repo.findVaccinationById(schoolId, id);
    if (!vaccination) throw new ScVaccinationNotFoundError(id);
    return vaccination;
  }

  async getVaccinationsByStudent(schoolId: string, studentId: string): Promise<Vaccination[]> {
    return this.repo.findVaccinationsByStudent(schoolId, studentId);
  }

  async getOverdueVaccinations(schoolId: string): Promise<Vaccination[]> {
    return this.repo.findOverdueVaccinations(schoolId);
  }

  async getDueForBooster(schoolId: string, boosterDate: string): Promise<Vaccination[]> {
    return this.repo.findVaccinationsDueForBooster(schoolId, boosterDate);
  }

  async getVaccinationRate(schoolId: string, vaccineName: string): Promise<number> {
    return this.repo.getVaccinationRate(schoolId, vaccineName);
  }

  async getByBatch(schoolId: string, batchNumber: string): Promise<Vaccination[]> {
    return this.repo.findVaccinationsByBatch(schoolId, batchNumber);
  }

  async deleteVaccination(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findVaccinationById(schoolId, id);
    if (!existing) throw new ScVaccinationNotFoundError(id);
    return this.repo.deleteVaccination(schoolId, id);
  }
}
