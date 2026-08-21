import type { SupabaseClient } from '@supabase/supabase-js';
import type { MedicalAllergy2, MedicalAllergyCreate } from '@educi/types';
import { ScMedicalAllergyNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMedicalAllergyService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAllergy(schoolId: string, id: string): Promise<MedicalAllergy2> {
    const allergy = await this.repo.findMedicalAllergyById(schoolId, id);
    if (!allergy) throw new ScMedicalAllergyNotFoundError(id);
    return allergy;
  }

  async listAllergies(schoolId: string, filters?: Record<string, unknown>): Promise<MedicalAllergy2[]> {
    return this.repo.findAllMedicalAllergies(schoolId, filters);
  }

  async createAllergy(schoolId: string, data: MedicalAllergyCreate): Promise<MedicalAllergy2> {
    return this.repo.createMedicalAllergy(schoolId, data);
  }

  async updateAllergy(schoolId: string, id: string, data: Partial<MedicalAllergyCreate>): Promise<MedicalAllergy2> {
    const existing = await this.repo.findMedicalAllergyById(schoolId, id);
    if (!existing) throw new ScMedicalAllergyNotFoundError(id);
    return this.repo.updateMedicalAllergy(schoolId, id, data);
  }

  async deleteAllergy(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMedicalAllergyById(schoolId, id);
    if (!existing) throw new ScMedicalAllergyNotFoundError(id);
    return this.repo.deleteMedicalAllergy(schoolId, id);
  }

  async countAllergies(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMedicalAllergies(schoolId, filters);
  }
}
