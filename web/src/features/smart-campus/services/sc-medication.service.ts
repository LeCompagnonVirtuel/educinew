import type { SupabaseClient } from '@supabase/supabase-js';
import type { Medication, MedicationCreate } from '@educi/types';
import { ScMedicationNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMedicationService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMedication(schoolId: string, id: string): Promise<Medication> {
    const medication = await this.repo.findMedicationById(schoolId, id);
    if (!medication) throw new ScMedicationNotFoundError(id);
    return medication;
  }

  async listMedications(schoolId: string, filters?: Record<string, unknown>): Promise<Medication[]> {
    return this.repo.findAllMedications(schoolId, filters);
  }

  async createMedication(schoolId: string, data: MedicationCreate): Promise<Medication> {
    return this.repo.createMedication(schoolId, data);
  }

  async updateMedication(schoolId: string, id: string, data: Partial<MedicationCreate>): Promise<Medication> {
    const existing = await this.repo.findMedicationById(schoolId, id);
    if (!existing) throw new ScMedicationNotFoundError(id);
    return this.repo.updateMedication(schoolId, id, data);
  }

  async deleteMedication(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMedicationById(schoolId, id);
    if (!existing) throw new ScMedicationNotFoundError(id);
    return this.repo.deleteMedication(schoolId, id);
  }

  async countMedications(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMedications(schoolId, filters);
  }
}
