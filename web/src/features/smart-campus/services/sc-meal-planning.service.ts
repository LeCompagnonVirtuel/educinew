import type { SupabaseClient } from '@supabase/supabase-js';
import type { Menu, MenuCreate, MenuUpdate, Meal, MealCreate } from '@educi/types';
import { ScMenuNotFoundError, ScMealNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMealPlanningService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMenu(schoolId: string, id: string): Promise<Menu> {
    const menu = await this.repo.findMenuById(schoolId, id);
    if (!menu) throw new ScMenuNotFoundError(id);
    return menu;
  }

  async getMenusByDate(schoolId: string, date: string): Promise<Menu | null> {
    return this.repo.findMenuByDate(schoolId, date);
  }

  async getMenusByWeek(schoolId: string, weekNumber: number, year: number): Promise<Menu[]> {
    return this.repo.findMenusByWeek(schoolId, weekNumber, year);
  }

  async publishMenu(schoolId: string, id: string): Promise<Menu> {
    const existing = await this.repo.findMenuById(schoolId, id);
    if (!existing) throw new ScMenuNotFoundError(id);
    return this.repo.publishMenu(schoolId, id);
  }

  async duplicateMenu(schoolId: string, id: string, newDate: string): Promise<Menu> {
    const existing = await this.repo.findMenuById(schoolId, id);
    if (!existing) throw new ScMenuNotFoundError(id);
    return this.repo.duplicateMenu(schoolId, id, newDate);
  }

  async createMeal(schoolId: string, data: MealCreate): Promise<Meal> {
    return this.repo.createMeal(schoolId, data);
  }

  async getMealsByMenu(schoolId: string, menuId: string): Promise<Meal[]> {
    return this.repo.findMealsByMenu(schoolId, menuId);
  }

  async getMealsByType(schoolId: string, type: string): Promise<Meal[]> {
    return this.repo.findMealsByType(schoolId, type);
  }
}
