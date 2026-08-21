import type { SupabaseClient } from '@supabase/supabase-js';
import type { Allergen, AllergenCreate } from '@educi/types';
import { ScAllergenNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScAllergenService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getAllergen(schoolId: string, id: string): Promise<Allergen> {
    const allergen = await this.repo.findAllergenById(schoolId, id);
    if (!allergen) throw new ScAllergenNotFoundError(id);
    return allergen;
  }

  async listAllergens(schoolId: string, filters?: Record<string, unknown>): Promise<Allergen[]> {
    return this.repo.findAllAllergens(schoolId, filters);
  }

  async createAllergen(schoolId: string, data: AllergenCreate): Promise<Allergen> {
    return this.repo.createAllergen(schoolId, data);
  }

  async updateAllergen(schoolId: string, id: string, data: Partial<AllergenCreate>): Promise<Allergen> {
    const existing = await this.repo.findAllergenById(schoolId, id);
    if (!existing) throw new ScAllergenNotFoundError(id);
    return this.repo.updateAllergen(schoolId, id, data);
  }

  async deleteAllergen(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findAllergenById(schoolId, id);
    if (!existing) throw new ScAllergenNotFoundError(id);
    return this.repo.deleteAllergen(schoolId, id);
  }

  async countAllergens(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countAllergens(schoolId, filters);
  }
}
