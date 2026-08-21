import type { SupabaseClient } from '@supabase/supabase-js';
import type { Menu, MenuCreate, MenuUpdate } from '@educi/types';
import { ScMenuNotFoundError } from '@educi/errors';
import { SmartCampusRepositoryEnterprise } from '../repositories/smart-campus.repository';

export class ScMenuService {
  private repo: SmartCampusRepositoryEnterprise;

  constructor(private supabase: SupabaseClient) {
    this.repo = new SmartCampusRepositoryEnterprise(supabase);
  }

  async getMenu(schoolId: string, id: string): Promise<Menu> {
    const menu = await this.repo.findMenuById(schoolId, id);
    if (!menu) throw new ScMenuNotFoundError(id);
    return menu;
  }

  async listMenus(schoolId: string, filters?: Record<string, unknown>): Promise<Menu[]> {
    return this.repo.findAllMenus(schoolId, filters);
  }

  async createMenu(schoolId: string, data: MenuCreate): Promise<Menu> {
    return this.repo.createMenu(schoolId, data);
  }

  async updateMenu(schoolId: string, id: string, data: MenuUpdate): Promise<Menu> {
    const existing = await this.repo.findMenuById(schoolId, id);
    if (!existing) throw new ScMenuNotFoundError(id);
    return this.repo.updateMenu(schoolId, id, data);
  }

  async deleteMenu(schoolId: string, id: string): Promise<void> {
    const existing = await this.repo.findMenuById(schoolId, id);
    if (!existing) throw new ScMenuNotFoundError(id);
    return this.repo.deleteMenu(schoolId, id);
  }

  async findByDate(schoolId: string, date: string): Promise<Menu | null> {
    return this.repo.findMenuByDate(schoolId, date);
  }

  async publishMenu(schoolId: string, id: string): Promise<Menu> {
    const existing = await this.repo.findMenuById(schoolId, id);
    if (!existing) throw new ScMenuNotFoundError(id);
    return this.repo.publishMenu(schoolId, id);
  }

  async countMenus(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    return this.repo.countMenus(schoolId, filters);
  }
}
