import type { SupabaseClient } from '@supabase/supabase-js';
import type { Discipline, DisciplineCreate } from '@educi/types';
import { ScDisciplineNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScDisciplineService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getDiscipline(schoolId: string, id: string): Promise<Discipline> {
    const discipline = await this.repo.findDisciplineById(schoolId, id);
    if (!discipline) throw new ScDisciplineNotFoundError(id);
    return discipline;
  }

  async listDisciplines(schoolId: string, filters?: Record<string, unknown>): Promise<Discipline[]> {
    return this.repo.findAllDisciplines(schoolId, filters);
  }

  async createDiscipline(schoolId: string, data: DisciplineCreate): Promise<Discipline> {
    return this.repo.createDiscipline(schoolId, data);
  }

  async updateDiscipline(schoolId: string, id: string, data: Partial<DisciplineCreate>): Promise<Discipline> {
    const existing = await this.repo.findDisciplineById(schoolId, id);
    if (!existing) throw new ScDisciplineNotFoundError(id);
    return this.repo.updateDiscipline(schoolId, id, data);
  }

  async deleteDiscipline(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findDisciplineById(schoolId, id);
    if (!existing) throw new ScDisciplineNotFoundError(id);
    return this.repo.deleteDiscipline(schoolId, id);
  }

  async countDisciplines(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countDisciplines(schoolId, filters);
  }
}
