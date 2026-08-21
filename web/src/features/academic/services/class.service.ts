import type { AcademicRepository, AcademicFilters, SchoolClass, CreateClassRequest, UpdateClassRequest } from '../types';
import {
  ClassNotFoundError,
  ClassValidationError,
  ClassDuplicateError,
  ClassDeletionError,
} from '@educi/errors';
import { logger } from '@educi/logger';

interface ClassStatistics {
  total: number;
  byLevel: Array<{ levelId: string; levelName: string; count: number }>;
  bySection: Array<{ sectionId: string; sectionName: string; count: number }>;
  capacityStats: {
    totalCapacity: number;
    averageCapacity: number;
    maxCapacity: number;
    minCapacity: number;
  };
}

export class ClassService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new class after validating name uniqueness within the same level.
   */
  async create(schoolId: string, userId: string, data: CreateClassRequest): Promise<SchoolClass> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom est requis' });
    }
    if (!data.levelId) {
      errors.push({ field: 'levelId', message: 'Le niveau est requis' });
    }
    if (!data.academicYearId) {
      errors.push({ field: 'academicYearId', message: "L'année scolaire est requise" });
    }
    if (data.capacity !== undefined && data.capacity < 1) {
      errors.push({ field: 'capacity', message: 'La capacité doit être supérieure à 0' });
    }

    if (errors.length > 0) {
      throw new ClassValidationError(errors);
    }

    const { data: existingClasses } = await this.academicRepo.findAllClasses(schoolId, {
      levelId: data.levelId,
      limit: 1000,
    });

    const duplicate = existingClasses.find(
      (c) => c.name.toLowerCase() === data.name.trim().toLowerCase() && c.levelId === data.levelId,
    );

    if (duplicate) {
      throw new ClassDuplicateError(data.name, data.levelId);
    }

    const cls = await this.academicRepo.createClass(data, schoolId);
    logger.info('Class created', { classId: cls.id, schoolId, userId }, 'academic');
    return cls;
  }

  /**
   * Retrieves a class by its ID within a school.
   */
  async getById(schoolId: string, classId: string): Promise<SchoolClass> {
    const cls = await this.academicRepo.findClass(classId);
    if (!cls || cls.schoolId !== schoolId) {
      throw new ClassNotFoundError(classId);
    }
    logger.info('Class retrieved', { classId, schoolId }, 'academic');
    return cls;
  }

  /**
   * Lists classes with filtering, search, and pagination.
   */
  async list(schoolId: string, filters: AcademicFilters): Promise<{ data: SchoolClass[]; total: number }> {
    const page = filters.page || 1;
    const limit = filters.limit || 20;

    let queryFilters: AcademicFilters = { ...filters, page, limit };

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const { data: allClasses } = await this.academicRepo.findAllClasses(schoolId, { limit: 1000 });
      const filtered = allClasses.filter((c) => c.name.toLowerCase().includes(searchLower));

      const start = (page - 1) * limit;
      const paginated = filtered.slice(start, start + limit);

      return { data: paginated, total: filtered.length };
    }

    if (filters.levelId) {
      queryFilters = { ...queryFilters, levelId: filters.levelId };
    }
    if (filters.sectionId) {
      queryFilters = { ...queryFilters, sectionId: filters.sectionId };
    }
    if (filters.streamId) {
      queryFilters = { ...queryFilters, streamId: filters.streamId };
    }
    if (filters.status) {
      queryFilters = { ...queryFilters, status: filters.status };
    }

    return this.academicRepo.findAllClasses(schoolId, queryFilters);
  }

  /**
   * Updates a class after validating the update data.
   */
  async update(schoolId: string, userId: string, classId: string, data: UpdateClassRequest): Promise<SchoolClass> {
    const existing = await this.academicRepo.findClass(classId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new ClassNotFoundError(classId);
    }

    const errors: Array<{ field: string; message: string }> = [];

    if (data.name !== undefined && data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom ne peut pas être vide' });
    }
    if (data.capacity !== undefined && data.capacity < 1) {
      errors.push({ field: 'capacity', message: 'La capacité doit être supérieure à 0' });
    }

    if (errors.length > 0) {
      throw new ClassValidationError(errors);
    }

    if (data.name !== undefined || data.levelId !== undefined) {
      const targetName = (data.name ?? existing.name).trim().toLowerCase();
      const targetLevelId = data.levelId ?? existing.levelId;

      const { data: existingClasses } = await this.academicRepo.findAllClasses(schoolId, {
        levelId: targetLevelId,
        limit: 1000,
      });

      const duplicate = existingClasses.find(
        (c) =>
          c.id !== classId &&
          c.name.toLowerCase() === targetName &&
          c.levelId === targetLevelId,
      );

      if (duplicate) {
        throw new ClassDuplicateError(data.name ?? existing.name, targetLevelId);
      }
    }

    const updated = await this.academicRepo.updateClass(classId, data);
    logger.info('Class updated', { classId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Archives a class by setting its status to ARCHIVED.
   */
  async archive(schoolId: string, userId: string, classId: string): Promise<void> {
    const existing = await this.academicRepo.findClass(classId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new ClassNotFoundError(classId);
    }

    if (existing.status === 'ARCHIVED') {
      throw new ClassValidationError([{ field: 'status', message: 'La classe est déjà archivée' }]);
    }

    await this.academicRepo.archiveClass(classId);
    logger.info('Class archived', { classId, schoolId, userId }, 'academic');
  }

  /**
   * Restores an archived class by setting its status to ACTIVE.
   */
  async restore(schoolId: string, userId: string, classId: string): Promise<void> {
    const existing = await this.academicRepo.findClass(classId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new ClassNotFoundError(classId);
    }

    if (existing.status !== 'ARCHIVED') {
      throw new ClassValidationError([{ field: 'status', message: 'Seules les classes archivées peuvent être restaurées' }]);
    }

    await this.academicRepo.restoreClass(classId);
    logger.info('Class restored', { classId, schoolId, userId }, 'academic');
  }

  /**
   * Deletes a class after verifying no active students are assigned to it.
   */
  async delete(schoolId: string, userId: string, classId: string): Promise<void> {
    const existing = await this.academicRepo.findClass(classId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new ClassNotFoundError(classId);
    }

    const activeCount = await this.academicRepo.countActiveStudentsByClassId(schoolId, classId);

    if (activeCount > 0) {
      throw new ClassDeletionError(
        `Impossible de supprimer la classe: ${activeCount} élève(s) actif(s) y sont assigné(s)`,
      );
    }

    await this.academicRepo.deleteClass(classId);
    logger.info('Class deleted', { classId, schoolId, userId }, 'academic');
  }

  /**
   * Returns statistics about classes for a school including breakdowns by level and section.
   */
  async getStatistics(schoolId: string): Promise<ClassStatistics> {
    const { data: classes } = await this.academicRepo.findAllClasses(schoolId, { limit: 10000 });

    const total = classes.length;

    const byLevelMap = new Map<string, { levelId: string; levelName: string; count: number }>();
    const bySectionMap = new Map<string, { sectionId: string; sectionName: string; count: number }>();

    let totalCapacity = 0;
    let maxCapacity = 0;
    let minCapacity = classes.length > 0 ? Infinity : 0;

    for (const cls of classes) {
      if (cls.level) {
        const existing = byLevelMap.get(cls.level.id);
        if (existing) {
          existing.count++;
        } else {
          byLevelMap.set(cls.level.id, { levelId: cls.level.id, levelName: cls.level.name, count: 1 });
        }
      }

      if (cls.section) {
        const existing = bySectionMap.get(cls.section.id);
        if (existing) {
          existing.count++;
        } else {
          bySectionMap.set(cls.section.id, { sectionId: cls.section.id, sectionName: cls.section.name, count: 1 });
        }
      }

      totalCapacity += cls.capacity;
      maxCapacity = Math.max(maxCapacity, cls.capacity);
      minCapacity = Math.min(minCapacity, cls.capacity);
    }

    const capacityStats = {
      totalCapacity,
      averageCapacity: total > 0 ? Math.round(totalCapacity / total) : 0,
      maxCapacity,
      minCapacity: total > 0 ? minCapacity : 0,
    };

    logger.info('Class statistics retrieved', { schoolId, total }, 'academic');

    return {
      total,
      byLevel: Array.from(byLevelMap.values()),
      bySection: Array.from(bySectionMap.values()),
      capacityStats,
    };
  }
}
