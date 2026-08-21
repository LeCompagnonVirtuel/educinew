import { SupabaseClient } from '@supabase/supabase-js';
import { CrudRepository, BaseEntity, createCrudRepository } from '../repositories/gegin-base.repository';
import { AEIPModuleNameError } from '@educi/errors';
import { logger } from '@educi/logger';

export interface GEGINServiceOptions {
  supabase: SupabaseClient;
  tableName: string;
  moduleName: string;
}

export class GEGINBaseService<T extends BaseEntity> {
  protected repo: CrudRepository<T>;
  protected moduleName: string;

  constructor(options: GEGINServiceOptions) {
    this.repo = createCrudRepository<T>(options.supabase, options.tableName);
    this.moduleName = options.moduleName;
  }

  async getById(id: string, schoolId: string): Promise<T> {
    try {
      const result = await this.repo.getById(id, schoolId);
      logger.info(`${this.moduleName} fetched`, { id, schoolId }, this.moduleName);
      return result;
    } catch (error) {
      logger.error(`${this.moduleName} fetch failed`, { id, schoolId, error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to fetch ${this.moduleName}: ${error}`);
    }
  }

  async list(schoolId: string, filters?: Record<string, unknown>): Promise<T[]> {
    try {
      const results = await this.repo.list(schoolId, filters);
      logger.info(`${this.moduleName} listed`, { schoolId, count: results.length }, this.moduleName);
      return results;
    } catch (error) {
      logger.error(`${this.moduleName} list failed`, { schoolId, error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to list ${this.moduleName}: ${error}`);
    }
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    try {
      const result = await this.repo.create(data);
      logger.info(`${this.moduleName} created`, { id: result.id }, this.moduleName);
      return result;
    } catch (error) {
      logger.error(`${this.moduleName} creation failed`, { error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to create ${this.moduleName}: ${error}`);
    }
  }

  async update(id: string, schoolId: string, data: Partial<T>): Promise<T> {
    try {
      const result = await this.repo.update(id, schoolId, data);
      logger.info(`${this.moduleName} updated`, { id, schoolId }, this.moduleName);
      return result;
    } catch (error) {
      logger.error(`${this.moduleName} update failed`, { id, schoolId, error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to update ${this.moduleName}: ${error}`);
    }
  }

  async delete(id: string, schoolId: string): Promise<void> {
    try {
      await this.repo.delete(id, schoolId);
      logger.info(`${this.moduleName} deleted`, { id, schoolId }, this.moduleName);
    } catch (error) {
      logger.error(`${this.moduleName} deletion failed`, { id, schoolId, error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to delete ${this.moduleName}: ${error}`);
    }
  }

  async softDelete(id: string, schoolId: string): Promise<void> {
    try {
      await this.repo.softDelete(id, schoolId);
      logger.info(`${this.moduleName} soft deleted`, { id, schoolId }, this.moduleName);
    } catch (error) {
      logger.error(`${this.moduleName} soft delete failed`, { id, schoolId, error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to soft delete ${this.moduleName}: ${error}`);
    }
  }

  async restore(id: string, schoolId: string): Promise<void> {
    try {
      await this.repo.restore(id, schoolId);
      logger.info(`${this.moduleName} restored`, { id, schoolId }, this.moduleName);
    } catch (error) {
      logger.error(`${this.moduleName} restore failed`, { id, schoolId, error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to restore ${this.moduleName}: ${error}`);
    }
  }

  async count(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    try {
      const result = await this.repo.count(schoolId, filters);
      logger.info(`${this.moduleName} counted`, { schoolId, count: result }, this.moduleName);
      return result;
    } catch (error) {
      logger.error(`${this.moduleName} count failed`, { schoolId, error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to count ${this.moduleName}: ${error}`);
    }
  }

  async exists(id: string, schoolId: string): Promise<boolean> {
    try {
      const result = await this.repo.exists(id, schoolId);
      return result;
    } catch (error) {
      logger.error(`${this.moduleName} exists check failed`, { id, schoolId, error }, this.moduleName);
      throw new AEIPModuleNameError(`Failed to check ${this.moduleName} existence: ${error}`);
    }
  }
}
