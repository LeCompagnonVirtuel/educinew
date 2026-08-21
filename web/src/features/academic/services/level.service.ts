import type { AcademicRepository, Level, CreateLevelRequest, UpdateLevelRequest } from '../types';
import { LevelNotFoundError, AppError } from '@educi/errors';
import { logger } from '@educi/logger';

export class LevelService {
  constructor(private readonly academicRepo: AcademicRepository) {}

  /**
   * Creates a new level after validating required fields and managing the order field.
   */
  async create(schoolId: string, userId: string, data: CreateLevelRequest): Promise<Level> {
    const errors: Array<{ field: string; message: string }> = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom est requis' });
    }
    if (!data.code || data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code est requis' });
    }
    if (data.order !== undefined && data.order < 1) {
      errors.push({ field: 'order', message: "L'ordre doit être supérieur à 0" });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'LEVEL_VALIDATION_ERROR',
        400,
      );
    }

    const levels = await this.academicRepo.findAllLevels(schoolId);

    const duplicateName = levels.find(
      (l) => l.name.toLowerCase() === data.name.trim().toLowerCase(),
    );
    if (duplicateName) {
      throw new AppError(
        `Un niveau "${data.name}" existe déjà`,
        'LEVEL_DUPLICATE',
        409,
      );
    }

    const duplicateCode = levels.find(
      (l) => l.code.toLowerCase() === data.code.trim().toLowerCase(),
    );
    if (duplicateCode) {
      throw new AppError(
        `Un niveau avec le code ${data.code} existe déjà`,
        'LEVEL_DUPLICATE',
        409,
      );
    }

    if (data.order === undefined) {
      const maxOrder = levels.reduce((max, l) => Math.max(max, l.order || 0), 0);
      data.order = maxOrder + 1;
    }

    const level = await this.academicRepo.createLevel(data, schoolId);
    logger.info('Level created', { levelId: level.id, schoolId, userId }, 'academic');
    return level;
  }

  /**
   * Retrieves a level by its ID within a school.
   */
  async getById(schoolId: string, levelId: string): Promise<Level> {
    const level = await this.academicRepo.findLevel(levelId);
    if (!level || level.schoolId !== schoolId) {
      throw new LevelNotFoundError(levelId);
    }
    logger.info('Level retrieved', { levelId, schoolId }, 'academic');
    return level;
  }

  /**
   * Lists all levels for a school ordered by their order field.
   */
  async list(schoolId: string): Promise<Level[]> {
    const levels = await this.academicRepo.findAllLevels(schoolId);
    logger.info('Levels listed', { schoolId, count: levels.length }, 'academic');
    return levels;
  }

  /**
   * Updates a level after validating the update data.
   */
  async update(schoolId: string, userId: string, levelId: string, data: UpdateLevelRequest): Promise<Level> {
    const existing = await this.academicRepo.findLevel(levelId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new LevelNotFoundError(levelId);
    }

    const errors: Array<{ field: string; message: string }> = [];

    if (data.name !== undefined && data.name.trim().length === 0) {
      errors.push({ field: 'name', message: 'Le nom ne peut pas être vide' });
    }
    if (data.code !== undefined && data.code.trim().length === 0) {
      errors.push({ field: 'code', message: 'Le code ne peut pas être vide' });
    }
    if (data.order !== undefined && data.order < 1) {
      errors.push({ field: 'order', message: "L'ordre doit être supérieur à 0" });
    }

    if (errors.length > 0) {
      throw new AppError(
        `Erreur de validation: ${errors.length} erreur(s)`,
        'LEVEL_VALIDATION_ERROR',
        400,
      );
    }

    if (data.name !== undefined || data.code !== undefined) {
      const levels = await this.academicRepo.findAllLevels(schoolId);
      const targetName = (data.name ?? existing.name).trim().toLowerCase();
      const targetCode = (data.code ?? existing.code).trim().toLowerCase();

      const duplicate = levels.find(
        (l) => l.id !== levelId && (l.name.toLowerCase() === targetName || l.code.toLowerCase() === targetCode),
      );

      if (duplicate) {
        throw new AppError(
          `Un niveau "${data.name ?? existing.name}" ou le code ${data.code ?? existing.code} existe déjà`,
          'LEVEL_DUPLICATE',
          409,
        );
      }
    }

    const updated = await this.academicRepo.updateLevel(levelId, data);
    logger.info('Level updated', { levelId, schoolId, userId }, 'academic');
    return updated;
  }

  /**
   * Deletes a level after verifying no sections are linked to it.
   */
  async delete(schoolId: string, userId: string, levelId: string): Promise<void> {
    const existing = await this.academicRepo.findLevel(levelId);
    if (!existing || existing.schoolId !== schoolId) {
      throw new LevelNotFoundError(levelId);
    }

    const sections = await this.academicRepo.findAllSections(schoolId);
    const linkedSections = sections.filter((s) => s.levelId === levelId);

    if (linkedSections.length > 0) {
      throw new AppError(
        `Impossible de supprimer le niveau: ${linkedSections.length} section(s) y sont associée(s)`,
        'LEVEL_DELETION_ERROR',
        400,
      );
    }

    await this.academicRepo.deleteLevel(levelId);
    logger.info('Level deleted', { levelId, schoolId, userId }, 'academic');
  }
}
