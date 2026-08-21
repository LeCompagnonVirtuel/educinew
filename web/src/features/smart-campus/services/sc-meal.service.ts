import type { SupabaseClient } from '@supabase/supabase-js';
import type { Meal, MealCreate } from '@educi/types';
import { ScMealNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMealService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMeal(schoolId: string, id: string): Promise<Meal> {
    const meal = await this.repo.findMealById(schoolId, id);
    if (!meal) throw new ScMealNotFoundError(id);
    return meal;
  }

  async listMeals(schoolId: string, filters?: Record<string, unknown>): Promise<Meal[]> {
    return this.repo.findAllMeals(schoolId, filters);
  }

  async createMeal(schoolId: string, data: MealCreate): Promise<Meal> {
    return this.repo.createMeal(schoolId, data);
  }

  async updateMeal(schoolId: string, id: string, data: Partial<MealCreate>): Promise<Meal> {
    const existing = await this.repo.findMealById(schoolId, id);
    if (!existing) throw new ScMealNotFoundError(id);
    return this.repo.updateMeal(schoolId, id, data);
  }

  async deleteMeal(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMealById(schoolId, id);
    if (!existing) throw new ScMealNotFoundError(id);
    return this.repo.deleteMeal(schoolId, id);
  }

  async countMeals(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMeals(schoolId, filters);
  }
}
