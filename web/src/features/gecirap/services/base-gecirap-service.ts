import type { z } from 'zod';
import {
  GecirapValidationError,
  GecirapNotFoundError,
  GecirapPermissionError,
} from '@educi/errors';
import type {
  GecirapBaseEntity,
  PaginatedResult,
  PaginationParams,
  FilterParams,
} from '../repositories/base-gecirap-repository';
import type { GecirapCrudRepository } from '../repositories/base-gecirap-repository';

// ============================================================================
// Base Service Configuration
// ============================================================================

export interface GecirapServiceConfig {
  enableAuditLog?: boolean;
  enableValidation?: boolean;
  maxPageSize?: number;
}

const DEFAULT_CONFIG: GecirapServiceConfig = {
  enableAuditLog: true,
  enableValidation: true,
  maxPageSize: 200,
};

// ============================================================================
// Base Service Class
// ============================================================================

export abstract class BaseGecirapService {
  protected readonly config: GecirapServiceConfig;

  constructor(config: GecirapServiceConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  protected validateSchoolId(schoolId: string): void {
    if (!schoolId || typeof schoolId !== 'string' || schoolId.trim().length === 0) {
      throw new GecirapValidationError('school_id est requis');
    }
  }

  protected validateId(id: string, entityName: string): void {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new GecirapValidationError(`${entityName} id est requis`);
    }
  }

  protected validateSchema<T>(schema: z.ZodSchema<T>, data: unknown, entityName: string): T {
    if (!this.config.enableValidation) {
      return data as T;
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      }));
      throw new GecirapValidationError(
        `Erreur de validation ${entityName}: ${errors.map((e) => `${e.field} - ${e.message}`).join(', ')}`,
      );
    }
    return result.data;
  }

  protected validatePagination(params: PaginationParams): PaginationParams {
    const offset = Math.max(0, params.offset ?? 0);
    const limit = Math.min(
      Math.max(1, params.limit ?? 50),
      this.config.maxPageSize ?? 200,
    );
    return { offset, limit };
  }

  protected async ensureExists<T extends GecirapBaseEntity>(
    repo: GecirapCrudRepository<T>,
    id: string,
    schoolId: string,
    entityName: string,
  ): Promise<T> {
    this.validateSchoolId(schoolId);
    this.validateId(id, entityName);

    const exists = await repo.exists(id, schoolId);
    if (!exists) {
      throw new GecirapNotFoundError(`${entityName} (${id}) introuvable`);
    }
    return repo.findById(id, schoolId);
  }

  protected validateOwnership<T extends GecirapBaseEntity>(
    entity: T,
    schoolId: string,
    entityName: string,
  ): void {
    if (entity.school_id !== schoolId) {
      throw new GecirapPermissionError(
        `Accès non autorisé à ${entityName} d'un autre établissement`,
      );
    }
  }

  protected validateNotEmpty(data: Record<string, unknown>, fields: string[], entityName: string): void {
    const errors: Array<{ field: string; message: string }> = [];
    for (const field of fields) {
      const value = data[field];
      if (value === undefined || value === null || value === '') {
        errors.push({ field, message: `${field} est requis` });
      }
    }
    if (errors.length > 0) {
      throw new GecirapValidationError(
        `Champs requis manquants pour ${entityName}: ${errors.map((e) => e.field).join(', ')}`,
      );
    }
  }

  protected validateEnum<T extends string>(
    value: T,
    allowed: readonly T[],
    fieldName: string,
    entityName: string,
  ): void {
    if (!allowed.includes(value)) {
      throw new GecirapValidationError(
        `${fieldName} invalide pour ${entityName}: "${value}". Valeurs autorisées: ${allowed.join(', ')}`,
      );
    }
  }

  protected validateRange(
    value: number,
    min: number,
    max: number,
    fieldName: string,
    entityName: string,
  ): void {
    if (value < min || value > max) {
      throw new GecirapValidationError(
        `${fieldName} doit être entre ${min} et ${max} pour ${entityName}: ${value}`,
      );
    }
  }

  protected sanitizeFilters(filters: FilterParams): FilterParams {
    const sanitized: FilterParams = {};
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && value !== null && value !== '') {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
}

// ============================================================================
// Factory Helper
// ============================================================================

export function createGecirapService<T extends BaseGecirapService>(
  ServiceClass: new (config?: GecirapServiceConfig) => T,
  config?: GecirapServiceConfig,
): T {
  return new ServiceClass(config);
}
