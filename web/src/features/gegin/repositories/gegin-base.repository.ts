import { SupabaseClient } from '@supabase/supabase-js';
import { AEIPModuleNameError } from '@educi/errors';

export interface BaseEntity {
  id: string;
  school_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface CrudRepository<T extends BaseEntity> {
  getById(id: string, schoolId: string): Promise<T>;
  list(schoolId: string, filters?: Record<string, unknown>): Promise<T[]>;
  create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T>;
  update(id: string, schoolId: string, data: Partial<T>): Promise<T>;
  delete(id: string, schoolId: string): Promise<void>;
  softDelete(id: string, schoolId: string): Promise<void>;
  restore(id: string, schoolId: string): Promise<void>;
  count(schoolId: string, filters?: Record<string, unknown>): Promise<number>;
  exists(id: string, schoolId: string): Promise<boolean>;
}

export class CrudRepositoryImpl<T extends BaseEntity> implements CrudRepository<T> {
  constructor(
    protected supabase: SupabaseClient,
    protected tableName: string,
  ) {}

  async getById(id: string, schoolId: string): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();
    if (error) throw new AEIPModuleNameError(`Failed to fetch ${this.tableName}: ${error.message}`);
    return data as T;
  }

  async list(schoolId: string, filters?: Record<string, unknown>): Promise<T[]> {
    let query = this.supabase
      .from(this.tableName)
      .select('*')
      .eq('school_id', schoolId)
      .is('deleted_at', null);
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      }
    }
    const { data, error } = await query;
    if (error) throw new AEIPModuleNameError(`Failed to list ${this.tableName}: ${error.message}`);
    return (data || []) as T[];
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
    const now = new Date().toISOString();
    const entity = { ...data, id: crypto.randomUUID(), created_at: now, updated_at: now };
    const { data: result, error } = await this.supabase
      .from(this.tableName)
      .insert(entity)
      .select()
      .single();
    if (error) throw new AEIPModuleNameError(`Failed to create ${this.tableName}: ${error.message}`);
    return result as T;
  }

  async update(id: string, schoolId: string, data: Partial<T>): Promise<T> {
    const { data: result, error } = await this.supabase
      .from(this.tableName)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();
    if (error) throw new AEIPModuleNameError(`Failed to update ${this.tableName}: ${error.message}`);
    return result as T;
  }

  async delete(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AEIPModuleNameError(`Failed to delete ${this.tableName}: ${error.message}`);
  }

  async softDelete(id: string, schoolId: string): Promise<void> {
    const now = new Date().toISOString();
    const { error } = await this.supabase
      .from(this.tableName)
      .update({ deleted_at: now, updated_at: now })
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AEIPModuleNameError(`Failed to soft delete ${this.tableName}: ${error.message}`);
  }

  async restore(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .update({ deleted_at: null, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId);
    if (error) throw new AEIPModuleNameError(`Failed to restore ${this.tableName}: ${error.message}`);
  }

  async count(schoolId: string, filters?: Record<string, unknown>): Promise<number> {
    let query = this.supabase
      .from(this.tableName)
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .is('deleted_at', null);
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null) query = query.eq(key, value);
      }
    }
    const { count, error } = await query;
    if (error) throw new AEIPModuleNameError(`Failed to count ${this.tableName}: ${error.message}`);
    return count || 0;
  }

  async exists(id: string, schoolId: string): Promise<boolean> {
    const { count, error } = await this.supabase
      .from(this.tableName)
      .select('id', { count: 'exact', head: true })
      .eq('id', id)
      .eq('school_id', schoolId)
      .is('deleted_at', null);
    if (error) throw new AEIPModuleNameError(`Failed to check ${this.tableName}: ${error.message}`);
    return (count || 0) > 0;
  }
}

export function createCrudRepository<T extends BaseEntity>(
  supabase: SupabaseClient,
  tableName: string,
): CrudRepository<T> {
  return new CrudRepositoryImpl<T>(supabase, tableName);
}
