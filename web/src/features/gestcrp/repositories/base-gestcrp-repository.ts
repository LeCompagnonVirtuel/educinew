import { SupabaseClient } from '@supabase/supabase-js';
import { GestcrpNotFoundError } from '@educi/errors';

// ============================================================================
// Base Entity & Types
// ============================================================================

export interface GestcrpBaseEntity {
  id: string;
  school_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  offset: number;
  limit: number;
}

export interface PaginationParams {
  offset?: number;
  limit?: number;
}

export interface FilterParams {
  [key: string]: unknown;
}

// ============================================================================
// CRUD Repository Interface
// ============================================================================

export interface GestcrpCrudRepository<T extends GestcrpBaseEntity> {
  findAll(schoolId: string, params?: PaginationParams & FilterParams): Promise<PaginatedResult<T>>;
  findById(id: string, schoolId: string): Promise<T>;
  create(data: Omit<T, 'id' | 'school_id' | 'created_at' | 'updated_at'>, schoolId: string): Promise<T>;
  update(id: string, schoolId: string, data: Partial<Omit<T, 'id' | 'school_id' | 'created_at'>>): Promise<T>;
  delete(id: string, schoolId: string): Promise<void>;
  softDelete(id: string, schoolId: string): Promise<void>;
  restore(id: string, schoolId: string): Promise<void>;
  count(schoolId: string, filters?: FilterParams): Promise<number>;
  exists(id: string, schoolId: string): Promise<boolean>;
}

// ============================================================================
// Base CRUD Implementation
// ============================================================================

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export class GestcrpCrudRepositoryImpl<T extends GestcrpBaseEntity>
  implements GestcrpCrudRepository<T>
{
  constructor(
    protected supabase: SupabaseClient,
    protected tableName: string,
    protected errorHandler: (message: string) => never = (msg) => {
      throw new GestcrpNotFoundError(msg);
    },
  ) {}

  async findAll(
    schoolId: string,
    params: PaginationParams & FilterParams = {},
  ): Promise<PaginatedResult<T>> {
    const { offset = 0, limit = DEFAULT_LIMIT, ...filters } = params;
    const safeLimit = Math.min(limit, MAX_LIMIT);

    let query = this.supabase
      .from(this.tableName)
      .select('*', { count: 'exact' })
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .range(offset, offset + safeLimit - 1);

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }

    const { data, error, count } = await query;
    if (error) {
      this.errorHandler(`Erreur lors de la récupération de ${this.tableName}: ${error.message}`);
    }

    return {
      data: (data || []) as T[],
      total: count || 0,
      offset,
      limit: safeLimit,
    };
  }

  async findById(id: string, schoolId: string): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .eq('school_id', schoolId)
      .is('deleted_at', null)
      .single();

    if (error) {
      this.errorHandler(`${this.tableName} (${id}) introuvable: ${error.message}`);
    }

    return data as T;
  }

  async create(
    data: Omit<T, 'id' | 'school_id' | 'created_at' | 'updated_at'>,
    schoolId: string,
  ): Promise<T> {
    const now = new Date().toISOString();
    const entity = {
      ...data,
      id: crypto.randomUUID(),
      school_id: schoolId,
      created_at: now,
      updated_at: now,
    };

    const { data: result, error } = await this.supabase
      .from(this.tableName)
      .insert(entity)
      .select()
      .single();

    if (error) {
      this.errorHandler(`Erreur lors de la création dans ${this.tableName}: ${error.message}`);
    }

    return result as T;
  }

  async update(
    id: string,
    schoolId: string,
    data: Partial<Omit<T, 'id' | 'school_id' | 'created_at'>>,
  ): Promise<T> {
    const { data: result, error } = await this.supabase
      .from(this.tableName)
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId)
      .select()
      .single();

    if (error) {
      this.errorHandler(`Erreur lors de la mise à jour de ${this.tableName}: ${error.message}`);
    }

    return result as T;
  }

  async delete(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq('id', id)
      .eq('school_id', schoolId);

    if (error) {
      this.errorHandler(`Erreur lors de la suppression de ${this.tableName}: ${error.message}`);
    }
  }

  async softDelete(id: string, schoolId: string): Promise<void> {
    const now = new Date().toISOString();
    const { error } = await this.supabase
      .from(this.tableName)
      .update({ deleted_at: now, updated_at: now })
      .eq('id', id)
      .eq('school_id', schoolId);

    if (error) {
      this.errorHandler(`Erreur lors de la suppression logique de ${this.tableName}: ${error.message}`);
    }
  }

  async restore(id: string, schoolId: string): Promise<void> {
    const { error } = await this.supabase
      .from(this.tableName)
      .update({ deleted_at: null, updated_at: new Date().toISOString() })
      .eq('id', id)
      .eq('school_id', schoolId);

    if (error) {
      this.errorHandler(`Erreur lors de la restauration de ${this.tableName}: ${error.message}`);
    }
  }

  async count(schoolId: string, filters: FilterParams = {}): Promise<number> {
    let query = this.supabase
      .from(this.tableName)
      .select('id', { count: 'exact', head: true })
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    }

    const { count, error } = await query;
    if (error) {
      this.errorHandler(`Erreur lors du comptage de ${this.tableName}: ${error.message}`);
    }

    return count || 0;
  }

  async exists(id: string, schoolId: string): Promise<boolean> {
    const { count, error } = await this.supabase
      .from(this.tableName)
      .select('id', { count: 'exact', head: true })
      .eq('id', id)
      .eq('school_id', schoolId)
      .is('deleted_at', null);

    if (error) {
      this.errorHandler(`Erreur lors de la vérification de ${this.tableName}: ${error.message}`);
    }

    return (count || 0) > 0;
  }
}

// ============================================================================
// Factory
// ============================================================================

export function createGestcrpCrudRepository<T extends GestcrpBaseEntity>(
  supabase: SupabaseClient,
  tableName: string,
): GestcrpCrudRepository<T> {
  return new GestcrpCrudRepositoryImpl<T>(supabase, tableName);
}
