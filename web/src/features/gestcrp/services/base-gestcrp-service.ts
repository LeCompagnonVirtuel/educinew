import type { z } from 'zod';
import {
  GestcrpValidationError,
  GestcrpNotFoundError,
  GestcrpPermissionError,
} from '@educi/errors';
import type {
  GestcrpBaseEntity,
  PaginatedResult,
  PaginationParams,
  FilterParams,
} from '../repositories/base-gestcrp-repository';
import type { GestcrpCrudRepository } from '../repositories/base-gestcrp-repository';

// ============================================================================
// Base Service Configuration
// ============================================================================

export interface GestcrpServiceConfig {
  enableAuditLog?: boolean;
  enableValidation?: boolean;
  maxPageSize?: number;
}

const DEFAULT_CONFIG: GestcrpServiceConfig = {
  enableAuditLog: true,
  enableValidation: true,
  maxPageSize: 200,
};

// ============================================================================
// Base Service Class
// ============================================================================

export abstract class BaseGestcrpService {
  protected readonly config: GestcrpServiceConfig;

  constructor(config: GestcrpServiceConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  protected validateSchoolId(schoolId: string): void {
    if (!schoolId || typeof schoolId !== 'string' || schoolId.trim().length === 0) {
      throw new GestcrpValidationError('school_id est requis');
    }
  }

  protected validateId(id: string, entityName: string): void {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      throw new GestcrpValidationError(`${entityName} id est requis`);
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
      throw new GestcrpValidationError(
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

  protected async ensureExists<T extends GestcrpBaseEntity>(
    repo: GestcrpCrudRepository<T>,
    id: string,
    schoolId: string,
    entityName: string,
  ): Promise<T> {
    this.validateSchoolId(schoolId);
    this.validateId(id, entityName);

    const exists = await repo.exists(id, schoolId);
    if (!exists) {
      throw new GestcrpNotFoundError(entityName, id);
    }
    return repo.findById(id, schoolId);
  }

  protected validateOwnership<T extends GestcrpBaseEntity>(
    entity: T,
    schoolId: string,
    entityName: string,
  ): void {
    if (entity.school_id !== schoolId) {
      throw new GestcrpPermissionError(
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
      throw new GestcrpValidationError(
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
      throw new GestcrpValidationError(
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
      throw new GestcrpValidationError(
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

export function createGestcrpService<T extends BaseGestcrpService>(
  ServiceClass: new (config?: GestcrpServiceConfig) => T,
  config?: GestcrpServiceConfig,
): T {
  return new ServiceClass(config);
}
